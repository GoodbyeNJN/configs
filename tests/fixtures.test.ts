import fg from "fast-glob";
import { afterAll, beforeAll, it } from "vitest";
import "zx/globals";

import { DIST_PATH } from "../scripts/constants";
import { cp, readFile, resolve, resolveToRoot, rm, writeFile } from "../scripts/utils";

import type { ESLintConfig, Options } from "../src/types";

const INPUT_PATH = resolveToRoot("tests/fixtures/input");
const OUTPUT_PATH = resolveToRoot("tests/fixtures/output");
const TEMP_PATH = resolveToRoot(".temp/fixtures");
const TSCONFIG_PATH = resolveToRoot("tsconfig.test.json");

beforeAll(async () => {
    await rm(TEMP_PATH);
});
afterAll(async () => {
    await rm(TEMP_PATH);
});

const run = (name: string, options: Options, ...configs: ESLintConfig[]) => {
    it(name, async ({ expect }) => {
        const output = resolve(OUTPUT_PATH, name);
        const temp = resolve(TEMP_PATH, name);

        await cp(INPUT_PATH, temp);
        await writeFile(
            resolve(temp, "eslint.config.js"),
            `// @eslint-disable
import { withGoodbyeNJNConfig } from "${DIST_PATH}/esm/index.js";

export default [
    ...withGoodbyeNJNConfig(${JSON.stringify(options)}),
    ...${JSON.stringify(configs) ?? []},
];`,
        );
        await writeFile(
            resolve(temp, "prettier.config.js"),
            `// @eslint-disable
import config from "${DIST_PATH}/esm/prettier.js";

export default config;`,
        );

        $.cwd = temp;
        await $`npx eslint --fix .`;
        await $`npx prettier --write --log-level silent .`;

        const files = await fg("**/*", {
            ignore: ["node_modules", "eslint.config.js", "prettier.config.js"],
            cwd: temp,
        });

        sleep(1000);

        await Promise.all(
            files.map(async file => {
                const tempFile = await readFile(resolve(temp, file));
                const inputFile = await readFile(resolve(INPUT_PATH, file));
                const outputFile = resolve(output, file);
                if (tempFile === inputFile) {
                    await rm(outputFile);
                    return;
                }

                await expect.soft(tempFile).toMatchFileSnapshot(outputFile);
            }),
        );
    });
};

run("js", {
    typescript: false,
    react: false,
    vue: false,
});

run("all", {
    typescript: { tsconfigPath: TSCONFIG_PATH },
    react: { version: "18" },
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
