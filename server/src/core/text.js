/** URL-safe slug, capped at 80 characters. */
export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/** Trims and caps a value; null and undefined become an empty string. */
export function clean(value, max = 255) {
  return String(value ?? "").trim().slice(0, max);
}

/** Case-insensitive "contains" matcher for user typed search text. */
export function searchPattern(text) {
  return new RegExp(String(text).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

/** $or clause matching the pattern against any of the given fields. */
export function anyFieldMatches(fields, text) {
  const pattern = searchPattern(text);
  return fields.map((field) => ({ [field]: pattern }));
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? ""));
}

/** Returns the value when it is one of the allowed options, otherwise the fallback. */
export function oneOf(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

/** Spreadsheet apps run cells starting with these characters as formulas. */
export function csvCell(value) {
  let text = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
