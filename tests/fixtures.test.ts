import path from "node:path";

import { ESLint } from "eslint";
import fg from "fast-glob";
import { format } from "prettier";
import { isNonNullish } from "remeda";

import { withGoodbyeNJNConfig as withEslintConfig } from "@goodbyenjn/eslint-config";
import { withGoodbyeNJNConfig as withPrettierConfig } from "@goodbyenjn/eslint-config/prettier";

import { safeReadFile } from "./fs";

import type { ESLintConfig, Options } from "../src/types";

const INPUT_PATH = "tests/fixtures/input";
const OUTPUT_PATH = "tests/fixtures/output";

const prettierConfig = withPrettierConfig();

interface Case {
    name: string;
    options: Options;
    configs?: ESLintConfig[];
    output: string;
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
        name: "override",
        options: {
            typescript: true,
            react: false,
            vue: false,
        },
        configs: [
            { rules: { "@typescript-eslint/consistent-type-definitions": ["error", "type"] } },
        ],
    },
].map(item => ({ ...item, output: path.resolve(OUTPUT_PATH, item.name) }));

const inputs = await Promise.all(
    (await fg.async("**/*", { cwd: INPUT_PATH })).map(async filename => ({
        filename,
        filepath: path.resolve(INPUT_PATH, filename),
        content: await safeReadFile(path.resolve(INPUT_PATH, filename)),
    })),
);

describe.concurrent.each(cases)("Name: $name", async ({ options, configs = [], output }) => {
    const eslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: [...withEslintConfig(options), ...configs],
        fix: true,
    });

    const outputs = (
        await Promise.all(
            inputs.map(async ({ filename, filepath, content }) => {
                const [result] = await eslint.lintText(content, {
                    filePath: filepath,
                    warnIgnored: false,
                });
                if (!result) return null;

                const { output: linted = content } = result;
                const formatted = await format(linted, {
                    ...prettierConfig,
                    filepath,
                });

                return {
                    filename,
                    filepath: path.resolve(output, filename),
                    content: formatted,
                };
            }),
        )
    ).filter(isNonNullish);

    test.concurrent.for(outputs)("File: $filename", async ({ filepath, content }, { expect }) => {
        await expect.soft(content).toMatchFileSnapshot(filepath);
    });
});
