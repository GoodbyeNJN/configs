#!/usr/bin/env -S tsx

import { unindent } from "@goodbyenjn/utils";

import { devDependencies } from "../package.json";

import { patch } from "./utils";

import type { Patch } from "./utils";

const version = devDependencies["eslint-plugin-import-x"].replace("^", "");

const patches: Patch[] = [
    {
        pattern: "lib/index.cjs",
        handler: (filepath, content) => {
            const regexp = /const \{ name, version \} = .*\(\s*["']\.\.\/package\.json["']\s*\);/;
            const replace = unindent`
                const name = "eslint-plugin-import-x";
                const version = "${version}";
            `;

            return content.replace(regexp, replace);
        },
    },
    {
        pattern: "lib/meta.js",
        handler: (filepath, content) => {
            const regexp =
                /export const \{ name, version \} = .*\(\s*["']\.\.\/package\.json["']\s*\);/;
            const replace = unindent`
                export const name = "eslint-plugin-import-x";
                export const version = "${version}";
            `;

            return content.replace(regexp, replace);
        },
    },
];

await patch("eslint-plugin-import-x", patches);
