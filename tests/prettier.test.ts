import fsp from "node:fs/promises";
import path from "node:path";

import { format } from "prettier";

import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config/prettier";

const cases = [
    {
        name: "should format js",
        input: "js/no-unused-vars.js",
        snapshot: "formatted.js",
    },
    {
        name: "should format ts",
        input: "ts/no-unused-vars.ts",
        snapshot: "formatted.ts",
    },
    {
        name: "should format react",
        input: "react/no-string-refs.jsx",
        snapshot: "formatted.jsx",
    },
    {
        name: "should format vue",
        input: "vue/no-useless-v-bind.vue",
        snapshot: "formatted.vue",
    },
    {
        name: "should format yaml",
        input: "yaml/indent-4-space.yaml",
        snapshot: "formatted.yaml",
        overrides: true,
    },
    {
        name: "should ignore by default",
        input: "json/package-lock.json",
        snapshot: "ignored-by-default.json",
        overrides: true,
    },
    {
        name: "should ignore by user config",
        input: "json/should.ignored.json",
        snapshot: "ignored-by-config.json",
        overrides: true,
    },
];

const options = withGoodbyeNJNConfig();

describe.concurrent("Prettier", () => {
    test.for(cases)("$name", async ({ input, snapshot, overrides }, { expect }) => {
        let output;
        if (overrides) {
            const { spawn } = await import("node:child_process");
            const filepath = path.join(import.meta.dirname, input);
            const prettierProcess = spawn("pnpm", ["prettier", filepath]);

            let stdout = "";
            for await (const chunk of prettierProcess.stdout) {
                stdout += chunk;
            }

            output = stdout;
        } else {
            const filepath = path.join("tests", input);
            const text = await fsp.readFile(filepath, "utf-8");
            output = await format(text, { ...options, filepath });
        }

        await expect(output).toMatchFileSnapshot(path.join("snapshots/prettier", snapshot));
    });
});
