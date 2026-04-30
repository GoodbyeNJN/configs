export const GLOBS_JSONC = ["*.jsonc", "*.cjson"];

export const GLOBS_YAML = ["*.yaml", "*.yml"];

export const GLOBS_JS = ["*.js", "*.[cm]js"];
export const GLOBS_JSX = ["*.jsx", "*.[cm]jsx"];

export const GLOBS_TS = ["*.ts", "*.[cm]ts"];
export const GLOBS_TSX = ["*.tsx", "*.[cm]tsx"];

export const GLOBS_LOCK_FILES = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb"];

export const GLOBS_EXCLUDE = [
    "node_modules/",
    "dist/",

    "output/",
    "coverage/",
    "temp/",
    ".temp/",
    "tmp/",
    ".tmp/",
    ".history/",
    ".vitepress/cache/",
    ".nuxt/",
    ".next/",
    ".vercel/",
    ".changeset/",
    ".idea/",
    ".cache/",
    ".output/",
    ".vite-inspect/",

    "*.min.*",
    "__snapshots__/",
];
