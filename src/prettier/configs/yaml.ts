import { GLOBS_YAML } from "@/shared/globs";
import { getPatternsFromGlobs } from "@/shared/ignore";

import type { Overrides } from "../types";

export const yaml = (): Overrides => {
    return {
        files: getPatternsFromGlobs(GLOBS_YAML),
        options: {
            tabWidth: 2,
        },
    };
};
