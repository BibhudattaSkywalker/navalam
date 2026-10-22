import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith(".jsx")) acc.push(full);
  }
  return acc;
}

const root = path.resolve("src");
let changed = 0;

for (const file of walk(root)) {
  if (file.endsWith(`${path.sep}Footer.jsx`)) continue;
  let source = fs.readFileSync(file, "utf8");
  const original = source;
  source = source.replace(
    /import \{ SiteNavbar \} from "@\/components\/layout\/SiteNavbar";\r?\n/g,
    "",
  );
  source = source.replace(
    /import \{ Footer \} from "@\/components\/sections\/Footer";\r?\n/g,
    "",
  );
  source = source.replace(/\n[ \t]*<SiteNavbar[^>]*\/>/g, "");
  source = source.replace(/\n[ \t]*<Footer \/>/g, "");
  if (source !== original) {
    fs.writeFileSync(file, source);
    changed += 1;
    console.log(path.relative(root, file));
  }
}

console.log(`updated ${changed}`);
