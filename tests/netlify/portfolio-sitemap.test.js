const test = require("node:test");
const assert = require("node:assert/strict");
const { __test } = require("../../netlify/functions/portfolio-sitemap");

test("sitemap keeps public defaults, excludes unpublished and non-indexable overrides, and adds published projects", () => {
  const docs = [
    { data: () => ({ slug: "sageset", status: "draft" }) },
    { data: () => ({ slug: "route-logistics", status: "published", indexable: false }) },
    { data: () => ({ slug: "new-published-project", status: "published" }) },
    { data: () => ({ slug: "new-draft-project", status: "draft" }) },
  ];
  const slugs = __test.indexableSlugs(docs);
  assert.ok(slugs.has("anyryde"));
  assert.ok(slugs.has("merxus-ai"));
  assert.ok(!slugs.has("sageset"));
  assert.ok(!slugs.has("route-logistics"));
  assert.ok(slugs.has("new-published-project"));
  assert.ok(!slugs.has("new-draft-project"));
});
