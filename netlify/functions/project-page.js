const fs = require("node:fs");
const path = require("node:path");
const { getDb } = require("../shared/content-store");

const ORIGIN = "https://worksidesoftware.com";
const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const fileAt = (relative) => {
  const candidates = [path.join(process.cwd(), relative), path.join(__dirname, "..", "..", relative), path.join(__dirname, relative)];
  return candidates.find((file) => fs.existsSync(file));
};

function contentSections(project) {
  const study = project.caseStudy || {};
  const parts = [];
  const section = (heading, text) => `<section><h2>${heading}</h2>${text}</section>`;
  if (study.problem) parts.push(section("The business problem", `<p>${esc(study.problem)}</p>`));
  if (study.solution) parts.push(section("The solution", `<p>${esc(study.solution)}</p>`));
  if (study.features?.length) parts.push(section("Key features", `<ul>${study.features.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`));
  if (study.technical?.length) parts.push(section("Technical capabilities demonstrated", `<ul>${study.technical.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`));
  if (project.technologies?.length) parts.push(section("Technologies", `<ul>${project.technologies.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`));
  if (project.industries?.length) parts.push(section("Industries served", `<ul>${project.industries.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`));
  if (project.developmentChallenges?.length) parts.push(section("Development challenges", `<ul>${project.developmentChallenges.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`));
  if (project.outcomes?.length) parts.push(section("Outcomes and accomplishments", `<ul>${project.outcomes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`));
  if (project.statusNote || project.releaseStatus || project.type) parts.push(section("Project status", `<p>${esc(project.statusNote || project.releaseStatus || project.type)}</p>`));
  return parts.join("");
}

function replaceRoot(template, content) {
  const start = template.indexOf('<div id="root">');
  if (start < 0) return template;
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tags.exec(template))) {
    if (/^<div\b/i.test(match[0])) depth++;
    else depth--;
    if (depth === 0) return `${template.slice(0, start)}<div id="root">${content}</div>${template.slice(tags.lastIndex)}`;
  }
  return template;
}

function pageMarkup(project, template) {
  const canonical = project.canonicalUrl || `${ORIGIN}/work/${project.slug}`;
  const title = project.caseStudy?.seoTitle || project.seoTitle || `${project.name} | Workside Software`;
  const description = project.caseStudy?.seoDescription || project.metaDescription || `${project.description} Explore this Workside Software ${String(project.type || "project").toLowerCase()}.`;
  const image = project.openGraphImageUrl || project.coverImageUrl || project.imageUrl || `${ORIGIN}/og-image.png`;
  const visualUrl = project.coverImageUrl || project.imageUrl || project.logoUrl || "";
  const visualAlt = project.coverImageUrl || project.imageUrl ? project.imageAlt || `${project.name} project image` : project.logoAlt || `${project.name} logo`;
  const visual = visualUrl ? `<figure><img src="${esc(visualUrl)}" alt="${esc(visualAlt)}">${project.imageCaption ? `<figcaption>${esc(project.imageCaption)}</figcaption>` : ""}</figure>` : "";
  const links = [[project.appStoreUrl, "View on the App Store"], [project.googlePlayUrl, "View on Google Play"], [project.demoUrl, "View demo"], [project.websiteUrl || project.link, project.linkLabel || "Visit project website"]].filter(([url]) => url).map(([url, label]) => `<a href="${esc(url)}" rel="noopener noreferrer">${esc(label)}</a>`).join(" ");
  const gallery = (project.gallery || []).map((entry) => `<figure><img src="${esc(entry.url)}" alt="${esc(entry.altText)}" loading="lazy">${entry.caption ? `<figcaption>${esc(entry.caption)}</figcaption>` : ""}</figure>`).join("");
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${esc(canonical)}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${esc(canonical)}"`);
  const robotsTag = `<meta name="robots" content="${project.indexable === false ? "noindex, nofollow" : "index, follow"}">`;
  const imageTag = `<meta property="og:image" content="${esc(image.startsWith("https://") ? image : `${ORIGIN}${image}`)}">`;
  html = /<meta name="robots"[^>]*>/i.test(html) ? html.replace(/<meta name="robots"[^>]*>/i, robotsTag) : html.replace("</head>", `${robotsTag}</head>`);
  html = /<meta property="og:image"[^>]*>/i.test(html) ? html.replace(/<meta property="og:image"[^>]*>/i, imageTag) : html.replace("</head>", `${imageTag}</head>`);
  const content = `<main><nav aria-label="Workside Software"><a href="/">Workside Software</a> <a href="/services">Services</a> <a href="/work">Work</a> <a href="/about">About</a> <a href="/contact">Contact</a></nav><article><p>${esc(project.type || "Project")} · ${esc(project.category || "")}</p><h1>${esc(project.name)}</h1><p>${esc(project.description || "")}</p>${project.fullDescription || project.detail ? `<p>${esc(project.fullDescription || project.detail)}</p>` : ""}${project.statusNote ? `<p>${esc(project.statusNote)}</p>` : ""}${visual}${links ? `<p>${links}</p>` : ""}${contentSections(project)}${gallery ? `<section><h2>Project screenshots</h2>${gallery}</section>` : ""}<p><a href="/contact">Discuss Your Project</a> · <a href="/work">All work</a></p></article><footer><a href="/privacy">Privacy</a> <a href="/terms">Terms</a> <a href="/support">Support</a></footer></main>`;
  return replaceRoot(html, content);
}

function notFound() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Project not found | Workside Software</title></head><body><main><h1>Project not found</h1><p>This project is not currently published.</p><a href="/work">Browse published work</a></main></body></html>`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") return { statusCode: 405, headers: { Allow: "GET", "Cache-Control": "no-store" }, body: "Method not allowed" };
  const routeSlug = String(event.path || "").split("/").filter(Boolean).pop();
  const slug = String(event.queryStringParameters?.slug || (routeSlug === "project-page" ? "" : routeSlug) || "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { statusCode: 404, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" }, body: notFound() };
  try {
    const defaultsPath = fileAt("netlify/shared/portfolio-defaults.json");
    const templatePath = fileAt("build/index.html");
    if (!defaultsPath || !templatePath) throw new Error("portfolio page assets missing");
    const defaults = JSON.parse(fs.readFileSync(defaultsPath, "utf8"));
    const base = defaults.find((entry) => entry.slug === slug);
    const matches = await getDb().collection("workside_site_projects").where("slug", "==", slug).limit(1).get();
    const saved = matches.empty ? null : { id: matches.docs[0].id, ...matches.docs[0].data() };
    if (saved && saved.status !== "published") return { statusCode: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }, body: notFound() };
    const project = saved ? { ...(base || {}), ...saved } : base;
    if (!project || project.status === "archived") return { statusCode: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }, body: notFound() };
    return { statusCode: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=60", "X-Content-Type-Options": "nosniff", ...(project.indexable === false ? { "X-Robots-Tag": "noindex, nofollow" } : {}) }, body: pageMarkup(project, fs.readFileSync(templatePath, "utf8")) };
  } catch (error) {
    console.error("[project-page] render failed", error?.code || "unknown");
    return { statusCode: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }, body: "<!doctype html><html><head><title>Project page temporarily unavailable</title></head><body><h1>Project page temporarily unavailable</h1></body></html>" };
  }
};

exports.__test = { pageMarkup, contentSections, notFound, replaceRoot };
