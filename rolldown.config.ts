import { BaseVFile } from "@goodbyenjn/utils/fs";
import { glob } from "@goodbyenjn/utils/glob";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

const dist = "dist";

export default defineConfig([
    {
        input: {
            "eslint/index": "src/eslint/index.ts",
            "prettier/index": "src/prettier/index.ts",
        },

        output: {
            dir: dist,
            cleanDir: true,
            format: "esm",
            hashCharacters: "hex",
            chunkFileNames: ({ name }) =>
                `shared/[name]${name.startsWith("rolldown-runtime") ? "" : `-[hash]`}.js`,
            minify: true,

            codeSplitting: {
                groups: (await glob("src/shared/*.ts"))
                    .map(file => new BaseVFile(file))
                    .map(vfile => ({
                        name: vfile.filename(),
                        test: vfile.pathname.relative(),
                    })),
            },
        },

        platform: "node",
        external: [
            /^eslint$|^eslint\/.*/,
            "prettier",
            /^typescript$|^typescript\/.*/,
            /^@unrs\/resolver-binding-.*$/,
        ],

        transform: {
            define: {
                "import.meta.env.PRETTIER_PLUGINS": JSON.stringify(["plugins/ignore.js"]),
            },
        },
        treeshake: {
            moduleSideEffects: false,
        },

        plugins: [dts()],
    },

    {
        input: {
            "prettier/plugins/ignore": "src/prettier/plugins/ignore.ts",
        },

        output: {
            dir: dist,
            format: "esm",
        },
    },
]);
