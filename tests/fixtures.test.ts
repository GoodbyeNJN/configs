import path from "node:path";

import { ESLint } from "eslint";
import fg from "fast-glob";
import { format } from "prettier";
import { it } from "vitest";

import { safeReadFile } from "./fs";

import type { ESLintConfig, Options } from "../src/types";
import type { Config } from "prettier";

const INPUT_PATH = "tests/fixtures/input";
const OUTPUT_PATH = "tests/fixtures/output";
const TSCONFIG_PATH = "tests/tsconfig.test.json";

const { withGoodbyeNJNConfig: withEslintConfig } = await import("../dist/esm/index.js");
const prettierConfig = (await import("../dist/esm/prettier.js")).default as Config;

const run = (name: string, options: Options, ...configs: ESLintConfig[]) => {
    it(name, async ({ expect }) => {
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
    });
};

run("js", {
    typescript: false,
    react: false,
    vue: false,
});

run("ts", {
    typescript: { tsconfigPath: TSCONFIG_PATH },
    react: false,
    vue: false,
});

run("react", {
    typescript: { tsconfigPath: TSCONFIG_PATH },
    react: { version: "18" },
    vue: false,
});

run("vue", {
    typescript: { tsconfigPath: TSCONFIG_PATH },
    react: false,
    vue: true,
});

run(
    "ts-override",
    {
        typescript: { tsconfigPath: TSCONFIG_PATH },
        react: false,
        vue: false,
    },
    {
        rules: {
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        },
    },
);
