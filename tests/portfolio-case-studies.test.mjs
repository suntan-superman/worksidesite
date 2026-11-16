import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataSource = fs.readFileSync(path.join(root, "src/components/portfolioData.js"), "utf8");
const projects = new Function(dataSource.replace("export const projects =", "return"))();
const existingSlugs = ["sageset", "merxus-ai", "radiusiq", "property-intelligence", "galageaux-arcade", "workside-signals", "cutpro-tree-service", "sellmykernhome", "workside-logistics"];

test("keeps all nine existing portfolio projects and adds Route Logistics", () => {
  assert.equal(projects.length, 10);
  assert.deepEqual(existingSlugs.filter((slug) => !projects.some((project) => project.slug === slug)), []);
  assert.ok(projects.some((project) => project.slug === "route-logistics"));
});

test("default case studies contain a problem, solution, features, technical proof, and status", () => {
  for (const project of projects) {
    assert.ok(project.caseStudy?.problem, `${project.slug}: business problem`);
    assert.ok(project.caseStudy?.solution, `${project.slug}: solution`);
    assert.ok(project.caseStudy?.features?.length >= 2, `${project.slug}: features`);
    assert.ok(project.caseStudy?.technical?.length >= 2, `${project.slug}: technical capabilities`);
    assert.ok(project.statusNote || project.type, `${project.slug}: status`);
  }
});

test("external project links are HTTPS and private or unpublished work has no application URL", () => {
  for (const project of projects.filter((item) => item.link)) assert.equal(new URL(project.link).protocol, "https:");
  for (const slug of ["route-logistics", "property-intelligence", "workside-signals", "workside-logistics"]) {
    assert.equal(projects.find((project) => project.slug === slug).link, undefined, `${slug} must not expose a private app route`);
  }
  const galageaux = projects.find((project) => project.slug === "galageaux-arcade");
  assert.match(galageaux.type, /published/i);
  assert.equal(galageaux.link, "https://apps.apple.com/ca/app/galageaux-arcade/id6817621098");
});

test("only reviewed public product imagery is referenced and every image has alt text", () => {
  for (const project of projects.filter((item) => item.imageUrl)) {
    assert.ok(project.imageAlt, `${project.slug}: alt text`);
    assert.ok(fs.existsSync(path.join(root, "public", project.imageUrl.slice(1))), `${project.slug}: missing asset`);
  }
  assert.equal(projects.find((project) => project.slug === "workside-logistics").imageUrl, undefined);
});

test("all project URLs, including Route Logistics, are present in the sitemap", () => {
  const sitemap = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
  for (const project of projects) assert.ok(sitemap.includes(`/work/${project.slug}</loc>`), `${project.slug}: sitemap URL`);
});

test("public case studies do not name the retired brand or expose internal dashboard hosts", () => {
  const data = dataSource.toLowerCase();
  assert.equal(data.includes("mi factotum"), false);
  assert.equal(data.includes("worksidelogistics.netlify.app"), false);
  assert.equal(data.includes("worksidehost.com"), false);
});
