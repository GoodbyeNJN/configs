import fs from "node:fs";
import module from "node:module";
import path from "node:path";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import node from "@rollup/plugin-node-resolve";
import { pick } from "remeda";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import tsconfig from "rollup-plugin-tsconfig-paths";

import type { LogHandlerWithDefault, Plugin } from "rollup";

const require = module.createRequire(import.meta.url);

const input = {
    index: "src/eslint/index.ts",
    prettier: "src/prettier/index.ts",
    "prettier-plugin-ignored": "src/prettier-plugin-ignored/index.ts",
    modules: "src/modules/index.ts",
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

const external = [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/];

const IGNORED_WARNING_CODES = ["UNRESOLVED_IMPORT", "CIRCULAR_DEPENDENCY"];

const onLog: LogHandlerWithDefault = (level, log, handler) => {
    if (level === "warn" && IGNORED_WARNING_CODES.includes(log.code || "")) return;

    handler(level, log);
};

const pluginClean = (): Plugin => ({
    name: "plugin:clean",
    async renderStart(options) {
        const { dir } = options;
        if (!dir || !fs.existsSync(dir)) return;

        await fs.promises.rm(dir, {
            force: true,
            recursive: true,
        });
    },
});

export default defineConfig([
    {
        input: pick(input, ["index", "prettier"]),

        output: {
            dir: output.dist,
            format: "esm",
            chunkFileNames: "chunks/[name].js",
        },

        external: [...external, /node_modules/],

        plugins: [
            tsconfig(),
            commonjs(),
            json(),
            esbuild({ minify: false }),
            node(),
            pluginClean(),
            {
                name: "plugin:modules",
                resolveId: {
                    order: "pre",
                    handler(id) {
                        // expect: modules/eslint, modules/find-up, modules/prettier-plugin-ignored
                        if (!/^modules$/.test(id)) return null;

                        return { id: `./chunks/${id}.cjs`, external: true };
                    },
                },
            },
        ],
    },

    {
        input: pick(input, ["prettier-plugin-ignored"]),

        output: {
            dir: output.dist,
            format: "cjs",
            entryFileNames: "[name].cjs",
        },

        plugins: [esbuild({ minify: false })],
    },

    {
        input: input.modules,

        output: {
            dir: output.chunks,
            format: "cjs",
            entryFileNames: "modules.cjs",
        },

        external,

        plugins: [
            commonjs({
                // 相关错误：
                // Could not dynamically require "<project>/node_modules/react/index.js". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.
                ignoreDynamicRequires: true,
                // 相关错误：
                // 在 vue-eslint-parser 中
                // X.default.parse is not a function
                requireReturnsDefault: "namespace",
            }),
            json(),
            esbuild({ minify: true }),
            node(),
            {
                name: "plugin:copy-wasm",
                async writeBundle() {
                    await fs.promises.cp(input.wasm, output.wasm, { force: true });
                },
            },
        ],

        onLog,
    },

    {
        input: pick(input, ["index", "prettier"]),

        output: {
            dir: output.types,
        },

        external,

        plugins: [dts({ respectExternal: true })],

        onLog,
    },
]);
