const test = require("node:test");
const assert = require("node:assert/strict");
const { __test } = require("../../netlify/functions/manage-content");
const { handler } = require("../../netlify/functions/manage-content");
const fs = require("node:fs");
const path = require("node:path");

function defaultProjects() { return JSON.parse(fs.readFileSync(path.join(__dirname, "../../netlify/shared/portfolio-defaults.json"), "utf8")); }

test("project content validation accepts bounded published records", () => {
  const result = __test.validateContent({ kind: "project", slug: "sample-project", name: "Sample", type: "Project", category: "Web", description: "A short description", detail: "Details", mark: "S", link: "https://example.com", linkLabel: "Visit", status: "published", imageUrl: "https://example.com/image.png" });
  assert.equal(result.data.status, "published");
  assert.equal(result.data.slug, "sample-project");
});

test("invalid or unsafe content links are rejected", () => {
  const result = __test.validateContent({ kind: "project", slug: "Bad Slug", name: "A", type: "B", category: "C", description: "D", link: "http://example.com", status: "published" });
  assert.match(result.error, /slug/);
  const imageResult = __test.validateContent({ kind: "testimonial", quote: "Quote", name: "Person", imageUrl: "javascript:alert(1)", status: "draft" });
  assert.match(imageResult.error, /HTTPS/);
});

test("testimonial validation requires a name and quote", () => {
  const result = __test.validateContent({ kind: "testimonial", quote: "", name: "", status: "draft" });
  assert.match(result.error, /missing/);
});

test("draft projects can be saved before optional case-study and SEO fields are complete", () => {
  const result = __test.validateContent({ kind: "project", slug: "future-project", name: "Future Project", status: "draft" });
  assert.equal(result.data.status, "draft");
  assert.equal(result.data.description, "");
  assert.equal(result.data.indexable, true);
});

test("published projects require a short public description", () => {
  const result = __test.validateContent({ kind: "project", slug: "future-project", name: "Future Project", status: "published" });
  assert.match(result.error, /short description/);
});

test("all migrated built-in project entries pass server-side validation without losing local image paths", () => {
  for (const source of defaultProjects()) {
    const result = __test.validateContent({ ...source, kind: "project", status: "published", coverImageUrl: source.imageUrl || "" });
    assert.ok(result.data, `${source.slug}: ${result.error}`);
    assert.equal(result.data.caseStudy.problem, source.caseStudy.problem);
    assert.deepEqual(result.data.caseStudy.features, source.caseStudy.features);
    assert.equal(result.data.imageUrl, source.imageUrl || "");
    assert.equal(result.data.coverImageUrl, source.imageUrl || "");
  }
});

test("built-in import creates only missing slugs and preserves edited Firestore records across reruns", async () => {
  const rows = new Map([["sageset", { id: "owner-sageset", slug: "sageset", name: "Owner edited SageSet", status: "draft", description: "Private owner copy" }]]);
  const collection = {
    where(field, operator, slug) { return { limit() { return { async get() { const row = rows.get(slug); return { empty: !row, docs: row ? [{ id: row.id, ref: { id: row.id }, data: () => row }] : [] }; } }; } }; },
    doc(slug) { return { id: slug, async create(data) { if (rows.has(slug)) throw Object.assign(new Error("exists"), { code: "already-exists" }); rows.set(slug, data); } }; },
  };
  const first = await __test.importMissingBuiltIns(collection, defaultProjects());
  assert.equal(first.created, 10);
  assert.deepEqual(first.skipped, ["sageset"]);
  assert.equal(rows.get("sageset").name, "Owner edited SageSet");
  assert.equal(rows.get("sageset").status, "draft");
  assert.equal(rows.get("route-logistics").status, "published");
  assert.equal(rows.size, 11);
  const rerun = await __test.importMissingBuiltIns(collection, defaultProjects());
  assert.equal(rerun.created, 0);
  assert.equal(rerun.skipped.length, 11);
  assert.equal(rows.get("sageset").description, "Private owner copy");
});

test("AnyRyde is listed as a shelved built-in project with only public product links", () => {
  const anyryde = defaultProjects().find((project) => project.slug === "anyryde");
  assert.ok(anyryde);
  assert.equal(anyryde.releaseStatus, "Archived");
  assert.equal(anyryde.statusNote.startsWith("Shelved."), true);
  assert.equal(anyryde.link, "https://anyryde.com/");
  assert.equal(anyryde.logoUrl, "/projects/anyryde-logo.png");
  assert.equal(anyryde.caseStudy.features.length > 0, true);
});

