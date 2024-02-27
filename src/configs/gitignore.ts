import { configGitignore } from "bundled-modules";

import type { ESLintConfig } from "../types";

export const gitignore = (): ESLintConfig[] => {
    return [configGitignore()];
};
