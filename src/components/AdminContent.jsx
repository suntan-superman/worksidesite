import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiEye, FiEyeOff, FiImage, FiTrash2, FiUpload, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { projects as defaultProjects } from "./portfolioData";

const endpoint = "/.netlify/functions/manage-content";
const emptyProject = {
  slug: "", name: "", type: "", category: "", description: "", detail: "", fullDescription: "", statusNote: "", mark: "", className: "custom",
  link: "", linkLabel: "", websiteUrl: "", appStoreUrl: "", googlePlayUrl: "", demoUrl: "", imageUrl: "", logoUrl: "", coverImageUrl: "", imageAlt: "", imageCaption: "", imagePresentation: "cover", gallery: [],
  businessProblem: "", solution: "", keyFeatures: [], technicalCapabilities: [], technologies: [], industries: [], developmentChallenges: [], outcomes: [],
  releaseStatus: "In development", status: "draft", featured: false, displayOrder: 1000, seoTitle: "", metaDescription: "", canonicalUrl: "", openGraphImageUrl: "", indexable: true,
};
const emptyTestimonial = { quote: "", name: "", attribution: "", imageUrl: "", status: "draft" };

async function request(action, options = {}) {
  const response = await fetch(`${endpoint}?action=${action}`, { credentials: "same-origin", ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || body.error || "The request could not be completed.");
    error.code = body.error;
    throw error;
  }
  return body;
}

function lines(value) { return Array.isArray(value) ? value.join("\n") : value || ""; }
function toForm(row, kind) {
  if (kind === "testimonial") return { ...emptyTestimonial, ...row, status: row.status || "published" };
  const study = row.caseStudy || {};
  return {
    ...emptyProject, ...row,
    status: row.status || "published",
    businessProblem: row.businessProblem || study.problem || "",
    solution: row.solution || study.solution || "",
    keyFeatures: lines(row.keyFeatures || study.features),
    technicalCapabilities: lines(row.technicalCapabilities || study.technical),
    seoTitle: row.seoTitle || study.seoTitle || "",
    metaDescription: row.metaDescription || study.seoDescription || "",
    websiteUrl: row.websiteUrl || row.link || "",
    coverImageUrl: row.coverImageUrl || row.imageUrl || "",
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    technologies: lines(row.technologies), industries: lines(row.industries), developmentChallenges: lines(row.developmentChallenges), outcomes: lines(row.outcomes),
  };
}
function toPayload(form) {
  return {
    ...form,
    keyFeatures: lines(form.keyFeatures).split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    technicalCapabilities: lines(form.technicalCapabilities).split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    technologies: lines(form.technologies).split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    industries: lines(form.industries).split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    developmentChallenges: lines(form.developmentChallenges).split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    outcomes: lines(form.outcomes).split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    imageUrl: form.coverImageUrl || "",
    canonicalUrl: form.canonicalUrl || (form.slug ? `https://worksidesoftware.com/work/${form.slug}` : ""),
  };
}

function fileToWebp(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error("Choose an image file."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The image could not be opened."));
      image.onload = () => {
        const scale = Math.min(1, 1800 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) return reject(new Error("Image processing is unavailable in this browser."));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("The image could not be optimized."));
          if (blob.size > 4 * 1024 * 1024) return reject(new Error("Use an image under 4 MB after resizing."));
          const blobReader = new FileReader();
          blobReader.onerror = () => reject(new Error("The optimized image could not be read."));
          blobReader.onload = () => resolve(String(blobReader.result).split(",")[1]);
          blobReader.readAsDataURL(blob);
        }, "image/webp", 0.84);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function displayDate(value) {
  const date = value?.toDate ? value.toDate() : value?.seconds ? new Date(value.seconds * 1000) : value?._seconds ? new Date(value._seconds * 1000) : value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString() : "Timestamp unavailable";
}

