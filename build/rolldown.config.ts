import fs from "node:fs";

import { pick } from "remeda";
import { defineConfig } from "rolldown";
import esbuild from "rollup-plugin-esbuild";

import { external, input, output } from "./common";

import type { Plugin } from "rolldown";

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

        platform: "node",
        resolve: { tsconfigFilename: "tsconfig.json" },
        external: [...external, /node_modules/],

        plugins: [
            pluginClean(),
            {
                name: "plugin:modules",
                resolveId: {
                    order: "pre",
                    filter: { id: /^modules$/ },
                    handler(id) {
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
    },

    {
        input: input.modules,

        output: {
            dir: output.chunks,
            format: "cjs",
            entryFileNames: "modules.cjs",
            // minify: true,
        },

        platform: "node",
        external: [...external, /^@unrs\/resolver-binding-.*/],

        plugins: [
            esbuild({ minify: true }) as Plugin,
        ],
    },
]);
