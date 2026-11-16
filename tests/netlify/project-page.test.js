const test = require("node:test");
const assert = require("node:assert/strict");
const { __test } = require("../../netlify/functions/project-page");

test("dynamic portfolio rendering replaces nested prerendered body while keeping the React app shell", () => {
  const template = '<html><head><title>Old</title><meta name="description" content="Old"><meta property="og:title" content="Old"><meta property="og:description" content="Old"><meta property="og:url" content="old"><meta name="twitter:title" content="Old"><meta name="twitter:description" content="Old"><link rel="canonical" href="old"><meta property="og:image" content="old"><meta name="robots" content="index, follow"></head><body><div id="root"><div data-static-seo><main><div>Old home project</div></main></div></div><script src="/static/js/main.js"></script></body></html>';
  const html = __test.pageMarkup({ slug: "dynamic-project", name: "Dynamic <Project>", type: "Web app", category: "Operations", description: "Public project description", status: "published", indexable: false, canonicalUrl: "https://worksidesoftware.com/work/dynamic-project", caseStudy: { problem: "A real problem", features: ["A feature"] } }, template);
  assert.match(html, /<title>Dynamic &lt;Project&gt; \| Workside Software<\/title>/);
  assert.match(html, /content="noindex, nofollow"/);
  assert.match(html, /<h1>Dynamic &lt;Project&gt;<\/h1>/);
  assert.match(html, /The business problem/);
  assert.doesNotMatch(html, /Old home project/);
  assert.match(html, /static\/js\/main\.js/);
  assert.match(html, /href="https:\/\/worksidesoftware\.com\/work\/dynamic-project"/);
});

test("an unpublished project response contains no stale content", () => {
  const page = __test.notFound();
  assert.match(page, /noindex,nofollow/);
  assert.doesNotMatch(page, /old project description/i);
});
