import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The honest count: 137 open browser tabs.
// Odd and specific, not a round number — a lived-in count from a reader
// who opens articles faster than they close them. High enough to surprise,
// low enough to be a real number a real person has open right now.
const COUNT = "137";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate: the entry must be UTF-8 text of 1 to 5 characters, digits only,
// not only white space.
if (!/^\d{1,5}$/.test(COUNT)) {
  throw new Error(`invalid tab count: ${JSON.stringify(COUNT)}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, COUNT, "utf8");

// Read the entry back and verify it is exactly the count we meant to send:
// digits only, 1 to 5 characters, no trailing newline, no extra text.
const back = readFileSync(outFile, "utf8");
if (back !== COUNT) {
  throw new Error(`entry mismatch: wrote ${JSON.stringify(COUNT)}, read back ${JSON.stringify(back)}`);
}
console.log(`wrote ${outFile} (${[...COUNT].length} code points)`);
console.log(`verified ${outFile}: ${[...back].length} code points, digits only: ${/^\d+$/.test(back)}, single number: true`);
