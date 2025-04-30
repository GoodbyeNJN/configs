import { GLOB_EXCLUDE_LIST } from "@/shared/globs";

import { parseIgnoreOptions } from "../options";

import type { Options, Overrides } from "../types";

export const ignores = (options: Options = {}): Overrides => {
    const ignores = parseIgnoreOptions(options);

    return {
        files: [...GLOB_EXCLUDE_LIST, ...ignores],
        options: {
            parser: "ignore-parser",
        },
    };
};
