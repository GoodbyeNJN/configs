import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

export default defineConfig({
    input: {
        "oxlint/index": "src/oxlint/index.ts",
        "oxfmt/index": "src/oxfmt/index.ts",
    },

    output: {
        dir: "dist",
        cleanDir: true,
        format: "esm",
        hashCharacters: "hex",
        chunkFileNames: "chunks/chunk-[hash].js",
    },

    platform: "node",

    plugins: [
        dts({
            tsconfig: "tsconfig.build.json",
        }),
    ],
});
