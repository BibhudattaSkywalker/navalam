import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public/images");

function isSvg(content) {
  return content.trimStart().startsWith("<svg");
}

function resolveCssVars(svg) {
  return svg
    .replace(/var\(--fill-0,\s*([^)]+)\)/g, "$1")
    .replace(/var\(--stroke-0,\s*([^)]+)\)/g, "$1")
    .replace(/var\(--fill-0\)/g, "#f18405")
    .replace(/var\(--stroke-0\)/g, "#80b230");
}

function toOrange(svg) {
  return svg
    .replace(/fill="white"/gi, 'fill="#f18405"')
    .replace(/fill="#ffffff"/gi, 'fill="#f18405"')
    .replace(/fill="#FFFFFF"/gi, 'fill="#f18405"');
}

function toGreen(svg) {
  return svg
    .replace(/fill="white"/gi, 'fill="#80b230"')
    .replace(/fill="#ffffff"/gi, 'fill="#80b230"')
    .replace(/fill="#FFFFFF"/gi, 'fill="#80b230"');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(png|svg|jpg|jpeg)$/i.test(entry.name)) {
      const content = fs.readFileSync(full, "utf8");
      if (!isSvg(content)) continue;

      const resolved = resolveCssVars(content);
      const base = entry.name.replace(/\.(png|svg)$/i, "");
      const outDir = path.dirname(full);
      const svgPath = path.join(outDir, `${base}.svg`);

      fs.writeFileSync(svgPath, resolved);

      const iconBases = [
        "icon-education",
        "icon-health",
        "icon-donate",
        "icon-volunteer",
        "partner-icon-1",
        "partner-icon-2",
      ];
      if (iconBases.includes(base)) {
        fs.writeFileSync(
          path.join(outDir, `${base}-orange.svg`),
          toOrange(resolved)
        );
        fs.writeFileSync(
          path.join(outDir, `${base}-green.svg`),
          toGreen(resolved)
        );
      }
    }
  }
}

walk(imagesDir);
console.log("SVG assets normalized.");
