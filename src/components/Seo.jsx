import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { projects } from "./portfolioData";

const origin = "https://worksidesoftware.com";
const pages = {
  "/": ["Custom Software Development | Workside Software", "Workside Software builds custom web applications, mobile apps, AI-powered tools, and business software for companies everywhere."],
  "/services": ["Custom Software Development Services | Workside Software", "Custom web applications, mobile apps, AI and automation, business intelligence, SaaS development, and digital growth services."],
  "/work": ["Our Work | Software Products and Client Projects | Workside", "Explore software products, published mobile apps, and client projects developed by Workside Software."],
  "/about": ["About Workside Software | Custom Software Development", "Meet Workside Software, a California software company building practical applications and products for real business needs."],
  "/contact": ["Discuss Your Project | Workside Software", "Tell Workside Software about your custom software, web application, mobile app, or AI project."],
  "/privacy": ["Privacy Policy | Workside Software", "Read the Workside Software website and product privacy policy."],
  "/terms": ["Terms of Use | Workside Software", "Review the terms of use for Workside Software and its services."],
  "/support": ["Product Support | Workside Software", "Get help with Workside Software products and services."],
};

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const projectMatch = matchPath("/work/:slug", pathname);
    const project = projectMatch && projects.find((item) => item.slug === projectMatch.params.slug);
    const fallback = ["Workside Software | Custom Business Software", "Workside Software builds custom applications and software products for business."];
    const [title, description] = project
      ? [`${project.name} | Workside Software`, `${project.description} Explore this Workside Software ${project.type.toLowerCase()}.`]
      : (pages[pathname] || fallback);
    document.title = title;
    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) { element = document.createElement("meta"); document.head.appendChild(element); }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', "name", "description");
    document.head.querySelector('meta[name="description"]').setAttribute("content", description);
    setMeta('meta[property="og:title"]', "property", "og:title");
    document.head.querySelector('meta[property="og:title"]').setAttribute("content", title);
    setMeta('meta[property="og:description"]', "property", "og:description");
    document.head.querySelector('meta[property="og:description"]').setAttribute("content", description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title");
    document.head.querySelector('meta[name="twitter:title"]').setAttribute("content", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description");
    document.head.querySelector('meta[name="twitter:description"]').setAttribute("content", description);
    setMeta('meta[property="og:type"]', "property", "og:type");
    document.head.querySelector('meta[property="og:type"]').setAttribute("content", "website");
    setMeta('meta[property="og:url"]', "property", "og:url");
    document.head.querySelector('meta[property="og:url"]').setAttribute("content", `${origin}${pathname}`);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${origin}${pathname === "/" ? "/" : pathname}`;
    let schema = document.head.querySelector("script[data-workside-schema]");
    if (!schema) { schema = document.createElement("script"); schema.type = "application/ld+json"; schema.dataset.worksideSchema = "true"; document.head.appendChild(schema); }
    const company = { "@context": "https://schema.org", "@type": "Organization", "@id": `${origin}/#organization`, name: "Workside Software LLC", url: origin, email: "contact@worksidesoftware.com", address: { "@type": "PostalAddress", addressLocality: "Bakersfield", addressRegion: "CA", addressCountry: "US" } };
    const services = pathname === "/services" ? ["Custom Web Applications", "iOS and Android Mobile Apps", "AI and Business Automation", "Business Intelligence and Analytics", "SaaS Product Development", "SEO and Digital Growth"].map((name) => ({ "@context": "https://schema.org", "@type": "Service", name, provider: { "@id": `${origin}/#organization` }, areaServed: "United States" })) : [];
    schema.textContent = JSON.stringify([company, ...services]);
  }, [pathname]);
  return null;
}
