const { createHmac, timingSafeEqual } = require("node:crypto");
const { getDb, getBucketName, serverTimestamp } = require("../shared/content-store");
const { getStorage } = require("firebase-admin/storage");

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
  if (/^\/projects\/[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:webp|png|jpe?g|avif)$/i.test(text) && !text.includes("..")) return text;
  try { const url = new URL(text); return url.protocol === "https:" && !url.username && !url.password ? url.toString() : undefined; }
  catch { return undefined; }
}

const RELEASE_STATUSES = new Set(["In development", "Testing", "Published product", "Active internal product", "Client engagement", "Archived"]);
const VISIBILITY = new Set(["draft", "published", "archived"]);
const BUILT_IN_SLUGS = new Set(["route-logistics", "sageset", "merxus-ai", "radiusiq", "property-intelligence", "workside-signals", "galageaux-arcade", "workside-logistics", "cutpro-tree-service", "sellmykernhome"]);

function textField(input, max = 3000) {
  if (input === undefined || input === null || input === "") return "";
  return value(input, max) ?? null;
}

function listField(input, maxItems = 30, maxLength = 300) {
  if (input === undefined || input === null || input === "") return [];
  if (Array.isArray(input)) {
    if (input.length > maxItems) return null;
    const rows = input.map((entry) => value(entry, maxLength, true));
    return rows.every(Boolean) ? rows : null;
  }
  if (typeof input === "string") {
    const rows = input.split(/\r?\n/).map((entry) => entry.trim()).filter(Boolean);
    if (rows.length > maxItems || rows.some((entry) => entry.length > maxLength)) return null;
    return rows;
  }
  return null;
}

function secureUrl(input, max = 1000) {
  const text = value(input || "", max);
  if (text === null) return undefined;
  if (!text) return "";
  try { const url = new URL(text); return url.protocol === "https:" && !url.username && !url.password ? url.toString() : undefined; }
  catch { return undefined; }
}

function validateGallery(input) {
  if (input === undefined || input === null) return [];
  if (!Array.isArray(input) || input.length > 12) return null;
  const gallery = input.map((item, index) => {
    const url = secureUrl(item?.url, 1000);
    const caption = value(item?.caption || "", 180);
    const altText = value(item?.altText || "", 180);
    const order = Number.isInteger(item?.order) && item.order >= 0 && item.order <= 100 ? item.order : index;
    if (!url || caption === null || !altText) return null;
    return { url, caption, altText, order };
  });
  return gallery.every(Boolean) ? gallery.sort((a, b) => a.order - b.order) : null;
}

