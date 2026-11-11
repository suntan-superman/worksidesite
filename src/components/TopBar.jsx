import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return <header className="site-header"><div className="container-max header-inner"><Link to="/" className="brand-lockup" aria-label="Workside Software home"><span className="brand-symbol">W<span>.</span></span><span>WORKSIDE <b>SOFTWARE</b></span></Link><span className="header-note">SOFTWARE FOR THE WAY YOU WORK</span></div></header>;
}
