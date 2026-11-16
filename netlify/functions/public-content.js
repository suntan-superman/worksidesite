const { getDb } = require("../shared/content-store");

const allowed = new Set(["https://worksidesoftware.com", "https://www.worksidesoftware.com"]);

exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=120", "X-Content-Type-Options": "nosniff" };
  if (origin && !allowed.has(origin) && !(process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin))) {
    return { statusCode: 403, headers: { ...headers, "Cache-Control": "no-store" }, body: JSON.stringify({ error: "origin_not_allowed" }) };
  }
  if (event.httpMethod !== "GET") return { statusCode: 405, headers, body: JSON.stringify({ error: "method_not_allowed" }) };
  try {
    const db = getDb();
    const [projects, testimonials] = await Promise.all([
      db.collection("workside_site_projects").where("status", "==", "published").limit(100).get(),
      db.collection("workside_site_testimonials").where("status", "==", "published").limit(100).get(),
    ]);
    const payload = {
      projects: projects.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      testimonials: testimonials.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
    return { statusCode: 200, headers, body: JSON.stringify(payload) };
  } catch (error) {
    console.error("[public-content] read failed", error?.code || "unknown");
    return { statusCode: 503, headers: { ...headers, "Cache-Control": "no-store" }, body: JSON.stringify({ error: "content_unavailable" }) };
  }
};
