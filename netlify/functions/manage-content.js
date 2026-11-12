const { createHmac, timingSafeEqual } = require("node:crypto");
const { getDb, serverTimestamp } = require("../shared/content-store");

const COOKIE = "workside_content_admin";
const SESSION_MS = 8 * 60 * 60 * 1000;
const attempts = new Map();

function result(statusCode, body, extraHeaders = {}) {
  return { statusCode, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extraHeaders }, body: JSON.stringify(body) };
}

function value(input, max, required = false) {
  const clean = typeof input === "string" ? input.trim() : "";
  return clean.length <= max && (!required || clean.length > 0) ? clean : null;
}

function validImageUrl(input) {
  const text = value(input || "", 1000);
  if (text === null) return undefined;
  if (!text) return "";
  try { const url = new URL(text); return url.protocol === "https:" && !url.username && !url.password ? url.toString() : undefined; }
  catch { return undefined; }
}

function validateContent(input) {
  if (!input || !["project", "testimonial"].includes(input.kind)) return { error: "Choose a valid content type." };
  const status = input.status === "draft" ? "draft" : input.status === "published" ? "published" : null;
  if (!status) return { error: "Choose draft or published." };
  const imageUrl = validImageUrl(input.imageUrl);
  if (imageUrl === undefined) return { error: "Image links must be valid HTTPS URLs." };

  if (input.kind === "project") {
    const slug = value(input.slug, 70, true);
    const name = value(input.name, 120, true);
    const type = value(input.type, 80, true);
    const category = value(input.category, 100, true);
    const description = value(input.description, 700, true);
    const detail = value(input.detail || "", 3000);
    const mark = value(input.mark || "", 20);
    const link = value(input.link || "", 1000);
    const linkLabel = value(input.linkLabel || "", 120);
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: "Use a lowercase project slug with letters, numbers, and hyphens." };
    if ([name, type, category, description, detail, mark, link, linkLabel].some((field) => field === null)) return { error: "One or more project fields exceed the allowed length or are missing." };
    if (link) {
      try { const url = new URL(link); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); }
      catch { return { error: "Project links must use HTTPS." }; }
      if (!linkLabel) return { error: "Add a label for the project link." };
    }
    return { data: { kind: "project", slug, name, type, category, description, detail, mark, link, linkLabel, imageUrl, status } };
  }

  const quote = value(input.quote, 1600, true);
  const name = value(input.name, 120, true);
  const attribution = value(input.attribution || "", 160);
  if ([quote, name, attribution].some((field) => field === null)) return { error: "One or more testimonial fields exceed the allowed length or are missing." };
  return { data: { kind: "testimonial", quote, name, attribution, imageUrl, status } };
}

function address(event) {
  const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([key, val]) => [key.toLowerCase(), val]));
  return String(headers["x-nf-client-connection-ip"] || headers["x-forwarded-for"] || "unknown").split(",")[0].trim().slice(0, 100);
}

function originAllowed(event) {
  const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([key, val]) => [key.toLowerCase(), val]));
  let origin = headers.origin;
  if (!origin && headers.referer) { try { origin = new URL(headers.referer).origin; } catch {} }
  if (!origin) return false;
  if (["https://worksidesoftware.com", "https://www.worksidesoftware.com"].includes(origin)) return true;
  return process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