function validateContent(input) {
  if (!input || !["project", "testimonial"].includes(input.kind)) return { error: "Choose a valid content type." };
  const status = VISIBILITY.has(input.status) ? input.status : null;
  if (!status) return { error: "Choose draft or published." };
  const imageUrl = validImageUrl(input.imageUrl);
  if (imageUrl === undefined) return { error: "Image links must be valid HTTPS URLs." };

  if (input.kind === "project") {
    const slug = value(input.slug, 70, true);
    const name = value(input.name, 120, true);
    const type = value(input.type || "", 80);
    const category = value(input.category || "", 100);
    const description = value(input.description || "", 700);
    const detail = value(input.detail || "", 3000);
    const mark = value(input.mark || "", 20);
    const link = value(input.link || "", 1000);
    const linkLabel = value(input.linkLabel || "", 120);
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: "Use a lowercase project slug with letters, numbers, and hyphens." };
    if ([name, type, category, description, detail, mark, link, linkLabel].some((field) => field === null)) return { error: "One or more project fields exceed the allowed length or are missing." };
    if (status === "published" && (!type || !category || !description)) return { error: "Published projects need a tagline, category and short description." };
    if (link) {
      try { const url = new URL(link); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); }
      catch { return { error: "Project links must use HTTPS." }; }
      if (!linkLabel) return { error: "Add a label for the project link." };
    }
    const textKeys = ["fullDescription", "businessProblem", "solution", "statusNote", "canonicalUrl", "logoAlt", "coverAlt"];
    const extras = {};
    for (const key of textKeys) {
      extras[key] = textField(input[key], key === "fullDescription" ? 8000 : 4000);
      if (extras[key] === null) return { error: `The ${key} field exceeds its allowed length.` };
    }
    const sourceCaseStudy = input.caseStudy || {};
    const seoTitle = value(input.seoTitle || sourceCaseStudy.seoTitle || "", 160);
    const seoDescription = value(input.metaDescription || input.seoDescription || sourceCaseStudy.seoDescription || "", 320);
    const businessProblem = value(input.businessProblem || sourceCaseStudy.problem || "", 4000);
    const solution = value(input.solution || sourceCaseStudy.solution || "", 4000);
    if ([seoTitle, seoDescription, businessProblem, solution].some((field) => field === null)) return { error: "One or more case-study or SEO fields exceed the allowed length." };
    const features = listField(input.keyFeatures ?? input.features ?? sourceCaseStudy.features);
    const technical = listField(input.technicalCapabilities ?? input.technical ?? sourceCaseStudy.technical);
    const technologies = listField(input.technologies ?? input.technologiesText);
    const industries = listField(input.industries ?? input.industriesText);
    const challenges = listField(input.developmentChallenges ?? input.challengesText);
    const outcomes = listField(input.outcomes ?? input.outcomesText);
    const gallery = validateGallery(input.gallery);
    if (!features || !technical || !technologies || !industries || !challenges || !outcomes || !gallery) return { error: "Check the feature lists and screenshot gallery fields." };
    const externalLinks = {};
    for (const key of ["websiteUrl", "appStoreUrl", "googlePlayUrl", "demoUrl"]) {
      externalLinks[key] = secureUrl(input[key], 1000);
      if (externalLinks[key] === undefined) return { error: "Project links and images must use valid HTTPS URLs." };
    }
    const openGraphImageUrl = validImageUrl(input.openGraphImageUrl || "");
    if (openGraphImageUrl === undefined) return { error: "Open Graph images must use a valid HTTPS or local project image URL." };
    const releaseStatus = value(input.releaseStatus || "In development", 40, true);
    if (!RELEASE_STATUSES.has(releaseStatus)) return { error: "Choose a valid project release status." };
    const featured = Boolean(input.featured);
    const indexable = input.indexable !== false;
    const displayOrder = Number.isInteger(input.displayOrder) && input.displayOrder >= 0 && input.displayOrder <= 10000 ? input.displayOrder : 1000;
    const canonical = extras.canonicalUrl;
    if (canonical && canonical !== `https://worksidesoftware.com/work/${slug}`) return { error: "Canonical URL must match the project's public URL." };
    const media = {
      logoUrl: validImageUrl(input.logoUrl || ""),
      coverImageUrl: validImageUrl(input.coverImageUrl || ""),
      openGraphImageUrl,
    };
    if (media.logoUrl === undefined || media.coverImageUrl === undefined) return { error: "Logo and cover images must use valid HTTPS URLs." };
    const imagePresentation = value(input.imagePresentation || "cover", 20);
    const imageAlt = value(input.imageAlt || input.coverAlt || "", 300);
    const imageCaption = value(input.imageCaption || "", 300);
    const className = value(input.className || "custom", 40);
    if ([imagePresentation, imageAlt, imageCaption, className].some((field) => field === null) || !["cover", "portrait", "logo"].includes(imagePresentation)) return { error: "Check the project image presentation fields." };
    const caseStudy = { problem: businessProblem, solution, features, technical, seoTitle, seoDescription: seoDescription || undefined };
    return { data: { kind: "project", slug, name, type, category, description, detail, mark, link, linkLabel, imageUrl, status, ...extras, ...media, ...externalLinks, imagePresentation, imageAlt, imageCaption, className, caseStudy, keyFeatures: features, technicalCapabilities: technical, technologies, industries, developmentChallenges: challenges, outcomes, gallery, releaseStatus, featured, indexable, displayOrder } };
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

