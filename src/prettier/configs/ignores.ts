import { GLOB_EXCLUDE_LIST } from "@/globs";

import { parseIgnoreOptions } from "../options";

import type { Options, Override } from "../types";

export const ignores = (options: Options = {}): Override => {
    const ignores = parseIgnoreOptions(options);

    return {
        files: [...GLOB_EXCLUDE_LIST, ...ignores],
        options: {
            parser: "ignore-parser",
        },
    };
};
