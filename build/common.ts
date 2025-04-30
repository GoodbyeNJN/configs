import path from "node:path";

import fg from "fast-glob";

import type { WarningHandlerWithDefault } from "rolldown";

const replaceTsExtname = (str: string, value = "") => str.replace(/\.[cm]?ts$/, value);

export const entryFilesToEntries = (files: string[]) =>
    Object.fromEntries(files.map(file => [path.relative(src, replaceTsExtname(file)), file]));

const IGNORED_WARNING_CODES = [
    "UNRESOLVED_IMPORT",
    "CIRCULAR_DEPENDENCY",
    "COMMONJS_VARIABLE_IN_ESM",
];

export const onwarn: WarningHandlerWithDefault = (warning, handler) => {
    if (IGNORED_WARNING_CODES.includes(warning.code || "")) {
        return;
    }

    handler(warning);
};

const src = "src";

export const input = {
    eslint: `${src}/eslint/index.ts`,
    prettier: `${src}/prettier/index.ts`,
    modules: `${src}/shared/modules.ts`,
};

export const output = "dist";

export const prettierPlugins = fg.sync(`${src}/prettier/plugins/*.ts`).map(file => ({
    input: file,
    output: path.relative(path.dirname(input.prettier), replaceTsExtname(file, ".js")),
}));

export const external = [/^eslint$|^eslint\/.*/, "prettier", /^typescript$|^typescript\/.*/];
