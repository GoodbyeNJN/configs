import { GLOB_EXCLUDE_LIST } from "@/shared/globs";

import { parseIgnoreOptions, parseIgnorePattern } from "../options";

import type { Options, Overrides } from "../types";

export const ignores = (options: Options = {}): Overrides => {
    const includes: string[] = [];
    const excludes: string[] = [];

    for (const ignore of parseIgnoreOptions(options)) {
        const { isNegated, pattern } = parseIgnorePattern(ignore);

        if (isNegated) {
            excludes.push(pattern);
        } else {
            includes.push(pattern);
        }
    }

    return {
        files: [...GLOB_EXCLUDE_LIST, ...includes],
        excludeFiles: excludes,
        options: {
            parser: "ignore-parser",
        },
    };
};
