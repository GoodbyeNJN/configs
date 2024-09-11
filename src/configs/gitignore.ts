import { configGitignore } from "../modules";

import type { ESLintConfig } from "../types";

export const gitignore = (): ESLintConfig[] => {
    return [configGitignore()];
};
