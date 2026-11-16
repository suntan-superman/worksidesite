const test = require("node:test");
const assert = require("node:assert/strict");
const { __test } = require("../../netlify/functions/project-page");

test("public project gallery renders the saved caption and alt text", () => {
  const caption = "Route Logistics Management Dashboard";
  const altText = "Route Logistics dispatch dashboard with scheduled field jobs";
  const template = '<!doctype html><html><head><title>Workside</title><meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content=""><meta property="og:url" content=""><meta name="twitter:title" content=""><meta name="twitter:description" content=""><link rel="canonical" href=""></head><body><div id="root"></div></body></html>';
  const html = __test.pageMarkup({
    slug: "route-logistics",
    name: "Route Logistics",
    type: "Product",
    category: "Field service",
    description: "Dispatch software",
    status: "published",
    gallery: [{ url: "https://storage.example.test/route.webp", caption, altText, order: 0 }],
  }, template);

  assert.ok(html.includes(`<img src="https://storage.example.test/route.webp" alt="${altText}" loading="lazy">`));
  assert.ok(html.includes(`<figcaption>${caption}</figcaption>`));
  assert.ok(!html.includes("RL Web Dashboard"));
});
