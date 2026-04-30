#!/usr/bin/env -S tsx

import path from "node:path";

import pluginReact from "@eslint-react/eslint-plugin";
import { mkdir, rm, writeFile } from "@goodbyenjn/utils/fs";
import pluginTypescript from "@typescript-eslint/eslint-plugin";
import { builtinRules } from "eslint/use-at-your-own-risk";
import pluginImport from "eslint-plugin-import-x";
import { pluginsToRulesDTS } from "eslint-typegen/core";

import type { ESLint } from "eslint";

const list = [
    {
        filename: "eslint-rules",
        typeName: "EslintRules",
        plugins: {
            "": { rules: Object.fromEntries(builtinRules.entries()) },
        },
    },
    {
        filename: "typescript-rules",
        typeName: "TypeScriptRules",
        plugins: {
            typescript: pluginTypescript,
        },
    },
    {
        filename: "react-rules",
        typeName: "ReactRules",
        plugins: {
            react: pluginReact,
        },
    },
    {
        filename: "import-rules",
        typeName: "ImportRules",
        plugins: {
            import: pluginImport,
        },
    },
] as const;
const generated = path.resolve(import.meta.dirname, "../types/generated");

await rm(generated);
await mkdir(generated);

await Promise.all(
    list.map(async ({ filename, typeName, plugins }) => {
        const dts = await pluginsToRulesDTS(plugins as Record<string, ESLint.Plugin>, {
            includeAugmentation: false,
            exportTypeName: typeName,
        });
        await writeFile(path.join(generated, `${filename}.d.ts`), dts);
    }),
);
