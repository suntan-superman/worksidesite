import React, { useState } from "react";
import { APP_INFO } from "../constants/appInfo";

export default function ContactWorkside() {
  const [sent, setSent] = useState(false);
  const [method, setMethod] = useState("Email");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) return;
    const name = data.get("name");
    const email = data.get("email");
    const company = data.get("company") || "Not provided";
    const phone = data.get("phone") || "Not provided";
    const project = data.get("project");
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPreferred contact: ${method}\nPhone: ${phone}\n\nProject details:\n${project}`);
    window.location.href = `mailto:${APP_INFO.email.contact}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return <main className="contact-page"><div className="container-max"><div className="contact-grid"><div className="contact-copy"><p className="eyebrow">LET’S TALK</p><h1>Tell us what<br/>you’re working on.</h1><p>Share a little about the challenge, the idea, or the process you’d like to improve. We’ll start there.</p><div className="contact-direct"><span>Prefer email?</span><a href={`mailto:${APP_INFO.email.contact}`}>{APP_INFO.email.contact} ↗</a></div><div className="contact-location">BAKERSFIELD, CALIFORNIA<br/>Serving teams building useful software.</div></div><form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Name"/></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@company.com"/></label></div>
      <label>Company <span className="optional">OPTIONAL</span><input name="company" autoComplete="organization" placeholder="Company name"/></label>
      <label>What would you like to build or improve?<textarea name="project" required rows="5" placeholder="A few details about your project, goals, or current workflow…"/></label>
      <fieldset><legend>How would you prefer we contact you?</legend><div className="method-options">{["Email", "Phone", "Either"].map((option)=><label className={method===option?"method-option selected":"method-option"} key={option}><input type="radio" name="preferred" value={option} checked={method===option} onChange={()=>setMethod(option)}/>{option}</label>)}</div></fieldset>
      {method !== "Email" && <label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="(555) 555-5555"/></label>}
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex="-1" autoComplete="off"/></label></div>
      <button type="submit" className="button button-lime form-submit">Prepare your email <span aria-hidden="true">↗</span></button>
      <p className="form-note">This opens your email app with your message addressed to Workside Software. Nothing is sent from this page.</p>
      {sent && <p role="status" className="form-status">Your email app should be open with the message ready. If it didn’t open, email <a href={`mailto:${APP_INFO.email.contact}`}>{APP_INFO.email.contact}</a>.</p>}
    </form></div></div></main>;
}
