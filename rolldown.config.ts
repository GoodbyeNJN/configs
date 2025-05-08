import fsp from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import * as R from "remeda";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

const src = "src";
const dist = "dist";
const external = [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/];

const entryFiles = {
    eslint: {
        filepath: `${src}/eslint/index.ts`,
        entrypoint: "eslint/index",
    },
    prettier: {
        filepath: `${src}/prettier/index.ts`,
        entrypoint: "prettier/index",
    },
    modules: {
        filepath: `${src}/shared/modules.ts`,
        entrypoint: "shared/modules",
    },
};
const prettierPluginFiles = R.pipe(
    await fg.async(`${src}/prettier/plugins/*.ts`),
    R.map(file => ({
        filepath: file,
        filename: path.basename(file, ".ts"),
    })),
    R.map(({ filepath, filename }) => ({
        filepath,
        entrypoint: `prettier/plugins/${filename}`,
        pluginEntry: `plugins/${filename}.js`,
    })),
);

await fsp.rm(dist, {
    force: true,
    recursive: true,
});

const filesToEntries = (...files: { filepath: string; entrypoint: string }[]) =>
    R.mapToObj(files, ({ filepath, entrypoint }) => [entrypoint, filepath]);

export default defineConfig([
    {
        input: filesToEntries(entryFiles.eslint, entryFiles.prettier),

        output: {
            dir: dist,
            format: "esm",
            chunkFileNames: "shared/[name].js",
        },

        platform: "node",
        resolve: { tsconfigFilename: "tsconfig.json" },
        external,

        define: {
            "import.meta.env.PRETTIER_PLUGINS": JSON.stringify(
                R.map(prettierPluginFiles, R.prop("pluginEntry")),
            ),
        },

        plugins: [
            dts({
                resolve: true,
            }),
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
        input: filesToEntries(...prettierPluginFiles),

        output: {
            dir: dist,
            format: "esm",
        },
    },

    {
        input: filesToEntries(entryFiles.modules),

        output: {
            dir: dist,
            format: "cjs",
            entryFileNames: "[name].cjs",
            minify: true,
        },

        platform: "node",
        external: [...external, /^@unrs\/resolver-binding-.*/],

        checks: {
            commonJsVariableInEsm: false,
        },
    },
]);
