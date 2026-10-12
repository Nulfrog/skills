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

const packageLine = /^(["']?)(.+?)\1\s*:/;
const isFence = (line) => line.replace(/\r$/, "") === "---";

const foreign = [];

for (const file of readdirSync(changesetDir)) {
  if (!file.endsWith(".md") || file === "README.md") continue;

  const path = join(changesetDir, file);
  const lines = readFileSync(path, "utf8").split("\n");
  if (!isFence(lines[0])) continue;
  const close = lines.findIndex((line, i) => i > 0 && isFence(line));
  if (close === -1) continue;

  // Only the front matter between the two fences names packages; the body is
  // left alone even when it quotes one.
  const frontMatter = lines.slice(1, close);
  const packageOf = (line) => line.match(packageLine)?.[2].trim();
  const names = frontMatter.map(packageOf).filter(Boolean);
  const others = names.filter((pkg) => pkg !== name);
  if (others.length === 0) continue;

  foreign.push(`${file}: ${others.join(", ")}`);
  if (check) continue;

  // Rename the first foreign key, unless the changeset already names this
  // package, and drop the rest: a key may appear only once.
  let named = names.includes(name);
  const renamed = frontMatter.flatMap((line) => {
    const pkg = packageOf(line);
    if (!pkg || pkg === name) return [line];
    if (named) return [];
    named = true;
    return [line.replace(packageLine, `"${name}":`)];
  });

  lines.splice(1, frontMatter.length, ...renamed);
  writeFileSync(path, lines.join("\n"));
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

console.log(`renamed the package in ${foreign.length} changeset(s) to ${name}`);
