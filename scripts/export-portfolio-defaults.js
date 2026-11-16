const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "src/components/portfolioData.js"), "utf8");
const projects = new Function(source.replace("export const projects =", "return"))();
fs.mkdirSync(path.join(root, "netlify/shared"), { recursive: true });
fs.writeFileSync(path.join(root, "netlify/shared/portfolio-defaults.json"), `${JSON.stringify(projects, null, 2)}\n`);
console.log(`Exported ${projects.length} built-in portfolio projects for dynamic page rendering.`);
