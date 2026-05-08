import path from "node:path";

import * as R from "@goodbyenjn/utils/fp";
import { ESLint } from "eslint";
import { test } from "vitest";

import { withConfig } from "@goodbyenjn/configs/eslint";

import type { Options } from "@goodbyenjn/configs/eslint";

interface Case {
    name: string;
    input: string[];
    snapshot: string;
    options?: Options;
}

const cases: Case[] = [
    {
        name: "lint js",
        input: ["js/*"],
        snapshot: "js.json",
        options: {
            typescript: false,
        },
    },
    {
        name: "lint ts",
        input: ["ts/*"],
        snapshot: "ts.json",
        options: {
            typescript: true,
        },
    },
    {
        name: "lint react",
        input: ["react/*"],
        snapshot: "react.json",
        options: {
            typescript: false,
            react: { version: "18" },
        },
    },
    {
        name: "lint ts+js",
        input: ["ts/*", "js/*"],
        snapshot: "ts+js.json",
        options: {
            typescript: true,
        },
    },
    {
        name: "lint override",
        input: ["js/*"],
        snapshot: "override.json",
        options: {
            javascript: {
                overrides: {
                    "no-unused-vars": "off",
                },
            },
            typescript: false,
        },
    },
];

test.for(cases)("$name", async ({ input, snapshot, options }, { expect }) => {
    const eslint = new ESLint({
        cwd: import.meta.dirname,
        overrideConfigFile: true,
        overrideConfig: await withConfig({
            ignores: [
                "__fixtures__/**/*.ignored.*",
                "!__fixtures__/**/*.not.ignored.*",
                "__snapshots__/",
            ],
            ...options,
        }),
    });
    const results = await eslint.lintFiles(
        input.map(pattern => path.join("__fixtures__", pattern)),
    );
    const output = results.map(({ filePath, messages }) => ({
        filename: path.relative(import.meta.dirname, filePath),
        messages: R.pipe(
            messages,
            R.map(R.pick(["ruleId", "message"])),
            R.sortBy(R.prop("message")),
        ),
    }));

    await expect(JSON.stringify(output, null, 2)).toMatchFileSnapshot(
        path.join("__snapshots__/eslint", snapshot),
    );
});
