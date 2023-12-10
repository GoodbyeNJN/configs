#!/usr/bin/env -S npx tsx

import packageJson from "../package.json";
import "zx/globals";

await $`cp README.md dist/README.md`;

const resolveToRelative = (filepath: string) => `./${path.relative("dist", filepath)}`;

packageJson.exports = Object.fromEntries(
    Object.entries(packageJson.exports).map(([k, v]) => [
        k,
        Object.fromEntries(Object.entries(v).map(([k, v]) => [k, resolveToRelative(v)])),
    ]),
) as typeof packageJson.exports;

packageJson.main = resolveToRelative(packageJson.main);
packageJson.module = resolveToRelative(packageJson.module);
packageJson.types = resolveToRelative(packageJson.types);

packageJson.files = packageJson.files.map(resolveToRelative);

await fs.writeFile("dist/package.json", JSON.stringify(packageJson, null, 2));
