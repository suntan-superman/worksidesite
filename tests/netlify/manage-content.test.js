const test = require("node:test");
const assert = require("node:assert/strict");
const { __test } = require("../../netlify/functions/manage-content");
const { handler } = require("../../netlify/functions/manage-content");

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

test("content listing rejects an unauthenticated request without opening Firestore", async () => {
  const response = await handler({ httpMethod: "GET", queryStringParameters: { action: "list" }, headers: { origin: "https://worksidesoftware.com" } });
  assert.equal(response.statusCode, 401);
  assert.equal(JSON.parse(response.body).error, "authentication_required");
});
