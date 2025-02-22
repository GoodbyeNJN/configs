import { GLOB_EXCLUDE_LIST } from "@/globs";

import type { OverrideConfig } from "../types";

export const ignores = (): OverrideConfig => {
    return {
        files: GLOB_EXCLUDE_LIST,
        options: {
            parser: "ignored",
        },
    };
};
