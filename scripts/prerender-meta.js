// Post-build: writes a per-route index.html with route-specific head tags and crawler-visible
// body copy, so crawlers that skip JavaScript see real content. React replaces the copy on mount.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");
const origin = "https://worksidesoftware.com";

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const seoSrc = read("src/components/Seo.jsx");
const pagesSrc = seoSrc.match(/const pages = (\{[\s\S]*?\n\});/)[1];
const projects = new Function(read("src/components/portfolioData.js").replace("export const projects =", "return"))();
const pages = new Function(`return ${pagesSrc}`)();

const routes = { ...pages };
projects.forEach((p) => {
  routes[`/work/${p.slug}`] = [
    `${p.name} | Workside Software`,
    `${p.description} Explore this Workside Software ${p.type.toLowerCase()}.`,
  ];
});

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const services = [
  ["Custom Web Applications", "Business software designed around your processes, with considered interfaces and reliable back-end systems.", ["Customer and operations portals", "Workflow and case management", "Integrations with your existing tools"]],
  ["iOS and Android Mobile Apps", "Mobile products for customers and teams, from early product definition through store release and ongoing updates.", ["Native and cross-platform apps", "Mobile-first product design", "App Store and Google Play delivery"]],
  ["AI and Business Automation", "Applied AI and automation for customer communications, internal workflows, and repetitive business tasks.", ["AI assistants and call handling", "Workflow automation", "Human review and escalation paths"]],
  ["Business Intelligence and Analytics", "Clearer views of the information your business already has, organized to support day-to-day decisions.", ["Operational dashboards", "Data pipelines and reporting", "Decision support tools"]],
  ["SaaS Product Development", "A practical path from product idea to a deployable software service, including the systems behind it.", ["Product discovery and architecture", "Account and subscription workflows", "Production deployment"]],
  ["SEO and Digital Growth", "A developing offering that connects a sound website foundation with search visibility and useful measurement.", ["Technical SEO foundations", "Content and page structure", "Analytics setup"]],
];

const nav = `<nav aria-label="Workside Software"><a href="/">Workside Software</a> <a href="/services">Services</a> <a href="/work">Work</a> <a href="/about">About</a> <a href="/contact">Contact</a></nav>`;
const footer = `<footer><p>Workside Software LLC</p><a href="/privacy">Privacy</a> <a href="/terms">Terms</a> <a href="/support">Support</a></footer>`;

// [text that must still exist in the matching component, body html]
const bodies = {
  "/": ["Software built around the way your business works.", `<h1>Software built around the way your business works.</h1><p>We develop custom web applications, mobile apps, AI-powered tools, and intelligent business platforms for companies ready to do more with technology.</p><p><a href="/contact">Discuss your project</a> <a href="/work">Explore our work</a></p><h2>What we build</h2>${list(["Web applications: purpose-built platforms that bring your workflows, data, and people together.", "Mobile apps: iOS and Android experiences designed for the way customers and teams actually work.", "AI and automation: practical AI tools and automations that reduce manual steps and improve response."])}<h2>Selected work</h2>${list(projects.map((p) => `${p.name}: ${p.description}`))}<p><a href="/services">See all services</a></p>`],
  "/services": ["Engineering for", `<h1>Custom software development services</h1><p>From a focused application to a complete digital product, we build technology that fits the way your business operates.</p>${services.map(([t, d, items]) => `<section><h2>${esc(t)}</h2><p>${esc(d)}</p>${list(items)}</section>`).join("")}<p><a href="/contact">Tell us what needs to work better</a></p>`],
  "/work": ["Software for the", `<h1>Our work: software products and client projects</h1><p>Products we are building, apps we have published, and software made with clients across different industries.</p>${projects.map((p) => `<section><h2><a href="/work/${p.slug}">${esc(p.name)}</a></h2><p>${esc(p.type)} · ${esc(p.category)}</p><p>${esc(p.description)}</p></section>`).join("")}`],
  "/about": ["Thoughtful software.", `<h1>About Workside Software</h1><p>We are a software development company building custom applications and products for businesses with problems worth solving.</p><h2>Practical engineering, from idea to production</h2><p>Our work spans web applications, mobile apps, AI-powered communications, analytics, and specialized business software. Some projects are our own products; others are developed with clients.</p><p>We take on the product details as well as the engineering: understanding the problem, shaping a useful experience, connecting the right systems, and preparing software for production.</p><p><a href="/work">Explore our work</a></p>`],
  "/contact": ["Tell us what", `<h1>Discuss your project</h1><p>Share a little about the challenge, the idea, or the process you would like to improve. Project types: custom web application, iOS or Android app, AI or business automation, business intelligence and analytics, SaaS product, SEO and digital growth.</p><p>Email: <a href="mailto:contact@worksidesoftware.com">contact@worksidesoftware.com</a></p>`],
};
projects.forEach((p) => {
  bodies[`/work/${p.slug}`] = [null, `<h1>${esc(p.name)}</h1><p>${esc(p.type)} · ${esc(p.category)}</p><p>${esc(p.description)}</p><p>${esc(p.detail)}</p>${p.link ? `<p><a href="${esc(p.link)}" rel="noopener">${esc(p.linkLabel)}</a></p>` : ""}<p><a href="/work">All work</a> <a href="/contact">Discuss your project</a></p>`];
});
["/privacy", "/terms", "/support"].forEach((r) => {
  bodies[r] = [null, `<h1>${esc(routes[r][0].replace(/ \| Workside Software$/, ""))}</h1><p>${esc(routes[r][1])}</p>`];
});

// Fail the build if the static copy drifts from the components it mirrors.
const components = { "/": "WorksidePanel", "/services": "Services", "/work": "Portfolio", "/about": "About", "/contact": "ContactWorkside" };
Object.entries(components).forEach(([route, file]) => {
  const marker = bodies[route][0];
  if (!read(`src/components/${file}.jsx`).includes(marker)) throw new Error(`Static copy for ${route} is out of date with ${file}.jsx ("${marker}" not found)`);
});

const organization = { "@context": "https://schema.org", "@type": "Organization", "@id": `${origin}/#organization`, name: "Workside Software LLC", url: origin, email: "contact@worksidesoftware.com", address: { "@type": "PostalAddress", addressLocality: "Bakersfield", addressRegion: "CA", addressCountry: "US" } };
const serviceSchemas = services.map(([name]) => ({ "@context": "https://schema.org", "@type": "Service", name, provider: { "@id": `${origin}/#organization` }, areaServed: "United States" }));
const schemaFor = (route) => JSON.stringify([organization, ...(route === "/services" ? serviceSchemas : [])]).replace(/</g, "\\u003c");

const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
const staticRoutes = Object.keys(bodies);
const guard = `<script>(function(){var p=location.pathname.replace(/\\/+$/,"")||"/";if(${JSON.stringify(staticRoutes)}.indexOf(p)<0){var r=document.getElementById("root");if(r)r.innerHTML=""}})()</script>`;

Object.entries(routes).forEach(([route, [title, description]]) => {
  const url = route === "/" ? `${origin}/` : `${origin}${route}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
  if (bodies[route]) {
    html = html
      .replace("</head>", `<script type="application/ld+json" data-workside-schema="true">${schemaFor(route)}</script></head>`)
      .replace('<div id="root"></div>', `<div id="root"><div data-static-seo>${nav}<main>${bodies[route][1]}</main>${footer}</div></div>${guard}`);
  }
  const file = route === "/" ? path.join(buildDir, "index.html") : path.join(buildDir, route, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
});

console.log(`Prerendered ${Object.keys(routes).length} routes (${staticRoutes.length} with crawler-visible copy)`);
