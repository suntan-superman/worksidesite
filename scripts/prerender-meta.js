// Post-build: writes a per-route index.html with route-specific title, description,
// canonical and Open Graph tags so crawlers that skip JavaScript still see them.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");
const origin = "https://worksidesoftware.com";

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const pagesSrc = read("src/components/Seo.jsx").match(/const pages = (\{[\s\S]*?\n\});/)[1];
const projectsSrc = read("src/components/portfolioData.js").replace("export const projects =", "return");
const pages = new Function(`return ${pagesSrc}`)();
const projects = new Function(projectsSrc)();

const routes = { ...pages };
projects.forEach((p) => {
  routes[`/work/${p.slug}`] = [
    `${p.name} | Workside Software`,
    `${p.description} Explore this Workside Software ${p.type.toLowerCase()}.`,
  ];
});

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");

Object.entries(routes).forEach(([route, [title, description]]) => {
  if (route === "/") return;
  const url = `${origin}${route}`;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
  const dir = path.join(buildDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
});

console.log(`Prerendered meta for ${Object.keys(routes).length - 1} routes`);
