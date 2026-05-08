import path from "node:path";

import { exec } from "@goodbyenjn/utils/exec";
import { readFile } from "@goodbyenjn/utils/fs";
import { format } from "prettier";
import { test } from "vitest";

import { withConfig } from "@goodbyenjn/configs/prettier";

const cases = [
    {
        name: "format js",
        input: "js/no-unused-vars.js",
        snapshot: "formatted.js",
    },
    {
        name: "format ts",
        input: "ts/no-unused-vars.ts",
        snapshot: "formatted.ts",
    },
    {
        name: "format react",
        input: "react/no-string-refs.jsx",
        snapshot: "formatted.jsx",
    },
    {
        name: "format jsonc",
        input: "json/no-trailing-comma.jsonc",
        snapshot: "formatted.jsonc",
        overrides: true,
    },
    {
        name: "format yaml",
        input: "yaml/indent-4-space.yaml",
        snapshot: "formatted.yaml",
        overrides: true,
    },
    {
        name: "ignore by default",
        input: "json/package-lock.json",
        snapshot: "ignored-by-default.json",
        overrides: true,
    },
    {
        name: "ignore by user config",
        input: "json/should.ignored.json",
        snapshot: "ignored-by-config.json",
        overrides: true,
    },
    {
        name: "not ignore by user config",
        input: "json/should.not.ignored.json",
        snapshot: "not-ignored-by-config.json",
        overrides: true,
    },
];

const $ = exec({
    spawnOptions: { cwd: import.meta.dirname },
});
const configPath = "prettier.test.config.js";
const options = withConfig();

test.for(cases)("$name", async ({ input, snapshot, overrides }, { expect }) => {
    let output;
    if (overrides) {
        const filepath = path.join("__fixtures__", input);
        ({ stdout: output } = await $`prettier --config ${configPath} ${filepath}`);
    } else {
        const filepath = path.join("tests/__fixtures__", input);
        const text = await readFile(filepath);
        output = await format(text.unwrapOr(""), { ...options, filepath });
    }

    await expect(output).toMatchFileSnapshot(path.join("__snapshots__/prettier", snapshot));
});
