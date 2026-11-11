import React from "react";
import { Link } from "react-router-dom";

const services = [
  ["01", "Custom Web Applications", "Business software designed around your processes, with considered interfaces and reliable back-end systems.", ["Customer and operations portals", "Workflow and case management", "Integrations with your existing tools"]],
  ["02", "iOS and Android Mobile Apps", "Mobile products for customers and teams, from early product definition through store release and ongoing updates.", ["Native and cross-platform apps", "Mobile-first product design", "App Store and Google Play delivery"]],
  ["03", "AI and Business Automation", "Applied AI and automation for customer communications, internal workflows, and repetitive business tasks.", ["AI assistants and call handling", "Workflow automation", "Human review and escalation paths"]],
  ["04", "Business Intelligence and Analytics", "Clearer views of the information your business already has, organized to support day-to-day decisions.", ["Operational dashboards", "Data pipelines and reporting", "Decision support tools"]],
  ["05", "SaaS Product Development", "A practical path from product idea to a deployable software service, including the systems behind it.", ["Product discovery and architecture", "Account and subscription workflows", "Production deployment"]],
  ["06", "SEO and Digital Growth", "A developing offering that connects a sound website foundation with search visibility and useful measurement.", ["Technical SEO foundations", "Content and page structure", "Analytics setup"]],
];

export default function Services() {
  return <main className="page-shell"><div className="container-max"><header className="page-intro"><p className="eyebrow eyebrow-dark">SERVICES</p><h1>Engineering for<br/>the next step.</h1><p>From a focused application to a complete digital product, we build technology that fits the way your business operates.</p></header><div className="services-list">{services.map(([number,title,description,items])=><article className="service-row" id={title.toLowerCase().replaceAll(" ","-")} key={title}><span className="service-number">{number}</span><div className="service-copy"><h2>{title}</h2><p>{description}</p></div><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div><section className="services-cta"><div><p className="eyebrow">START WITH A CONVERSATION</p><h2>Tell us what needs<br/>to work better.</h2></div><Link to="/contact" className="button button-lime">Discuss Your Project <span aria-hidden="true">↗</span></Link></section></div></main>;
}
