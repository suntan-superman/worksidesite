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
  "/admin/content": ["Content Administration | Workside Software", "Authorized Workside Software content administration."],
  "/privacy": ["Privacy Policy | Workside Software", "Read the Workside Software website and product privacy policy."],
  "/terms": ["Terms of Use | Workside Software", "Review the terms of use for Workside Software and its services."],
  "/support": ["Product Support | Workside Software", "Get help with Workside Software products and services."],
  "/articles/how-much-does-custom-software-development-cost-for-a-small-business": ["How Much Does Custom Software Development Cost for a Small Business? | Workside Software", "Realistic cost drivers, project examples, and build-versus-buy guidance for small businesses evaluating custom software development."],
};

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seoPath = pathname.replace(/\/+$/, "") || "/";
    const projectMatch = matchPath("/work/:slug", seoPath);
    const project = projectMatch && projects.find((item) => item.slug === projectMatch.params.slug);
    const fallback = ["Workside Software | Custom Business Software", "Workside Software builds custom applications and software products for business."];
    let title = project
      ? [project.caseStudy?.seoTitle || `${project.name} | Workside Software`, project.caseStudy?.seoDescription || `${project.description} Explore this Workside Software ${project.type.toLowerCase()}.`]
      : (pages[seoPath] || fallback);
    let description = title[1];
    title = title[0];
    let active = true;
    const applyProjectMetadata = (publishedProject) => {
      if (!active) return;
      if (!publishedProject) {
        if (projectMatch) {
          title = "Project not found | Workside Software";
          description = "This project is not currently published by Workside Software.";
        }
        updateDocument();
        return;
      }
      title = publishedProject.caseStudy?.seoTitle || publishedProject.seoTitle || `${publishedProject.name} | Workside Software`;
      description = publishedProject.caseStudy?.seoDescription || publishedProject.metaDescription || `${publishedProject.description} Explore this Workside Software ${publishedProject.type.toLowerCase()}.`;
      indexable = publishedProject.indexable !== false;
      if (publishedProject.canonicalUrl) canonicalUrl = publishedProject.canonicalUrl;
      ogImage = publishedProject.openGraphImageUrl || publishedProject.coverImageUrl || publishedProject.imageUrl || "";
      updateDocument();
    };
    let indexable = true;
    let canonicalUrl = `${origin}${pathname === "/" ? "/" : pathname}`;
    let ogImage = project?.openGraphImageUrl || project?.imageUrl || "";
    const updateDocument = () => {
    document.title = title;
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
    robots.content = seoPath === "/admin/content" || (projectMatch && !indexable) || (projectMatch && title.startsWith("Project not found")) ? "noindex, nofollow" : "index, follow";
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
    setMeta('meta[property="og:image"]', "property", "og:image");
    document.head.querySelector('meta[property="og:image"]').setAttribute("content", ogImage.startsWith("https://") ? ogImage : `${origin}${ogImage || "/og-image.png"}`);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
    let schema = document.head.querySelector("script[data-workside-schema]");
    if (!schema) { schema = document.createElement("script"); schema.type = "application/ld+json"; schema.dataset.worksideSchema = "true"; document.head.appendChild(schema); }
    const company = { "@context": "https://schema.org", "@type": "Organization", "@id": `${origin}/#organization`, name: "Workside Software LLC", url: origin, email: "contact@worksidesoftware.com", address: { "@type": "PostalAddress", addressLocality: "Bakersfield", addressRegion: "CA", addressCountry: "US" } };
    const services = seoPath === "/services" ? ["Custom Web Applications", "iOS and Android Mobile Apps", "AI and Business Automation", "Business Intelligence and Analytics", "SaaS Product Development", "SEO and Digital Growth"].map((name) => ({ "@context": "https://schema.org", "@type": "Service", name, provider: { "@id": `${origin}/#organization` }, areaServed: "United States" })) : [];
    schema.textContent = JSON.stringify([company, ...services]);
    };
    updateDocument();
    if (projectMatch) {
      fetch("/.netlify/functions/public-content", { headers: { Accept: "application/json" } })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error("unavailable")))
        .then((data) => applyProjectMetadata((data.projects || []).find((item) => item.slug === projectMatch.params.slug)))
        .catch(() => {});
    }
    return () => { active = false; };
  }, [pathname]);
  return null;
}
