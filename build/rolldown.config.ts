import fsp from "node:fs/promises";

import { defineConfig } from "rolldown";
import esbuild from "rollup-plugin-esbuild";

import { entryFilesToEntries, external, input, onwarn, output, prettierPlugins } from "./common";

import type { Plugin } from "rolldown";

await fsp.rm(output, {
    force: true,
    recursive: true,
});

export default defineConfig([
    {
        input: entryFilesToEntries([
            input.eslint,
            input.prettier,
            ...prettierPlugins.map(plugin => plugin.input),
        ]),

        output: {
            dir: output,
            format: "esm",
            chunkFileNames: "shared/[name].js",
        },

        platform: "node",
        resolve: { tsconfigFilename: "tsconfig.json" },
        external: [...external, /node_modules/],

        define: {
            "import.meta.env.PRETTIER_PLUGINS": JSON.stringify(
                prettierPlugins.map(plugin => plugin.output),
            ),
        },

        plugins: [
            {
                name: "plugin:external",
                resolveId: {
                    order: "pre",
                    filter: { id: /^@\/shared\/modules$/ },
                    handler() {
                        return { id: `../shared/modules.cjs`, external: true };
                    },
                },
            },
        ],
    },

    {
        input: entryFilesToEntries([input.modules]),

        output: {
            dir: output,
            format: "cjs",
            entryFileNames: "[name].cjs",
            // minify: true,
        },

        platform: "node",
        external: [...external, /^@unrs\/resolver-binding-.*/],

        plugins: [esbuild({ minify: true }) as unknown as Plugin],

        onwarn,
    },
]);