function signingKey() { return process.env.WORKSIDE_CONTENT_SESSION_SECRET || ""; }
function signature(expires) { return createHmac("sha256", signingKey()).update(String(expires)).digest("hex"); }
function validSession(cookieHeader, now = Date.now()) {
  if (signingKey().length < 32) return false;
  const item = String(cookieHeader || "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`));
  if (!item) return false;
  let token;
  try { token = decodeURIComponent(item.slice(COOKIE.length + 1)); } catch { return false; }
  const [expiresText, supplied] = token.split(".");
  const expires = Number(expiresText);
  if (!Number.isSafeInteger(expires) || expires <= now || expires > now + SESSION_MS + 60_000 || !/^[a-f0-9]{64}$/.test(supplied || "")) return false;
  const expected = signature(expires);
  return timingSafeEqual(Buffer.from(supplied, "hex"), Buffer.from(expected, "hex"));
}

function loginLimit(ip, now = Date.now()) {
  const times = (attempts.get(ip) || []).filter((time) => now - time < 15 * 60_000);
  if (times.length >= 5) { attempts.set(ip, times); return false; }
  times.push(now); attempts.set(ip, times);
  if (attempts.size > 5000) for (const [key, rows] of attempts) if (!rows.some((time) => now - time < 15 * 60_000)) attempts.delete(key);
  return true;
}

function constantTimeEqual(left, right) {
  const a = Buffer.from(String(left || "")); const b = Buffer.from(String(right || ""));
  return a.length === b.length && timingSafeEqual(a, b);
}

async function parseBody(event) {
  const raw = event.body || "";
  if (Buffer.byteLength(raw) > 16 * 1024) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

exports.handler = async (event) => {
  if (!originAllowed(event)) return result(403, { error: "origin_not_allowed" });
  const action = event.queryStringParameters?.action || "";
  const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([key, val]) => [key.toLowerCase(), val]));

  if (action === "login" && event.httpMethod === "POST") {
    const password = process.env.WORKSIDE_CONTENT_ADMIN_PASSWORD || "";
    if (password.length < 16 || signingKey().length < 32) return result(503, { error: "admin_auth_not_configured" });
    const ip = address(event);
    if (!loginLimit(ip)) return result(429, { error: "too_many_attempts" }, { "Retry-After": "900" });
    const body = await parseBody(event);
    if (!constantTimeEqual(body?.password, password)) return result(401, { error: "invalid_credentials" });
    attempts.delete(ip);
    const expires = Date.now() + SESSION_MS;
    const cookie = `${COOKIE}=${expires}.${signature(expires)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MS / 1000}`;
    return result(200, { ok: true }, { "Set-Cookie": cookie });
  }

  if (action === "logout" && event.httpMethod === "POST") {
    return result(200, { ok: true }, { "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` });
  }
  if (!validSession(headers.cookie)) return result(401, { error: "authentication_required" });

  if (action === "list" && event.httpMethod === "GET") {
    try {
      const db = getDb();
      const [projects, testimonials] = await Promise.all([
        db.collection("workside_site_projects").limit(100).get(),
        db.collection("workside_site_testimonials").limit(100).get(),
      ]);
      return result(200, { projects: projects.docs.map((doc) => ({ id: doc.id, ...doc.data() })), testimonials: testimonials.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
    } catch (error) { console.error("[manage-content] list failed", error?.code || "unknown"); return result(503, { error: "content_unavailable" }); }
  }

  if (event.httpMethod !== "POST") return result(405, { error: "method_not_allowed" });
  const body = await parseBody(event);
  if (!body) return result(400, { error: "invalid_request" });
  try {
    const db = getDb();
    if (action === "save") {
      const validated = validateContent(body.content);
      if (!validated.data) return result(422, { error: "invalid_content", message: validated.error });
      const item = validated.data;
      const collectionName = item.kind === "project" ? "workside_site_projects" : "workside_site_testimonials";
      const requestedId = value(body.id || "", 120);
      if (requestedId && !/^[A-Za-z0-9_-]{1,120}$/.test(requestedId)) return result(400, { error: "invalid_request" });
      const ref = requestedId ? db.collection(collectionName).doc(requestedId) : db.collection(collectionName).doc();
      const existing = await ref.get();
      await ref.set({ ...item, createdAt: existing.exists ? existing.data().createdAt : serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
      return result(200, { ok: true, id: ref.id });
    }
    if (action === "delete") {
      if (!["project", "testimonial"].includes(body.kind) || !value(body.id, 120, true) || !/^[A-Za-z0-9_-]{1,120}$/.test(body.id)) return result(400, { error: "invalid_request" });
      const collectionName = body.kind === "project" ? "workside_site_projects" : "workside_site_testimonials";
      if (body.kind === "project" && ["sageset", "merxus-ai", "radiusiq", "property-intelligence", "galageaux-arcade", "workside-signals", "cutpro-tree-service", "sellmykernhome", "workside-logistics"].includes(body.id)) return result(409, { error: "set_draft_to_hide_existing_project" });
      await db.collection(collectionName).doc(body.id).delete();
      return result(200, { ok: true });
    }
    return result(400, { error: "unknown_action" });
  } catch (error) {
    console.error("[manage-content] write failed", error?.code || "unknown");
    return result(503, { error: "content_unavailable" });
  }
};

exports.__test = { validateContent, validSession, loginLimit, constantTimeEqual };
