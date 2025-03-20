import module from "node:module";
import path from "node:path";

const require = module.createRequire(import.meta.url);

export const input = {
    index: "src/eslint/index.ts",
    prettier: "src/prettier/index.ts",
    "prettier-plugin-ignored": "src/prettier-plugin-ignored/index.ts",
    modules: "src/modules/index.cts",
    wasm: path.resolve(
        path.dirname(require.resolve("@oxc-resolver/binding-wasm32-wasi")),
        "resolver.wasm32-wasi.wasm",
    ),
};

export const output = {
    dist: "dist",
    types: "dist/types",
    chunks: "dist/chunks",
    wasm: "dist/chunks/resolver.wasm32-wasi.wasm",
};

export const external = [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/];
