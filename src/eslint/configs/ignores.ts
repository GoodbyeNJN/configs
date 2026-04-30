import { GLOBS_EXCLUDE } from "@/shared/globs";
import {
    getPatternsFromGitignore,
    getPatternsFromGitmodules,
    getPatternsFromGlobs,
} from "@/shared/ignore";

import type { ESLintConfig, FullOptions } from "../types";

export const ignores = (options: FullOptions): ESLintConfig[] => {
    const ignores = options.ignores ?? [];
    const cwd = process.cwd();

    ignores.push(...getPatternsFromGitignore(cwd), ...getPatternsFromGitmodules(cwd));
    if (ignores.length === 0) {
        ignores.push(...getPatternsFromGlobs(GLOBS_EXCLUDE));
    }

    return [
        {
            name: "goodbyenjn/ignores",
            ignores,
        },
    ];
};