test("project links, visibility, and indexing fields are bounded and validated", () => {
  const valid = __test.validateContent({ kind: "project", slug: "managed-project", name: "Managed", type: "Product", category: "Web", description: "Managed project", link: "https://example.com", linkLabel: "Visit site", status: "published", featured: true, displayOrder: 3, indexable: false, canonicalUrl: "https://worksidesoftware.com/work/managed-project", keyFeatures: ["Fast"], gallery: [{ url: "https://example.com/shot.webp", caption: "Home", altText: "Home screen", order: 0 }] });
  assert.equal(valid.data.featured, true);
  assert.equal(valid.data.indexable, false);
  assert.equal(valid.data.gallery[0].altText, "Home screen");
  const invalidCanonical = __test.validateContent({ kind: "project", slug: "managed-project", name: "Managed", type: "Product", category: "Web", description: "Managed project", status: "draft", canonicalUrl: "https://example.com/elsewhere" });
  assert.match(invalidCanonical.error, /Canonical URL/);
});

test("published gallery caption and alt text are preserved exactly for Firestore writes", () => {
  const caption = "Route Logistics Management Dashboard";
  const altText = "Route Logistics dispatch dashboard with scheduled field jobs";
  const result = __test.validateContent({ kind: "project", slug: "route-logistics", name: "Route Logistics", type: "Product", category: "Field service", description: "Dispatch software", status: "published", gallery: [{ url: "https://storage.example.test/route.webp", caption, altText, order: 0 }] });
  assert.equal(result.data.gallery[0].caption, caption);
  assert.equal(result.data.gallery[0].altText, altText);
  assert.equal(result.data.gallery[0].order, 0);
});

test("admin session rejects missing, expired, and malformed cookies", () => {
  const previous = process.env.WORKSIDE_CONTENT_SESSION_SECRET;
  process.env.WORKSIDE_CONTENT_SESSION_SECRET = "x".repeat(48);
  assert.equal(__test.validSession(""), false);
  assert.equal(__test.validSession("workside_content_admin=bad.cookie"), false);
  assert.equal(__test.constantTimeEqual("secret", "secret"), true);
  assert.equal(__test.constantTimeEqual("secret", "other"), false);
  if (previous === undefined) delete process.env.WORKSIDE_CONTENT_SESSION_SECRET;
  else process.env.WORKSIDE_CONTENT_SESSION_SECRET = previous;
});

test("admin idle keepalive rotates the signed session cookie without changing its idle lifetime", async () => {
  const previous = process.env.WORKSIDE_CONTENT_SESSION_SECRET;
  process.env.WORKSIDE_CONTENT_SESSION_SECRET = "x".repeat(48);
  try {
    const now = Date.now();
    const cookie = __test.sessionCookie(now + __test.SESSION_MS).split(";")[0];
    assert.equal(__test.SESSION_MS, 60 * 60 * 1000 + 30 * 1000);
    assert.equal(__test.validSession(cookie, now), true);
    assert.equal(__test.validSession(cookie, now + __test.SESSION_MS), false);

    const response = await handler({
      httpMethod: "POST",
      queryStringParameters: { action: "keepalive" },
      headers: { origin: "https://worksidesoftware.com", cookie },
      body: "{}",
    });
    assert.equal(response.statusCode, 200);
    assert.match(response.headers["Set-Cookie"], /Max-Age=3630/);
    assert.notEqual(response.headers["Set-Cookie"].split(";")[0], cookie);
  } finally {
    if (previous === undefined) delete process.env.WORKSIDE_CONTENT_SESSION_SECRET;
    else process.env.WORKSIDE_CONTENT_SESSION_SECRET = previous;
  }
});

test("content listing rejects an unauthenticated request without opening Firestore", async () => {
  const response = await handler({ httpMethod: "GET", queryStringParameters: { action: "list" }, headers: { origin: "https://worksidesoftware.com" } });
  assert.equal(response.statusCode, 401);
  assert.equal(JSON.parse(response.body).error, "authentication_required");
});

test("storage upload diagnostics classify HTTP and Firebase Admin gRPC errors without returning error messages", () => {
  assert.equal(__test.storageErrorDiagnostic({ code: 403 }), "storage_permission_denied");
  assert.equal(__test.storageErrorDiagnostic({ code: 7, message: "sensitive provider response" }), "storage_permission_denied");
  assert.equal(__test.storageErrorDiagnostic({ response: { statusCode: 404 } }), "storage_bucket_or_object_not_found");
  assert.equal(__test.storageErrorDiagnostic({ code: 3 }), "storage_request_rejected");
  assert.equal(__test.storageErrorDiagnostic({ code: 14 }), "storage_service_unavailable");
  assert.equal(__test.storageErrorDiagnostic({ code: "ETIMEDOUT" }), "storage_network_error");
  assert.equal(__test.storageErrorDiagnostic({ message: "sensitive provider response" }), "storage_upload_failed");
});
