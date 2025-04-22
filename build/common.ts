export const input = {
    index: "src/eslint/index.ts",
    prettier: "src/prettier/index.ts",
    modules: "src/modules/index.cts",
};

export const output = {
    dist: "dist",
    types: "dist/types",
    chunks: "dist/chunks",
};

export const external = [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/];

export const plugins = [
    {
        input: "src/prettier/plugins/ignore.ts",
        output: "dist/plugins/prettier-plugin-ignore.js",
    },
];
