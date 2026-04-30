import { GLOBS_JSONC } from "@/shared/globs";
import { getPatternsFromGlobs } from "@/shared/ignore";

import type { Overrides } from "../types";

export const jsonc = (): Overrides => {
    return {
        files: getPatternsFromGlobs(GLOBS_JSONC),
        options: {
            trailingComma: "none",
        },
    };
};
