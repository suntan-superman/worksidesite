import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePublishedContent } from "./usePublishedContent";

export function Portfolio() {
  const { projects } = usePublishedContent();
  return <main className="page-shell"><div className="container-max"><header className="page-intro"><p className="eyebrow eyebrow-dark">OUR WORK</p><h1>Software for the<br/>work people do.</h1><p>Products we’re building, apps we’ve published, and software made with clients across different industries.</p></header>{projects.length > 0 && <div className="portfolio-grid">{projects.map((project)=><ProjectCard key={project.slug} project={project} />)}</div>}</div></main>;
}

function ProjectCard({ project }) {
  const cardImage = project.logoUrl || (project.imageUrl && project.imagePresentation !== "cover" ? project.imageUrl : "");
  const imageAlt = project.logoUrl ? project.logoAlt || `${project.name} logo` : project.imageAlt || "";
  return <Link to={`/work/${project.slug}`} className={`portfolio-card project-${project.className || "custom"}${project.featured ? " is-featured" : ""}`}><div className="portfolio-card-top"><span className="project-type">{project.type}</span>{project.featured && <span className="project-featured">Featured</span>}<span className="portfolio-arrow" aria-hidden="true">↗</span></div>{cardImage ? <img className={`portfolio-mark portfolio-image ${project.logoUrl ? "logo" : project.imagePresentation || ""}`} src={cardImage} alt={imageAlt} loading="lazy" /> : <div className={`portfolio-mark mark-${project.className || "custom"}`}>{project.mark || project.name.slice(0, 1)}</div>}<div><p className="portfolio-category">{project.category}</p><h2>{project.name}</h2><p className="portfolio-description">{project.description}</p></div><span className="portfolio-more">Project details <span>↗</span></span></Link>;
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
  const projectImage = project.coverImageUrl || project.imageUrl || project.logoUrl || "";
  const projectImageAlt = project.coverImageUrl || project.imageUrl ? project.imageAlt || `${project.name} project image` : project.logoAlt || `${project.name} logo`;
  const projectImagePresentation = project.coverImageUrl || project.imageUrl ? project.imagePresentation || "cover" : "logo";
  return <main className="page-shell"><div className="container-max"><Link to="/work" className="back-link">← &nbsp; All work</Link>
    <section className={`project-detail project-${project.className || "custom"}`}>
      <div className="project-detail-copy"><p className="eyebrow eyebrow-dark">{project.type} &nbsp; / &nbsp; {project.category}</p><h1>{project.name}</h1><p className="project-detail-lede">{project.description}</p>{(project.fullDescription || project.detail) && <p className="project-detail-body">{project.fullDescription || project.detail}</p>}{project.statusNote && <p className="status-note">{project.statusNote}</p>}{(project.link || project.websiteUrl || project.appStoreUrl || project.googlePlayUrl || project.demoUrl) && <div className="project-public-links">{[project.appStoreUrl && ["App Store", project.appStoreUrl], project.googlePlayUrl && ["Google Play", project.googlePlayUrl], project.demoUrl && ["View demo", project.demoUrl], (project.websiteUrl || project.link) && [project.linkLabel || "Visit project website", project.websiteUrl || project.link]].filter(Boolean).map(([label, url]) => <a className="button button-dark" href={url} target="_blank" rel="noopener noreferrer" key={`${label}-${url}`}>{label} <span aria-hidden="true">↗</span></a>)}</div>}</div>
      {projectImage ? <figure className={`project-detail-visual visual-${projectImagePresentation}`}><img className="project-detail-image" src={projectImage} alt={projectImageAlt} loading="lazy" />{project.imageCaption && <figcaption>{project.imageCaption}</figcaption>}</figure> : <div className={`project-detail-art mark-${project.className || "custom"}`} aria-label={`${project.name} project mark`}><span>{project.mark || project.name.slice(0, 1)}</span><small>{project.name.toUpperCase()}</small><i/><i/><i/></div>}
    </section>
    {study && <section className="project-study" aria-label={`${project.name} case study`}>
      {study.problem && <StudySection number="01" title="The business problem"><p>{study.problem}</p></StudySection>}
      {study.solution && <StudySection number="02" title="The solution"><p>{study.solution}</p></StudySection>}
      {study.features?.length > 0 && <StudySection number="03" title="Key features"><ul>{study.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></StudySection>}
      {study.technical?.length > 0 && <StudySection number="04" title="Technical capabilities demonstrated"><ul>{study.technical.map((capability) => <li key={capability}>{capability}</li>)}</ul></StudySection>}
      {project.technologies?.length > 0 && <StudySection number="05" title="Technologies"><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></StudySection>}
      {project.industries?.length > 0 && <StudySection number="06" title="Industries served"><ul>{project.industries.map((industry) => <li key={industry}>{industry}</li>)}</ul></StudySection>}
      {project.developmentChallenges?.length > 0 && <StudySection number="07" title="Development challenges"><ul>{project.developmentChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></StudySection>}
      {project.outcomes?.length > 0 && <StudySection number="08" title="Outcomes and accomplishments"><ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></StudySection>}
      {(project.statusNote || project.releaseStatus || project.type) && <StudySection number="09" title="Project status"><p>{project.statusNote || project.releaseStatus || project.type}</p></StudySection>}
    </section>}
    {project.gallery?.length > 0 && <section className="project-gallery" aria-label={`${project.name} screenshots`}><h2>Project screenshots</h2><div>{project.gallery.map((image) => <figure key={image.url}><img src={image.url} alt={image.altText} loading="lazy" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}
    <section className="project-next"><div><p>Have a similar problem to solve?</p><Link to="/contact" className="text-link">Discuss Your Project <span>↗</span></Link></div><Link to="/work" className="back-link">Browse all projects</Link></section>
  </div></main>;
}
