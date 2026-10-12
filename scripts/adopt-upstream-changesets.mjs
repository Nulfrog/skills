#!/usr/bin/env node
// Renames the package in every pending changeset to package.json's name.
// Changesets merged in from upstream name `mattpocock-skills`, which is not in
// this fork's workspace, and `changeset version` refuses to run while any do.
// Runs as part of `npm run version`, immediately before `changeset version`.
// With --check it changes nothing and exits 1 if any changeset needs renaming.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const changesetDir = join(repo, ".changeset");

const { name } = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const check = process.argv.includes("--check");

const foreign = [];

for (const file of readdirSync(changesetDir)) {
  if (!file.endsWith(".md") || file === "README.md") continue;

  const path = join(changesetDir, file);
  const source = readFileSync(path, "utf8");
  const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontMatter) continue;

  // Rewrite only the package keys inside the front matter, never the body.
  const renamed = frontMatter[1].replace(
    /^(["']?)([^"':\r\n]+)\1(\s*:)/gm,
    (line, quote, pkg, colon) => {
      if (pkg === name) return line;
      foreign.push(`${file}: ${pkg}`);
      return `"${name}"${colon}`;
    },
  );

  if (!check && renamed !== frontMatter[1]) {
    writeFileSync(path, source.replace(frontMatter[1], renamed));
  }
}

if (foreign.length === 0) {
  console.log(`every changeset names ${name}`);
  process.exit(0);
}

if (check) {
  console.error(
    `${foreign.length} changeset(s) name another package. Run \`node scripts/adopt-upstream-changesets.mjs\`.\n  ${foreign.join("\n  ")}`,
  );
  process.exit(1);
}

console.log(`renamed ${foreign.length} changeset(s) to ${name}`);