export default function AdminContent() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [items, setItems] = useState({ projects: [], testimonials: [] });
  const [kind, setKind] = useState("project");
  const [id, setId] = useState("");
  const [form, setForm] = useState(emptyProject);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [publicationFilter, setPublicationFilter] = useState("all");
  const fileInput = useRef(null);
  const dirty = useRef(false);

  const projectRows = useMemo(() => defaultProjects.map((base) => {
    const saved = items.projects.find((entry) => entry.slug === base.slug);
    return { ...base, ...(saved || {}), id: saved?.id || base.slug, isDefault: true, isPersisted: Boolean(saved), updatedAt: saved?.updatedAt || null };
  }).concat(items.projects.filter((entry) => !defaultProjects.some((base) => base.slug === entry.slug)).map((entry) => ({ ...entry, isPersisted: true }))), [items.projects]);
  const missingBuiltInCount = useMemo(() => projectRows.filter((row) => row.isDefault && !row.isPersisted).length, [projectRows]);
  const categories = useMemo(() => [...new Set(projectRows.map((entry) => entry.category).filter(Boolean))].sort(), [projectRows]);
  const filteredProjects = useMemo(() => projectRows.filter((row) => {
    const publication = row.status || (row.isDefault ? "published" : "draft");
    return (!search || `${row.name} ${row.slug}`.toLowerCase().includes(search.toLowerCase()))
      && (categoryFilter === "all" || row.category === categoryFilter)
      && (statusFilter === "all" || (row.releaseStatus || row.type) === statusFilter)
      && (publicationFilter === "all" || publication === publicationFilter);
  }).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (a.displayOrder ?? 1000) - (b.displayOrder ?? 1000) || a.name.localeCompare(b.name)), [projectRows, search, categoryFilter, statusFilter, publicationFilter]);

  async function refresh() {
    const data = await request("list");
    setItems(data);
    setAuthenticated(true);
  }
  useEffect(() => { refresh().catch(() => {}); }, []);
  useEffect(() => {
    const warn = (event) => { if (dirty.current) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  function confirmDiscard() { return !dirty.current || window.confirm("Discard unsaved changes?"); }
  function startNew(nextKind = kind) {
    if (!confirmDiscard()) return;
    dirty.current = false; setKind(nextKind); setId(""); setForm(nextKind === "project" ? emptyProject : emptyTestimonial); setMessage("");
  }
  function edit(row, nextKind) {
    if (!confirmDiscard()) return;
    dirty.current = false; setKind(nextKind); setId(row.id || ""); setForm(toForm(row, nextKind)); setMessage("");
  }
  function change(field, value) { dirty.current = true; setForm((current) => ({ ...current, [field]: value })); }

  async function signIn(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    try { await request("login", { method: "POST", body: JSON.stringify({ password }) }); setPassword(""); await refresh(); }
    catch (error) { setMessage(error.code === "invalid_credentials" ? "The sign-in details were not accepted." : error.code === "too_many_attempts" ? "Too many attempts. Wait a little before trying again." : "Sign-in is not available. Check the site configuration or try again later."); }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true);
    try { await request("logout", { method: "POST", body: "{}" }); setAuthenticated(false); setItems({ projects: [], testimonials: [] }); dirty.current = false; setMessage("Signed out."); }
    catch { setMessage("Could not sign out. Close this tab to end the session."); }
    finally { setBusy(false); }
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const content = isProject ? toPayload(form) : form;
      const saved = await request("save", { method: "POST", body: JSON.stringify({ id, content: { ...content, kind } }) });
      setId(saved.id); await refresh(); dirty.current = false; setMessage("Saved. Published projects appear on the public website.");
    } catch (error) {
      const errors = { invalid_content: "Review the required fields and field limits.", duplicate_project_slug: "That project URL is already in use. Edit the existing project or choose another slug.", content_unavailable: "Content storage is temporarily unavailable. Your changes were not saved." };
      setMessage(errors[error.code] || "The content could not be saved. Please try again.");
    } finally { setBusy(false); }
  }
  async function remove(row, nextKind) {
    if (!window.confirm(`Delete “${row.name || row.slug}”? ${row.isDefault ? "This will archive the built-in project." : "This cannot be undone."}`)) return;
    setBusy(true); setMessage("");
    try { const outcome = await request("delete", { method: "POST", body: JSON.stringify({ id: row.id, kind: nextKind }) }); await refresh(); if (id === row.id) startNew(nextKind); setMessage(outcome.archived ? "Project archived." : "Deleted."); }
    catch { setMessage("The item could not be deleted."); }
    finally { setBusy(false); }
  }
  async function migrateExistingProjects() {
    setBusy(true); setMessage("");
    try { const report = await request("migrate", { method: "POST", body: JSON.stringify({ projects: defaultProjects }) }); await refresh(); setMessage(`Portfolio import complete: ${report.created} added; ${report.skipped.length} existing projects preserved.`); }
    catch { setMessage("Existing projects could not be imported. No saved project content was overwritten."); }
    finally { setBusy(false); }
  }
  async function uploadImageFiles(fileList, target) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    if (target === "gallery" && files.length + (form.gallery || []).length > 12) {
      setMessage("A project can have up to 12 screenshots. Select fewer files.");
      return;
    }
    setUploading(true);
    const uploadedGallery = [];
    let uploadedUrl = "";
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setMessage(`Optimizing ${file.name} (${index + 1} of ${files.length})…`);
        const base64 = await fileToWebp(file);
        setMessage(`Uploading ${file.name} (${index + 1} of ${files.length})…`);
        const slug = form.slug || "new-project";
        const uploaded = await request("upload", { method: "POST", body: JSON.stringify({ slug, mimeType: "image/webp", base64 }) });
        uploadedUrl = uploaded.url;
        if (target === "gallery") {
          const label = file.name.replace(/\.[^.]+$/, "");
          const galleryEntry = { url: uploaded.url, storagePath: uploaded.path, caption: label, altText: label, order: (form.gallery || []).length + uploadedGallery.length };
          uploadedGallery.push(galleryEntry);
          dirty.current = true;
          setForm((current) => ({ ...current, gallery: [...(current.gallery || []), galleryEntry] }));
        }
      }
      if (target !== "gallery") {
        change(target, uploadedUrl);
        if (target === "coverImageUrl") change("imageUrl", uploadedUrl);
      }
      setMessage(`${files.length} image${files.length === 1 ? "" : "s"} uploaded. Review the preview and save the project to publish the image${files.length === 1 ? "" : "s"}.`);
    } catch (error) {
      const errors = { media_storage_not_configured: "Image storage is not configured on the server. Set FIREBASE_STORAGE_BUCKET for the approved Workside Firebase project.", invalid_media: "Use a valid PNG, JPEG, or WebP image file.", media_too_large: "The optimized image must be 4 MB or smaller." };
      setMessage(errors[error.code] || error.message || "The image could not be uploaded.");
    } finally { setUploading(false); if (fileInput.current) fileInput.current.value = ""; }
  }
  function updateGallery(index, field, value) {
    const gallery = [...(form.gallery || [])]; gallery[index] = { ...gallery[index], [field]: value }; change("gallery", gallery);
  }
  function moveGallery(index, offset) {
    const gallery = [...(form.gallery || [])]; const next = index + offset;
    if (next < 0 || next >= gallery.length) return;
    [gallery[index], gallery[next]] = [gallery[next], gallery[index]];
    change("gallery", gallery.map((image, order) => ({ ...image, order })));
  }
  function removeGallery(index) { change("gallery", (form.gallery || []).filter((_, itemIndex) => itemIndex !== index).map((image, order) => ({ ...image, order }))); }

  const isProject = kind === "project";
  const input = (label, field, props = {}) => { const { onChange, ...inputProps } = props; return <label>{label}<input {...inputProps} value={form[field] ?? ""} onChange={(event) => onChange ? onChange(event) : change(field, event.target.value)} /></label>; };
  const textarea = (label, field, props = {}) => <label>{label}<textarea {...props} value={lines(form[field])} onChange={(event) => change(field, event.target.value)} /></label>;
  return <main className="admin-content-page"><div className="container-max"><header className="admin-content-heading"><div><p className="eyebrow eyebrow-dark">WORKSIDE CONTENT</p><h1>Portfolio and testimonials</h1><p>Manage project details, visibility, screenshots and search information. Only published, indexable projects appear in public listings and the sitemap.</p></div>{authenticated && <button className="button button-dark" onClick={signOut} disabled={busy}>Sign out</button>}</header>
    {!authenticated ? <form className="admin-content-panel admin-content-login" onSubmit={signIn}><label htmlFor="admin-password">Admin password</label><div className="admin-password-field"><input id="admin-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" className="admin-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}</button></div><button className="button button-dark" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button><p>Content editing is restricted to authorized Workside administrators.</p></form> : <div className="admin-content-layout">
      <section className="admin-content-panel"><div className="admin-content-tabs"><button type="button" className={kind === "project" ? "selected" : ""} onClick={() => startNew("project")}>Projects</button><button type="button" className={kind === "testimonial" ? "selected" : ""} onClick={() => startNew("testimonial")}>Testimonials</button></div>
        {isProject && <>
          <div className="admin-project-import-box"><div><strong>Built-in portfolio projects</strong><span>{missingBuiltInCount ? `${missingBuiltInCount} of ${defaultProjects.length} are not yet saved to Firestore.` : `All ${defaultProjects.length} built-in projects are saved to Firestore.`}</span></div><button type="button" className="button button-dark admin-project-import" disabled={busy || missingBuiltInCount === 0} onClick={migrateExistingProjects}>{busy ? "Importing…" : missingBuiltInCount ? `Import ${missingBuiltInCount} missing projects` : "All projects saved"}</button></div>
          <div className="admin-content-filters"><label>Search projects<input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or URL slug" /></label><label>Category<select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="all">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Release status<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="all">All release statuses</option>{[...new Set(projectRows.map((row) => row.releaseStatus || row.type).filter(Boolean))].map((status) => <option key={status}>{status}</option>)}</select></label><label>Publication<select value={publicationFilter} onChange={(e) => setPublicationFilter(e.target.value)}><option value="all">All states</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label></div>
        </>}
        <div className="admin-content-list">{(isProject ? filteredProjects : items.testimonials).map((row) => <article className="admin-content-row" key={row.id}><div><strong>{row.name}</strong><span>{isProject ? `${row.status || (row.isDefault ? "published" : "draft")} · ${row.releaseStatus || row.type || "No release status"} · ${row.isPersisted ? `Saved to Firestore · Updated ${displayDate(row.updatedAt)}` : "Built-in default · Not yet saved to Firestore"}` : `${row.status || "draft"} · ${row.isPersisted ? `Saved · Updated ${displayDate(row.updatedAt)}` : `Updated ${displayDate(row.updatedAt)}`}`}</span></div><button type="button" onClick={() => edit(row, kind)}>Edit</button><button type="button" className="delete" disabled={busy} onClick={() => remove(row, kind)}><FiTrash2 aria-hidden="true" /> {isProject && row.isDefault ? "Archive" : "Delete"}</button></article>)}{!isProject && items.testimonials.length === 0 && <p>No testimonials yet. Add only approved, genuine customer feedback.</p>}{isProject && filteredProjects.length === 0 && <p>No projects match these filters.</p>}</div>
        <button type="button" className="button button-quiet admin-add-content" onClick={() => startNew(kind)}>Add {isProject ? "project" : "testimonial"}</button>
      </section>
      <form className="admin-content-panel admin-content-form" onSubmit={save}>
        <h2>{id ? "Edit" : "New"} {isProject ? "project" : "testimonial"}</h2>
        {isProject ? <>
          <div className="admin-form-section"><h3>Project identity</h3>{input("Project name", "name", { required: true, maxLength: 120 })}{input("URL slug", "slug", { required: true, maxLength: 70, pattern: "[a-z0-9]+(?:-[a-z0-9]+)*", onChange: (e) => change("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/--+/g, "-").replace(/^-|-$/g, "")) })}<div className="admin-content-fields">{input("Tagline", "type", { maxLength: 80 })}{input("Category", "category", { maxLength: 100 })}</div>{textarea("Short description", "description", { maxLength: 700, rows: 3 })}{textarea("Full description", "fullDescription", { maxLength: 8000, rows: 5 })}{textarea("Project status note", "statusNote", { maxLength: 4000, rows: 2 })}<label>Release status<select value={form.releaseStatus || "In development"} onChange={(e) => change("releaseStatus", e.target.value)}>{["In development", "Testing", "Published product", "Active internal product", "Client engagement", "Archived"].map((option) => <option key={option}>{option}</option>)}</select></label><label>Publication<select value={form.status} onChange={(e) => change("status", e.target.value)}><option value="draft">Draft — hidden</option><option value="published">Published — visible</option><option value="archived">Archived — hidden</option></select></label><div className="admin-content-fields"><label className="admin-checkbox"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => change("featured", e.target.checked)} /> Featured project</label>{input("Display order (lower comes first)", "displayOrder", { type: "number", min: 0, max: 10000, onChange: (e) => change("displayOrder", Number(e.target.value)) })}</div></div>
          <div className="admin-form-section"><h3>Case study</h3>{textarea("Business problem", "businessProblem", { rows: 4, maxLength: 4000 })}{textarea("Solution developed", "solution", { rows: 4, maxLength: 4000 })}{textarea("Key features (one per line)", "keyFeatures", { rows: 5, maxLength: 6000 })}{textarea("Technical capabilities (one per line)", "technicalCapabilities", { rows: 5, maxLength: 6000 })}{textarea("Technologies (one per line)", "technologies", { rows: 3, maxLength: 3000 })}{textarea("Industries served (one per line)", "industries", { rows: 2, maxLength: 3000 })}{textarea("Development challenges (one per line)", "developmentChallenges", { rows: 3, maxLength: 3000 })}{textarea("Outcomes and accomplishments (one per line)", "outcomes", { rows: 3, maxLength: 3000 })}</div>
          <div className="admin-form-section"><h3>Public links</h3>{input("Website (HTTPS)", "websiteUrl", { type: "url", maxLength: 1000, placeholder: "https://" })}{input("iOS App Store (HTTPS)", "appStoreUrl", { type: "url", maxLength: 1000, placeholder: "https://apps.apple.com/…" })}{input("Google Play (HTTPS)", "googlePlayUrl", { type: "url", maxLength: 1000, placeholder: "https://play.google.com/…" })}{input("Demo (HTTPS)", "demoUrl", { type: "url", maxLength: 1000, placeholder: "https://" })}{input("Primary link label", "linkLabel", { maxLength: 120 })}</div>
          <div className="admin-form-section"><h3>Project images</h3><p>Choose PNG, JPEG or WebP images. Files are resized in your browser to preserve aspect ratio and uploaded as WebP (maximum 4 MB each). Your URL/path fields remain available as an alternative.</p><input ref={fileInput} className="admin-file-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => uploadImageFiles(e.target.files, e.currentTarget.dataset.target || "coverImageUrl")} />{["logoUrl", "coverImageUrl"].map((field) => <div className="admin-media-field" key={field}><label>{field === "logoUrl" ? "Logo image URL/path (optional)" : "Cover image URL/path (optional)"}<input type="text" maxLength="1000" value={form[field] || ""} onChange={(e) => change(field, e.target.value)} placeholder="HTTPS or /projects/image.webp" /></label><button type="button" className="button button-quiet admin-upload-button" onClick={() => { if (fileInput.current) { fileInput.current.dataset.target = field; fileInput.current.multiple = false; fileInput.current.click(); } }} disabled={busy || uploading}><FiUpload aria-hidden="true" /> {field === "logoUrl" ? "Upload Logo" : "Upload Cover Image"}</button>{form[field] && <img src={form[field]} alt="" className="admin-image-preview" />}{form[field] && <button type="button" className="admin-remove-media" onClick={() => change(field, "")}>Remove image</button>}</div>)}<label>Logo alt text<input maxLength="300" value={form.logoAlt || ""} onChange={(e) => change("logoAlt", e.target.value)} /></label><label>Cover image alt text<input maxLength="300" value={form.imageAlt || ""} onChange={(e) => change("imageAlt", e.target.value)} /></label><label>Cover image caption<input maxLength="300" value={form.imageCaption || ""} onChange={(e) => change("imageCaption", e.target.value)} /></label><label>Image presentation<select value={form.imagePresentation || "cover"} onChange={(e) => change("imagePresentation", e.target.value)}><option value="cover">Landscape cover</option><option value="portrait">Portrait screenshot</option><option value="logo">Logo</option></select></label><div className="admin-gallery-heading"><strong>Screenshot gallery</strong><button type="button" className="button button-dark admin-upload-button" disabled={busy || uploading || (form.gallery || []).length >= 12} onClick={() => { if (fileInput.current) { fileInput.current.dataset.target = "gallery"; fileInput.current.multiple = true; fileInput.current.click(); } }}><FiImage aria-hidden="true" /> Add Screenshots</button></div>{(form.gallery || []).map((image, index) => <div className="admin-gallery-item" key={`${image.url}-${index}`}><img src={image.url} alt="" className="admin-image-preview" /><label>Caption<input maxLength="180" value={image.caption || ""} onChange={(e) => updateGallery(index, "caption", e.target.value)} /></label><label>Alt text<input required maxLength="180" value={image.altText || ""} onChange={(e) => updateGallery(index, "altText", e.target.value)} /></label><div><button type="button" aria-label="Move screenshot up" disabled={index === 0} onClick={() => moveGallery(index, -1)}><FiArrowUp /></button><button type="button" aria-label="Move screenshot down" disabled={index === form.gallery.length - 1} onClick={() => moveGallery(index, 1)}><FiArrowDown /></button><button type="button" aria-label="Remove screenshot" onClick={() => removeGallery(index)}><FiTrash2 /></button></div></div>)}</div>
          <div className="admin-form-section"><h3>Search metadata</h3>{input("SEO title", "seoTitle", { maxLength: 160 })}{textarea("Meta description", "metaDescription", { rows: 3, maxLength: 320 })}{input("Canonical URL", "canonicalUrl", { type: "url", maxLength: 1000 })}{input("Open Graph image URL", "openGraphImageUrl", { type: "url", maxLength: 1000, placeholder: "https://" })}<label className="admin-checkbox"><input type="checkbox" checked={form.indexable !== false} onChange={(e) => change("indexable", e.target.checked)} /> Allow search indexing and include in sitemap</label></div>
        </> : <>
          <label>Customer quote<textarea required maxLength="1600" rows="5" value={form.quote} onChange={(e) => change("quote", e.target.value)} /></label>
          <label>Customer name<input required maxLength="120" value={form.name} onChange={(e) => change("name", e.target.value)} /></label>
          <label>Attribution (optional)<input maxLength="160" value={form.attribution} onChange={(e) => change("attribution", e.target.value)} /></label>
          <label>Image URL (optional, HTTPS)<input type="url" maxLength="1000" value={form.imageUrl || ""} onChange={(e) => change("imageUrl", e.target.value)} /></label>
          <label>Visibility<select value={form.status} onChange={(e) => change("status", e.target.value)}><option value="draft">Draft — hidden from the public site</option><option value="published">Published — visible on the public site</option><option value="archived">Archived — hidden</option></select></label>
        </>}
        <div className="admin-content-actions"><button className="button button-dark" disabled={busy || uploading}>{busy ? "Saving…" : uploading ? "Uploading…" : form.status === "published" ? "Save and publish" : "Save draft"}</button><button type="button" className="button button-quiet" disabled={busy} onClick={() => startNew(kind)}>Clear</button></div>
      </form>
    </div>}{message && <p className="admin-content-status" role="status">{message}</p>}</div></main>;
}
