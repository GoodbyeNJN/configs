import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: ["src/modules.ts"],
        outDir: "dist",
        format: "cjs",
        minify: true,
        clean: true,

        external: [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/],
    },

    {
        entry: ["src/index.ts", "src/prettier.ts"],
        outDir: "dist",
        format: ["cjs", "esm"],
        dts: { resolve: true },
        clean: true,

        outExtension: () => ({ js: ".js", dts: ".d.ts" }),

        esbuildOptions: (options, ctx) => {
            if (ctx.format === "cjs") {
                options.outdir = "dist/cjs";
            } else if (ctx.format === "esm") {
                options.outdir = "dist/esm";
            }
        },

        esbuildPlugins: [
            {
                name: "replace-bundled-modules",
                setup: build => {
                    build.onResolve({ filter: /\.+\/modules/ }, () => ({
                        path: "../modules.cjs",
                        external: true,
                    }));
                },
            },
        ],
    },
]);
