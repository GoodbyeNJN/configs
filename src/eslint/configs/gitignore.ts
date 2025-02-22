import { configGitignore } from "modules/eslint";

import type { ESLintConfig } from "../types";

export const gitignore = (): ESLintConfig[] => {
    return [configGitignore()];
};
