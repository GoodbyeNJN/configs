import { GLOB_EXCLUDE_LIST } from "@/globs";

import type { Options, Override } from "../types";

export const ignores = (options: Options = {}): Override => {
    const { ignores = [] } = options;

    return {
        files: [...GLOB_EXCLUDE_LIST, ...ignores],
        options: {
            parser: "ignored",
        },
    };
};
