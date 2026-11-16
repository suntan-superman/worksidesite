import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePublishedContent } from "./usePublishedContent";

export function Portfolio() {
  const { projects } = usePublishedContent();
  return <main className="page-shell"><div className="container-max"><header className="page-intro"><p className="eyebrow eyebrow-dark">OUR WORK</p><h1>Software for the<br/>work people do.</h1><p>Products we’re building, apps we’ve published, and software made with clients across different industries.</p></header>{projects.length > 0 && <div className="portfolio-grid">{projects.map((project)=><Link to={`/work/${project.slug}`} className={`portfolio-card project-${project.className || "custom"}`} key={project.slug}><div className="portfolio-card-top"><span className="project-type">{project.type}</span><span className="portfolio-arrow" aria-hidden="true">↗</span></div>{project.imageUrl && project.imagePresentation !== "cover" ? <img className={`portfolio-mark portfolio-image ${project.imagePresentation || ""}`} src={project.imageUrl} alt="" loading="lazy" /> : <div className={`portfolio-mark mark-${project.className || "custom"}`}>{project.mark || project.name.slice(0, 1)}</div>}<div><p className="portfolio-category">{project.category}</p><h2>{project.name}</h2><p className="portfolio-description">{project.description}</p></div><span className="portfolio-more">Project details <span>↗</span></span></Link>)}</div>}</div></main>;
}

function StudySection({ number, title, children }) {
  return <section className="study-section"><span className="study-number">{number}</span><div><h2>{title}</h2>{children}</div></section>;
}

export function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loaded } = usePublishedContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <main className="page-shell"><div className="container-max">{!loaded ? <p>Loading project…</p> : <><h1>Project not found</h1><Link to="/work" className="text-link">Back to our work</Link></>}</div></main>;
  const study = project.caseStudy;
  return <main className="page-shell"><div className="container-max"><Link to="/work" className="back-link">← &nbsp; All work</Link>
    <section className={`project-detail project-${project.className || "custom"}`}>
      <div className="project-detail-copy"><p className="eyebrow eyebrow-dark">{project.type} &nbsp; / &nbsp; {project.category}</p><h1>{project.name}</h1><p className="project-detail-lede">{project.description}</p><p className="project-detail-body">{project.detail}</p>{project.link && <a className="button button-dark" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || "Visit project"} <span aria-hidden="true">↗</span></a>}</div>
      {project.imageUrl ? <figure className={`project-detail-visual visual-${project.imagePresentation || "cover"}`}><img className="project-detail-image" src={project.imageUrl} alt={project.imageAlt || `${project.name} project image`} loading="lazy" />{project.imageCaption && <figcaption>{project.imageCaption}</figcaption>}</figure> : <div className={`project-detail-art mark-${project.className || "custom"}`} aria-label={`${project.name} project mark`}><span>{project.mark || project.name.slice(0, 1)}</span><small>{project.name.toUpperCase()}</small><i/><i/><i/></div>}
    </section>
    {study && <section className="project-study" aria-label={`${project.name} case study`}>
      <StudySection number="01" title="The business problem"><p>{study.problem}</p></StudySection>
      <StudySection number="02" title="The solution"><p>{study.solution}</p></StudySection>
      <StudySection number="03" title="Key features"><ul>{(study.features || []).map((feature) => <li key={feature}>{feature}</li>)}</ul></StudySection>
      <StudySection number="04" title="Technical capabilities demonstrated"><ul>{(study.technical || []).map((capability) => <li key={capability}>{capability}</li>)}</ul></StudySection>
      <StudySection number="05" title="Project status"><p>{project.statusNote || project.type}</p></StudySection>
    </section>}
    <section className="project-next"><div><p>Have a similar problem to solve?</p><Link to="/contact" className="text-link">Discuss Your Project <span>↗</span></Link></div><Link to="/work" className="back-link">Browse all projects</Link></section>
  </div></main>;
}