function managedImagePaths(item) {
  const urls = [item?.imageUrl, item?.logoUrl, item?.coverImageUrl, item?.openGraphImageUrl, ...(item?.gallery || []).map((image) => image.url)];
  return new Set(urls.flatMap((value) => {
    try {
      const url = new URL(value);
      if (url.hostname !== "firebasestorage.googleapis.com") return [];
      const encodedPath = url.pathname.split("/o/")[1];
      const objectPath = decodeURIComponent(encodedPath || "");
      return objectPath.startsWith("workside-portfolio/") ? [objectPath] : [];
    } catch { return []; }
  }));
}

async function cleanupUnusedImages(db, collection, previous, next) {
  const obsolete = [...managedImagePaths(previous)].filter((path) => !managedImagePaths(next).has(path));
  const bucketName = getBucketName();
  if (!obsolete.length || !bucketName) return;
  try {
    const docs = await collection.get();
    const stillUsed = new Set();
    for (const doc of docs.docs) for (const path of managedImagePaths(doc.data())) stillUsed.add(path);
    const app = require("firebase-admin/app").getApps()[0];
    const bucket = getStorage(app).bucket(bucketName);
    await Promise.all(obsolete.filter((path) => !stillUsed.has(path)).map((path) => bucket.file(path).delete({ ignoreNotFound: true })));
  } catch (error) { console.error("[manage-content] unused image cleanup failed", error?.code || "unknown"); }
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

async function parseBody(event, maxBytes = 16 * 1024) {
  const raw = event.body || "";
  if (Buffer.byteLength(raw) > maxBytes) return null;
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
        db.collection("workside_site_projects").limit(500).get(),
        db.collection("workside_site_testimonials").limit(500).get(),
      ]);
      return result(200, { projects: projects.docs.map((doc) => ({ id: doc.id, ...doc.data() })), testimonials: testimonials.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
    } catch (error) { console.error("[manage-content] list failed", error?.code || "unknown"); return result(503, { error: "content_unavailable" }); }
  }

  if (event.httpMethod !== "POST") return result(405, { error: "method_not_allowed" });
  const body = await parseBody(event, action === "upload" ? 6 * 1024 * 1024 : 64 * 1024);
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
      let ref = requestedId ? db.collection(collectionName).doc(requestedId) : null;
      if (item.kind === "project") {
        const matches = await db.collection(collectionName).where("slug", "==", item.slug).limit(2).get();
        const conflict = matches.docs.find((doc) => doc.id !== requestedId);
        if (conflict) return result(409, { error: "duplicate_project_slug" });
        if (!ref && matches.docs.length) ref = matches.docs[0].ref;
      }
      if (!ref) ref = db.collection(collectionName).doc(item.kind === "project" ? item.slug : undefined);
      const existing = await ref.get();
      const previous = existing.exists ? existing.data() : {};
      const publishedAt = item.status === "published" ? (previous.publishedAt || serverTimestamp()) : (previous.publishedAt || null);
      await ref.set({ ...item, id: ref.id, createdAt: previous.createdAt || serverTimestamp(), updatedAt: serverTimestamp(), publishedAt }, { merge: true });
      if (existing.exists) await cleanupUnusedImages(db, db.collection(collectionName), previous, item);
      return result(200, { ok: true, id: ref.id });
    }
    if (action === "migrate" && Array.isArray(body.projects) && body.projects.length <= 20) {
      const collection = db.collection("workside_site_projects");
      let created = 0;
      const skipped = [];
      let seedIndex = 0;
      for (const source of body.projects) {
        const candidate = { ...source, kind: "project", status: source.status || "published", featured: source.featured ?? seedIndex < 3, displayOrder: source.displayOrder ?? seedIndex };
        const validated = validateContent(candidate);
        if (!validated.data || !BUILT_IN_SLUGS.has(validated.data.slug)) return result(422, { error: "invalid_migration" });
        const matches = await collection.where("slug", "==", validated.data.slug).limit(1).get();
        if (matches.empty) {
          const ref = collection.doc(validated.data.slug);
          await ref.create({ ...validated.data, id: ref.id, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), publishedAt: validated.data.status === "published" ? serverTimestamp() : null });
          created++;
        } else skipped.push(validated.data.slug);
        seedIndex++;
      }
      return result(200, { ok: true, created, skipped });
    }
    if (action === "upload" && body && typeof body.base64 === "string") {
      const slug = value(body.slug, 70, true);
      const mimeType = value(body.mimeType, 40, true);
      if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !["image/webp", "image/png", "image/jpeg"].includes(mimeType) || body.base64.length > 5_600_000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(body.base64)) return result(400, { error: "invalid_media" });
      const bytes = Buffer.from(body.base64, "base64");
      if (bytes.length > 4 * 1024 * 1024 || bytes.length === 0) return result(413, { error: "media_too_large" });
      const signatures = { "image/webp": bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP", "image/png": bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), "image/jpeg": bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 };
      if (!signatures[mimeType]) return result(415, { error: "invalid_media" });
      const bucketName = getBucketName();
      if (!bucketName) return result(503, { error: "media_storage_not_configured" });
      try {
        const app = require("firebase-admin/app").getApps()[0];
        const bucket = getStorage(app).bucket(bucketName);
        const extension = mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1];
        const token = require("node:crypto").randomUUID();
        const objectPath = `workside-portfolio/${slug}/${token}.${extension}`;
        await bucket.file(objectPath).save(bytes, { resumable: false, metadata: { contentType: mimeType, cacheControl: "public,max-age=31536000,immutable", metadata: { firebaseStorageDownloadTokens: token } } });
        return result(200, { ok: true, path: objectPath, url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}` });
      } catch (error) { console.error("[manage-content] media upload failed", error?.code || "unknown"); return result(503, { error: "media_upload_failed" }); }
    }
    if (action === "removeMedia" && body?.path) {
      const objectPath = value(body.path, 300, true);
      if (!objectPath || !/^workside-portfolio\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-f0-9-]+\.(webp|png|jpeg|jpg)$/.test(objectPath)) return result(400, { error: "invalid_media" });
      const bucketName = getBucketName();
      if (!bucketName) return result(503, { error: "media_storage_not_configured" });
      try { const app = require("firebase-admin/app").getApps()[0]; await getStorage(app).bucket(bucketName).file(objectPath).delete({ ignoreNotFound: true }); return result(200, { ok: true }); }
      catch (error) { console.error("[manage-content] media removal failed", error?.code || "unknown"); return result(503, { error: "media_remove_failed" }); }
    }
    if (action === "delete") {
      if (!["project", "testimonial"].includes(body.kind) || !value(body.id, 120, true) || !/^[A-Za-z0-9_-]{1,120}$/.test(body.id)) return result(400, { error: "invalid_request" });
      const collectionName = body.kind === "project" ? "workside_site_projects" : "workside_site_testimonials";
      const collection = db.collection(collectionName);
      const ref = collection.doc(body.id);
      const existing = await ref.get();
      const previous = existing.exists ? existing.data() : {};
      const archive = body.kind === "project" && BUILT_IN_SLUGS.has(previous.slug || body.id);
      if (archive) await ref.set({ status: "archived", updatedAt: serverTimestamp() }, { merge: true });
      else {
        await ref.delete();
        if (existing.exists) await cleanupUnusedImages(db, collection, previous, {});
      }
      return result(200, { ok: true, archived: archive });
    }
    return result(400, { error: "unknown_action" });
  } catch (error) {
    console.error("[manage-content] write failed", error?.code || "unknown");
    return result(503, { error: "content_unavailable" });
  }
};

exports.__test = { validateContent, validSession, loginLimit, constantTimeEqual };
