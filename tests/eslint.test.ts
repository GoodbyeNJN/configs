import path from "node:path";

import { ESLint } from "eslint";

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
        name: "should lint js",
        input: ["js/"],
        snapshot: "js.json",
        options: {
            typescript: false,
        },
    },
    {
        name: "should lint ts",
        input: ["ts/*"],
        snapshot: "ts.json",
        options: {
            typescript: true,
        },
    },
    {
        name: "should lint react",
        input: ["react/*"],
        snapshot: "react.json",
        options: {
            typescript: false,
            react: { version: "18" },
        },
    },
    {
        name: "should lint vue",
        input: ["vue/*"],
        snapshot: "vue.json",
        options: {
            typescript: false,
            vue: true,
        },
    },
    {
        name: "should lint ts+js",
        input: ["ts/*", "js/*"],
        snapshot: "ts+js.json",
        options: {
            typescript: true,
        },
    },
    {
        name: "should lint override",
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

describe.concurrent("Eslint", () => {
    test.for(cases)("$name", async ({ input, snapshot, options }, { expect }) => {
        const eslint = new ESLint({
            cwd: import.meta.dirname,
            overrideConfigFile: true,
            overrideConfig: withConfig(options),
        });
        const results = await eslint.lintFiles(input);
        const output = results.map(({ filePath, messages }) => ({
            filename: path.relative(import.meta.dirname, filePath),
            // eslint-disable-next-line max-nested-callbacks
            messages: messages.map(({ nodeType: _, fix: __, suggestions: ___, ...rest }) => rest),
        }));

        await expect(JSON.stringify(output, null, 2)).toMatchFileSnapshot(
            path.join("snapshots/eslint", snapshot),
        );
    });
});
