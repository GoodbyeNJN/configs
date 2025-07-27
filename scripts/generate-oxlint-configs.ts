#!/usr/bin/env -S node --disable-warning=ExperimentalWarning

import fs from "node:fs/promises";
import path from "node:path";

import migrate from "@oxlint/migrate";

import { withConfig } from "@goodbyenjn/configs/eslint";

const configs = {
    js: withConfig({
        javascript: true,
        typescript: false,
        react: false,
        vue: false,
        imports: false,
    }),
    ts: withConfig({
        javascript: true,
        typescript: true,
        react: false,
        vue: false,
        imports: false,
    }),
    jsx: withConfig({
        javascript: true,
        typescript: false,
        react: true,
        vue: false,
        imports: false,
    }),
    tsx: withConfig({
        javascript: true,
        typescript: true,
        react: true,
        vue: false,
        imports: false,
    }),
};

for (const [key, config] of Object.entries(configs)) {
    const res = await migrate(config, undefined, {
        withNursery: true,
    });

    const output = path.resolve(import.meta.dirname, "../oxlint", `${key}.json`);
    fs.writeFile(output, JSON.stringify(res, null, 2));
}
