const AUTHOR = "Bibhudatta Satapathy";

/** Start-up banner for the standalone server. */
export function printBanner({ url, mode }) {
  const rows = [
    "Nalvalam Foundation  ·  API",
    `${url}   ·   ${mode}`,
    `Built by ${AUTHOR}`,
  ];
  const width = Math.max(...rows.map((row) => row.length)) + 4;
  const line = "─".repeat(width);
  console.log(`\n  ┌${line}┐`);
  rows.forEach((row) => console.log(`  │  ${row.padEnd(width - 2)}│`));
  console.log(`  └${line}┘\n`);
}
