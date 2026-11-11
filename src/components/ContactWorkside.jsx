import React, { useRef, useState } from "react";
import { APP_INFO } from "../constants/appInfo";

const projectTypes = [
  ["web-application", "Custom web application"],
  ["mobile-app", "iOS or Android app"],
  ["ai-automation", "AI or business automation"],
  ["business-intelligence", "Business intelligence and analytics"],
  ["saas-product", "SaaS product"],
  ["seo-growth", "SEO and digital growth"],
  ["other", "Something else"],
];

function newSubmissionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const value = Math.floor(Math.random() * 16);
    return (character === "x" ? value : (value & 0x3) | 0x8).toString(16);
  });
}

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    pagePath: window.location.pathname,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}

export default function ContactWorkside() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [method, setMethod] = useState("email");
  const submitLock = useRef(false);
  const submissionId = useRef(newSubmissionId());

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitLock.current || submitted) return;
    submitLock.current = true;
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      phone: data.get("phone"),
      projectType: data.get("projectType"),
      message: data.get("message"),
      preferredContactMethod: method,
      website: data.get("website"),
      submissionId: submissionId.current,
      attribution: readAttribution(),
    };

    try {
      const response = await fetch("/.netlify/functions/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not submit your inquiry. Please try again.");
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || "We could not submit your inquiry. Please try again or email us directly.");
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  }

  return <main className="contact-page"><div className="container-max"><div className="contact-grid"><div className="contact-copy"><p className="eyebrow">LET’S TALK</p><h1>Tell us what<br/>you’re working on.</h1><p>Share a little about the challenge, the idea, or the process you’d like to improve. We’ll start there.</p><div className="contact-direct"><span>Prefer email?</span><a href={`mailto:${APP_INFO.email.contact}`}>{APP_INFO.email.contact} ↗</a></div><div className="contact-location">BAKERSFIELD, CALIFORNIA<br/>Serving teams building useful software.</div></div><form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength="100" placeholder="Name" disabled={submitting || submitted}/></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength="254" placeholder="you@company.com" disabled={submitting || submitted}/></label></div>
      <label>Company <span className="optional">OPTIONAL</span><input name="company" autoComplete="organization" maxLength="120" placeholder="Company name" disabled={submitting || submitted}/></label>
      <label>Project type<select name="projectType" required defaultValue="" disabled={submitting || submitted}><option value="" disabled>Select a project type</option>{projectTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label>What would you like to build or improve?<textarea name="message" required maxLength="4000" rows="5" placeholder="A few details about your project, goals, or current workflow…" disabled={submitting || submitted}/></label>
      <fieldset disabled={submitting || submitted}><legend>How would you prefer we contact you?</legend><div className="method-options">{[["email", "Email"], ["phone", "Phone"], ["either", "Either"]].map(([value, label])=><label className={method===value?"method-option selected":"method-option"} key={value}><input type="radio" name="preferredContactMethod" value={value} checked={method===value} onChange={()=>setMethod(value)}/>{label}</label>)}</div></fieldset>
      {method !== "email" && <label>Phone number<input name="phone" type="tel" autoComplete="tel" required maxLength="40" pattern="[+()0-9.\-\s]*" placeholder="(555) 555-5555" disabled={submitting || submitted}/></label>}
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex="-1" autoComplete="off"/></label></div>
      <button type="submit" className="button button-lime form-submit" disabled={submitting || submitted}>{submitted ? "Inquiry received" : submitting ? "Sending…" : "Send project inquiry"}<span aria-hidden="true">{submitted ? "✓" : "↗"}</span></button>
      <p className="form-note">We store your inquiry to review it and follow up using your preferred contact method. See our <a href="/privacy">Privacy Policy</a>.</p>
      {error && <p role="alert" className="form-status form-error">{error} You can also email <a href={`mailto:${APP_INFO.email.contact}`}>{APP_INFO.email.contact}</a>.</p>}
      {submitted && <p role="status" className="form-status">Thanks for reaching out. Your inquiry has been received and we’ll follow up using your preferred contact method.</p>}
    </form></div></div></main>;
}
