import React from "react";
import { Link } from "react-router-dom";

const capabilities = [
  ["01", "Web applications", "Purpose-built platforms that bring your workflows, data, and people together."],
  ["02", "Mobile apps", "iOS and Android experiences designed for the way customers and teams actually work."],
  ["03", "AI and automation", "Practical AI tools and automations that reduce manual steps and improve response."],
];

const Home = () => (
  <div>
    <section className="hero-section">
      <div className="container-max hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> INDEPENDENT SOFTWARE STUDIO · BAKERSFIELD, CA</p>
          <h1>Software built around the way your business works.</h1>
          <p className="hero-lede">We develop custom web applications, mobile apps, AI-powered tools, and intelligent business platforms for companies ready to do more with technology.</p>
          <div className="hero-actions">
            <Link to="/contact" className="button button-lime">Discuss Your Project <span aria-hidden="true">↗</span></Link>
            <Link to="/work" className="button button-quiet">Explore our work <span aria-hidden="true">↓</span></Link>
          </div>
          <div className="hero-note"><span>From first conversation to production</span><span className="note-line"/><span>Built with care in California</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract illustration of connected software components">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="art-label label-top">WORKFLOW <span>CONNECTED</span></div>
          <div className="art-panel panel-back"><i/><i/><i/></div>
          <div className="art-panel panel-front"><div className="panel-head"><span>WORKSPACE</span><span className="panel-live">● LIVE</span></div><div className="panel-chart"><div/><div/><div/><div/><div/><div/><div/><div/><div/></div><div className="panel-footer"><span>Insights</span><strong>↓ &nbsp; ACTION</strong></div></div>
          <div className="art-chip chip-one">01 &nbsp; BUILD</div><div className="art-chip chip-two">02 &nbsp; CONNECT</div><div className="art-chip chip-three">03 &nbsp; SHIP</div>
          <div className="art-label label-bottom">SOFTWARE THAT FITS</div>
        </div>
      </div>
    </section>
    <section className="intro-strip"><div className="container-max intro-inner"><p>We make useful software for real work.</p><span>Product thinking <b>·</b> Practical engineering <b>·</b> Production delivery</span></div></section>
    <section className="section-pad"><div className="container-max"><div className="section-heading"><div><p className="eyebrow eyebrow-dark">WHAT WE BUILD</p><h2>Good software starts<br/>with understanding the work.</h2></div><p className="section-aside">Every business has its own people, systems, and constraints. We get to know yours, then build technology that makes the next step easier.</p></div>
      <div className="capability-grid">{capabilities.map(([number, title, text])=><article className="capability" key={title}><span className="cap-number">{number}</span><h3>{title}</h3><p>{text}</p><Link to="/services" aria-label={`Explore ${title}`}>Explore service <span>↗</span></Link></article>)}</div>
    </div></section>
    <section className="work-preview"><div className="container-max"><div className="work-preview-top"><div><p className="eyebrow eyebrow-dark">SELECTED WORK</p><h2>A range of ideas.<br/>Made real in software.</h2></div><Link to="/work" className="text-link">See all projects <span>↗</span></Link></div><div className="preview-projects"><Link to="/work/sageset" className="preview-card preview-sage"><span className="project-type">PUBLISHED IOS APP</span><div className="preview-mark sage-mark">s.</div><div><strong>SageSet</strong><p>Fitness planning and camera-based exercise experiences.</p></div><span className="preview-arrow">↗</span></Link><Link to="/work/merxus-ai" className="preview-card preview-merxus"><span className="project-type">LIVE AI PRODUCT</span><div className="preview-mark merxus-mark">m.</div><div><strong>Merxus AI</strong><p>AI-powered call handling and business communications.</p></div><span className="preview-arrow">↗</span></Link><Link to="/work/workside-logistics" className="preview-card preview-logistics"><span className="project-type">WORKSIDE PRODUCT</span><div className="preview-mark logistics-mark">W/</div><div><strong>Workside Logistics</strong><p>Operational software for coordinating logistics workflows.</p></div><span className="preview-arrow">↗</span></Link></div></div></section>
    <section className="home-cta"><div className="container-max home-cta-inner"><div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make the work<br/>work better.</h2></div><Link to="/contact" className="button button-lime">Discuss Your Project <span aria-hidden="true">↗</span></Link></div></section>
  </div>
);

export default Home;
