import React from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/appInfo";

export default function Footer() {
  return <footer className="site-footer"><div className="container-max"><div className="footer-main"><Link to="/" className="brand-lockup footer-brand"><span className="brand-symbol">W<span>.</span></span><span>WORKSIDE <b>SOFTWARE</b></span></Link><p>Custom software for the way<br/>your business works.</p><div className="footer-links"><Link to="/services">Services</Link><Link to="/work">Our Work</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/support">Product Support</Link></div></div><div className="footer-bottom"><span>© {APP_INFO.copyrightYear} Workside Software LLC</span><span>BAKERSFIELD, CALIFORNIA</span></div></div></footer>;
}
