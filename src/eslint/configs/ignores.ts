import { GLOB_EXCLUDE_LIST } from "@/globs";

import type { ESLintConfig } from "../types";

export const ignores = (): ESLintConfig[] => {
    return [{ ignores: GLOB_EXCLUDE_LIST }];
};
