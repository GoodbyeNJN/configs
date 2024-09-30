import path from "node:path";

import { ESLint } from "eslint";
import fg from "fast-glob";
import { format } from "prettier";

import { withGoodbyeNJNConfig as withEslintConfig } from "eslint-config-goodbyenjn";
import { withGoodbyeNJNConfig as withPrettierConfig } from "eslint-config-goodbyenjn/prettier";

import { safeReadFile } from "./fs";

import type { ESLintConfig, Options } from "../src/types";

const INPUT_PATH = "tests/fixtures/input";
const OUTPUT_PATH = "tests/fixtures/output";

const prettierConfig = withPrettierConfig();

interface Case {
    name: string;
    options: Options;
    configs?: ESLintConfig[];
}

const cases: Case[] = [
    {
        name: "js",
        options: {
            typescript: false,
            react: false,
            vue: false,
        },
    },
    {
        name: "ts",
        options: {
            typescript: true,
            react: false,
            vue: false,
        },
    },
    {
        name: "react",
        options: {
            typescript: true,
            react: { version: "18" },
            vue: false,
        },
    },
    {
        name: "vue",
        options: {
            typescript: true,
            react: false,
            vue: true,
        },
    },
    {
        name: "ts-override",
        options: {
            typescript: true,
            react: false,
            vue: false,
        },
        configs: [
            { rules: { "@typescript-eslint/consistent-type-definitions": ["error", "type"] } },
        ],
    },
];

test.concurrent.for(cases)(
    "Test with: $name",
    async ({ name, options, configs = [] }, { expect }) => {
        const eslint = new ESLint({
            overrideConfigFile: true,
            overrideConfig: [...withEslintConfig(options), ...configs],
            fix: true,
        });

        const output = path.resolve(OUTPUT_PATH, name);
        const files = await Promise.all(
            (await fg.async("**/*", { cwd: INPUT_PATH })).map(async filepath => ({
                input: {
                    filepath: path.resolve(INPUT_PATH, filepath),
                    content: await safeReadFile(path.resolve(INPUT_PATH, filepath)),
                },
                output: {
                    filepath: path.resolve(output, filepath),
                    content: "",
                },
            })),
        );

        const results = (
            await Promise.all(
                files.map(async ({ input, output }) => {
                    const { filepath, content } = input;

                    const [result] = await eslint.lintText(content, {
                        filePath: filepath,
                        warnIgnored: false,
                    });
                    if (!result) return null;

                    const { output: linted = content } = result || {};
                    const formatted = await format(linted, {
                        ...prettierConfig,
                        filepath,
                    });

                    return { input, output: { ...output, content: formatted } };
                }),
            )
        ).filter(<T>(x: T): x is NonNullable<T> => Boolean(x));

        await Promise.all(
            results.map(({ output: { filepath, content } }) =>
                expect.soft(content).toMatchFileSnapshot(filepath),
            ),
        );
    },
);
