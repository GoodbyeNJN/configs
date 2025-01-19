import path from "node:path";

import { $, cd } from "zx";

cd(import.meta.dirname);

const cases = [
    {
        name: "should format js",
        input: "js/no-unused-vars.js",
        snapshot: "snapshot.js",
    },
    {
        name: "should format ts",
        input: "ts/no-unused-vars.ts",
        snapshot: "snapshot.ts",
    },
    {
        name: "should format jsx",
        input: "jsx/no-string-refs.jsx",
        snapshot: "snapshot.jsx",
    },
    {
        name: "should format vue",
        input: "vue/no-useless-v-bind.vue",
        snapshot: "snapshot.vue",
    },
    {
        name: "should format yaml",
        input: "yaml/indent-4-space.yaml",
        snapshot: "snapshot.yaml",
    },
];

describe.concurrent("Prettier", () => {
    test.for(cases)("$name", async ({ input, snapshot }, { expect }) => {
        const stdout = await $`npx prettier ${input}`;
        const output = stdout.text();

        await expect(output).toMatchFileSnapshot(path.join("snapshots/prettier", snapshot));
    });
});
