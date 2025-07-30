#!/usr/bin/env -S node --disable-warning=ExperimentalWarning

import fs from "node:fs/promises";
import path from "node:path";

import { $ } from "@goodbyenjn/utils";

interface Patch {
    filepath: string;
    handler: (content: string) => string;
}

const main = async (pkg: string, patches: Patch[]) => {
    const temp = path.resolve(import.meta.dirname, "../node_modules/.temp", pkg);

    await $(`rm -rf ${temp}`);
    await $(`pnpm patch ${pkg} --edit-dir ${temp}`);

    try {
        for (const patch of patches) {
            const filepath = path.resolve(temp, patch.filepath);
            const content = await fs.readFile(filepath, "utf-8");
            if (!content) {
                throw new Error(`File not exits or empty: ${filepath}`);
            }

            const patched = patch.handler(content);
            await fs.writeFile(filepath, patched);
        }
    } catch (error) {
        console.log("❌ Failed to patch files");
        console.log((error as Error)?.message || error);
        await $(`rm -rf ${temp}`);

        process.exit(1);
    }

    await $(`pnpm patch-commit --patches-dir ./scripts/patches ${temp}`);
    await $(`rm -rf ${temp}`);

    console.log("✅ Patched files successfully");
    process.exit(0);
};

const patches = [
    {
        filepath: "lib/index.cjs",
        handler: (content: string) =>
            content.replace(
                /const \{ name, version \} = .*\(\s*["']\.\.\/package\.json["']\s*\);/,
                `
const name = "eslint-plugin-import-x";
const version = "4.11.0";
`.trim(),
            ),
    },
    {
        filepath: "lib/meta.js",
        handler: (content: string) =>
            content.replace(
                /export const \{ name, version \} = .*\(\s*["']\.\.\/package\.json["']\s*\);/,
                `
const name = "eslint-plugin-import-x";
const version = "4.11.0";
`.trim(),
            ),
    },
];

main("eslint-plugin-import-x", patches);
