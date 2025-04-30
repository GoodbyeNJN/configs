import { configGitignore } from "@/shared/modules";

import type { ESLintConfig } from "../types";

export const gitignore = (): ESLintConfig[] => {
    return [
        configGitignore({
            strict: false,
        }),
    ];
};
