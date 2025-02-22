export const GITIGNORE = ".gitignore";
export const GITMODULES = ".gitmodules";

export const GLOB_SRC_EXT = "?([cm])[jt]s?(x)";
export const GLOB_SRC = "**/*.?([cm])[jt]s?(x)";

export const GLOB_JS = "**/*.?([cm])js";
export const GLOB_JSX = "**/*.?([cm])jsx";

export const GLOB_TS = "**/*.?([cm])ts";
export const GLOB_TSX = "**/*.?([cm])tsx";

export const GLOB_SVELTE = "**/*.svelte";
export const GLOB_VUE = "**/*.vue";

export const GLOB_TESTS_LIST = [
    `**/__tests__/**/*.${GLOB_SRC_EXT}`,
    `**/*.spec.${GLOB_SRC_EXT}`,
    `**/*.test.${GLOB_SRC_EXT}`,
    `**/*.bench.${GLOB_SRC_EXT}`,
    `**/*.benchmark.${GLOB_SRC_EXT}`,
];

export const GLOB_SRC_LIST = [GLOB_SRC, GLOB_SVELTE, GLOB_VUE];

export const GLOB_EXCLUDE_LIST = [
    "**/node_modules",
    "**/dist",
    "**/package-lock.json",
    "**/yarn.lock",
    "**/pnpm-lock.yaml",
    "**/bun.lockb",

    "**/output",
    "**/coverage",
    "**/temp",
    "**/.temp",
    "**/tmp",
    "**/.tmp",
    "**/.history",
    "**/.vitepress/cache",
    "**/.nuxt",
    "**/.next",
    "**/.vercel",
    "**/.changeset",
    "**/.idea",
    "**/.cache",
    "**/.output",
    "**/.vite-inspect",

    "**/*.min.*",
    "**/__snapshots__",
];
