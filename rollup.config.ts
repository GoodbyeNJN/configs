import fs from "node:fs";
import path from "node:path";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import node from "@rollup/plugin-node-resolve";
import { pick } from "remeda";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

import type { LogHandlerWithDefault, Plugin } from "rollup";

const input = {
    index: "src/index.ts",
    prettier: "src/prettier.ts",
    modules: "src/modules.ts",
};

const dist = path.resolve(import.meta.dirname, "dist");
const modules = path.resolve(dist, "modules.cjs");
const cjs = path.resolve(dist, "cjs");
const esm = path.resolve(dist, "esm");

const external = [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/];

const IGNORED_WARNING_CODES = ["UNRESOLVED_IMPORT", "CIRCULAR_DEPENDENCY"];

const onLog: LogHandlerWithDefault = (level, log, handler) => {
    if (level === "warn" && IGNORED_WARNING_CODES.includes(log.code || "")) return;

    handler(level, log);
};

const pluginClean = (...paths: string[]): Plugin => ({
    name: "plugin:clean",
    async buildStart() {
        await Promise.all(
            paths.map(path =>
                fs.promises.rm(path, {
                    force: true,
                    recursive: true,
                }),
            ),
        );
    },
});

export default defineConfig([
    {
        input: pick(input, ["index", "prettier"]),

        output: {
            dir: dist,
            format: "esm",
        },

        external,

        plugins: [dts({ respectExternal: true }), pluginClean(dist)],

        onLog,
    },

    {
        input: pick(input, ["index", "prettier"]),

        output: [
            {
                dir: cjs,
                format: "cjs",
                entryFileNames: "[name].cjs",
            },
            {
                dir: esm,
                format: "esm",
                entryFileNames: "[name].mjs",
            },
        ],

        external: [...external, /node_modules/],

        plugins: [
            commonjs(),
            json(),
            esbuild({ minify: false }),
            node(),
            pluginClean(cjs, esm),
            {
                name: "plugin:module",
                resolveId: {
                    order: "pre",
                    handler(source) {
                        if (!source.endsWith("/modules")) return null;

                        return { id: "../modules.cjs", external: true };
                    },
                },
            },
        ],
    },

    {
        input: pick(input, ["modules"]),

        output: {
            dir: dist,
            format: "cjs",
            entryFileNames: "[name].cjs",
        },

        external,

        plugins: [
            commonjs({
                // 相关错误：
                // Could not dynamically require "<project>/node_modules/react/index.js". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.
                ignoreDynamicRequires: true,
            }),
            json(),
            esbuild({ minify: true }),
            node(),
            pluginClean(modules),
        ],

        onLog,
    },
]);
