import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataSource = fs.readFileSync(path.join(root, "src/components/portfolioData.js"), "utf8");
const projects = new Function(dataSource.replace("export const projects =", "return"))();

test("each project has a crawlable case study, canonical URL, image alt text, and contact path", () => {
  for (const project of projects) {
    const html = fs.readFileSync(path.join(root, "build", "work", project.slug, "index.html"), "utf8");
    assert.match(html, new RegExp(`<title>${project.caseStudy.seoTitle.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}</title>`));
    assert.ok(html.includes(`https://worksidesoftware.com/work/${project.slug}`), `${project.slug}: canonical`);
    for (const heading of ["The business problem", "The solution", "Key features", "Technical capabilities demonstrated", "Project status"]) {
      assert.ok(html.includes(heading), `${project.slug}: ${heading}`);
    }
    assert.ok(html.includes('href="/contact"'), `${project.slug}: contact CTA`);
    assert.ok(!html.toLowerCase().includes("mi factotum"), `${project.slug}: retired brand reference`);
    assert.ok(!html.includes("worksidehost.com") && !html.includes("worksidelogistics.netlify.app"), `${project.slug}: private dashboard host`);
    if (project.imageUrl) assert.ok(html.includes(`alt="${project.imageAlt}"`), `${project.slug}: image alt text`);
    if (project.link) assert.ok(html.includes(`href="${project.link}"`), `${project.slug}: public product link`);
  }
});
