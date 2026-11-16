const { getDb } = require("../shared/content-store");

const ORIGIN = "https://worksidesoftware.com";
const STATIC_ROUTES = ["/", "/services", "/work", "/about", "/contact", "/support", "/privacy", "/terms"];
const BUILT_IN_SLUGS = ["route-logistics", "sageset", "merxus-ai", "radiusiq", "property-intelligence", "workside-signals", "galageaux-arcade", "workside-logistics", "cutpro-tree-service", "sellmykernhome"];
const xmlEscape = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function indexableSlugs(docs) {
  const overrides = new Map(docs.map((doc) => [doc.data().slug, doc.data()]));
  const slugs = new Set(BUILT_IN_SLUGS.filter((slug) => !overrides.has(slug) || overrides.get(slug).status === "published" && overrides.get(slug).indexable !== false));
  for (const [slug, project] of overrides) {
    if (project.status === "published" && project.indexable !== false && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || "")) slugs.add(slug);
  }
  return slugs;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") return { statusCode: 405, headers: { Allow: "GET", "Cache-Control": "no-store" }, body: "Method not allowed" };
  try {
    const docs = await getDb().collection("workside_site_projects").limit(500).get();
    const slugs = indexableSlugs(docs.docs);
    const staticUrls = STATIC_ROUTES.map((route) => `${ORIGIN}${route === "/" ? "/" : route}`);
    const projectUrls = [...slugs].map((slug) => `${ORIGIN}/work/${slug}`);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...projectUrls].map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`).join("\n")}\n</urlset>`;
    return { statusCode: 200, headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=60", "X-Content-Type-Options": "nosniff" }, body: xml };
  } catch (error) {
    console.error("[portfolio-sitemap] generation failed", error?.code || "unknown");
    return { statusCode: 503, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }, body: "Sitemap is temporarily unavailable" };
  }
};

exports.__test = { indexableSlugs };
