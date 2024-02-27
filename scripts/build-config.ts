import { build } from "tsup";

import { BUNDLED_MODULES_ENTRY, BUNDLED_MODULES_PATH, DIST_PATH, SRC_PATH } from "./constants";
import { cp, resolve } from "./utils";

const dist = DIST_PATH;
const name = "bundled-modules";

await build({
    entry: [resolve(SRC_PATH, "index.ts"), resolve(SRC_PATH, "prettier.ts")],
    outDir: dist,
    format: ["cjs", "esm"],
    dts: true,
    shims: true,
    // minify: true,
    sourcemap: false,
    splitting: true,
    clean: true,
    esbuildOptions: (options, ctx) => {
        if (ctx.format === "cjs") {
            options.outdir = resolve(dist, "cjs");
        } else if (ctx.format === "esm") {
            options.outdir = resolve(dist, "esm");
        }
    },
    esbuildPlugins: [
        {
            name: "replace-bundled-modules",
            setup(build) {
                build.onResolve({ filter: new RegExp(`^${name}$`) }, () => ({
                    path: `../${name}/${BUNDLED_MODULES_ENTRY}`,
                    external: true,
                }));
            },
        },
    ],
});

await cp(BUNDLED_MODULES_PATH, resolve(dist, name));
