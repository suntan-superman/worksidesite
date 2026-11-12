import React, { useEffect, useMemo, useState } from "react";
import { projects as defaultProjects } from "./portfolioData";

const endpoint = "/.netlify/functions/manage-content";
const emptyProject = { slug: "", name: "", type: "", category: "", description: "", detail: "", mark: "", link: "", linkLabel: "", imageUrl: "", status: "draft" };
const emptyTestimonial = { quote: "", name: "", attribution: "", imageUrl: "", status: "draft" };

async function request(action, options = {}) {
  const response = await fetch(`${endpoint}?action=${action}`, { credentials: "same-origin", ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || body.error || "The request could not be completed.");
  return body;
}

export default function AdminContent() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState({ projects: [], testimonials: [] });
  const [kind, setKind] = useState("project");
  const [id, setId] = useState("");
  const [form, setForm] = useState(emptyProject);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const projectRows = useMemo(() => defaultProjects.map((base) => {
    const saved = items.projects.find((entry) => entry.slug === base.slug);
    return { ...base, ...(saved || {}), id: saved?.id || base.slug, isDefault: true };
  }).concat(items.projects.filter((entry) => !defaultProjects.some((base) => base.slug === entry.slug))), [items.projects]);

  async function refresh() {
    const data = await request("list");
    setItems(data);
    setAuthenticated(true);
  }

  useEffect(() => { refresh().catch(() => setAuthenticated(false)); }, []);

  async function signIn(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    try { await request("login", { method: "POST", body: JSON.stringify({ password }) }); setPassword(""); await refresh(); }
    catch (error) { setMessage(error.message === "invalid_credentials" ? "The sign-in details were not accepted." : "Sign-in is not available. Check the site configuration or try again later."); }
    finally { setBusy(false); }
  }

  async function signOut() {
    setBusy(true);
    try { await request("logout", { method: "POST", body: "{}" }); setAuthenticated(false); setItems({ projects: [], testimonials: [] }); setMessage("Signed out."); }
    catch { setMessage("Could not sign out. Close this tab to end the session."); }
    finally { setBusy(false); }
  }

  function startNew(nextKind = kind) {
    setKind(nextKind); setId(""); setForm(nextKind === "project" ? emptyProject : emptyTestimonial); setMessage("");
  }

  function edit(row, nextKind) {
    setKind(nextKind); setId(row.id || "");
    const defaults = nextKind === "project" ? emptyProject : emptyTestimonial;
    setForm({ ...defaults, ...row, status: row.status || "published" }); setMessage("");
  }

  async function save(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      await request("save", { method: "POST", body: JSON.stringify({ id, content: { ...form, kind } }) });
      await refresh(); setMessage("Saved. Public pages show published content only.");
    } catch (error) { setMessage(error.message === "invalid_content" ? "Review the fields and try again." : "The content could not be saved. Please try again."); }
    finally { setBusy(false); }
  }

  async function remove(row, nextKind) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    setBusy(true); setMessage("");
    try { await request("delete", { method: "POST", body: JSON.stringify({ id: row.id, kind: nextKind }) }); await refresh(); setMessage("Deleted."); }
    catch (error) { setMessage(error.message === "set_draft_to_hide_existing_project" ? "Existing projects are kept in the portfolio; set this one to draft to hide it." : "The item could not be deleted."); }
    finally { setBusy(false); }
  }

  const isProject = kind === "project";
  return <main className="admin-content-page"><div className="container-max"><header className="admin-content-heading"><div><p className="eyebrow eyebrow-dark">WORKSIDE CONTENT</p><h1>Portfolio and testimonials</h1><p>Only published entries appear on the public website. Portfolio projects already on the site remain available until you change their status.</p></div>{authenticated && <button className="button button-dark" onClick={signOut} disabled={busy}>Sign out</button>}</header>
    {!authenticated ? <form className="admin-content-panel admin-content-login" onSubmit={signIn}><label>Admin password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="button button-dark" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button><p>Content editing is restricted to authorized Workside administrators.</p></form> : <div className="admin-content-layout">
      <section className="admin-content-panel"><div className="admin-content-tabs"><button type="button" className={kind === "project" ? "selected" : ""} onClick={() => startNew("project")}>Projects</button><button type="button" className={kind === "testimonial" ? "selected" : ""} onClick={() => startNew("testimonial")}>Testimonials</button></div>
        <div className="admin-content-list">{(isProject ? projectRows : items.testimonials).map((row) => <article className="admin-content-row" key={row.id}><div><strong>{isProject ? row.name : row.name}</strong><span>{row.status || (row.isDefault ? "published" : "draft")}</span></div><button type="button" onClick={() => edit(row, kind)}>Edit</button>{!row.isDefault && <button type="button" className="delete" disabled={busy} onClick={() => remove(row, kind)}>Delete</button>}</article>)}{!isProject && items.testimonials.length === 0 && <p>No testimonials yet. Add only approved, genuine customer feedback.</p>}</div>
        <button type="button" className="button button-quiet admin-add-content" onClick={() => startNew(kind)}>Add {isProject ? "project" : "testimonial"}</button>
      </section>
      <form className="admin-content-panel admin-content-form" onSubmit={save}><h2>{id ? "Edit" : "New"} {isProject ? "project" : "testimonial"}</h2>
        {isProject ? <>
          <label>Project slug<input required maxLength="70" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label>Project name<input required maxLength="120" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <div className="admin-content-fields"><label>Type<input required maxLength="80" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} /></label><label>Category<input required maxLength="100" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label></div>
          <label>Description<textarea required maxLength="700" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label>Project details<textarea maxLength="3000" rows="4" value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} /></label>
          <label>Verified project link (HTTPS)<input type="url" maxLength="1000" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></label>
          <label>Link label<input maxLength="120" value={form.linkLabel} onChange={(e) => setForm({ ...form, linkLabel: e.target.value })} /></label>
          <label>Image URL (optional, HTTPS)<input type="url" maxLength="1000" value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></label>
        </> : <>
          <label>Customer quote<textarea required maxLength="1600" rows="5" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} /></label>
          <label>Customer name<input required maxLength="120" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Attribution (optional)<input maxLength="160" value={form.attribution} onChange={(e) => setForm({ ...form, attribution: e.target.value })} /></label>
          <label>Image URL (optional, HTTPS)<input type="url" maxLength="1000" value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></label>
        </>}
        <label>Visibility<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="draft">Draft — hidden from the public site</option><option value="published">Published — visible on the public site</option></select></label>
        <div className="admin-content-actions"><button className="button button-dark" disabled={busy}>{busy ? "Saving…" : "Save"}</button><button type="button" className="button button-quiet" disabled={busy} onClick={() => startNew(kind)}>Clear</button></div>
      </form>
    </div>}{message && <p className="admin-content-status" role="status">{message}</p>}</div></main>;
}
