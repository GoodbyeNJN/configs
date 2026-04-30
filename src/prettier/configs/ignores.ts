import { GLOBS_EXCLUDE, GLOBS_LOCK_FILES } from "@/shared/globs";
import {
    getPatternsFromGitignore,
    getPatternsFromGitmodules,
    getPatternsFromGlobs,
    separateNegatedPatterns,
} from "@/shared/ignore";

import type { Options, Overrides } from "../types";

export const ignores = (options: Options): Overrides => {
    const cwd = process.cwd();

    const ignores = getPatternsFromGlobs(options.ignores ?? []);
    ignores.push(...getPatternsFromGitignore(cwd));
    ignores.push(...getPatternsFromGitmodules(cwd));
    ignores.push(...getPatternsFromGlobs(GLOBS_LOCK_FILES));

    if (ignores.length === 0) {
        ignores.push(...getPatternsFromGlobs(GLOBS_EXCLUDE));
    }

    const { normal, negated } = separateNegatedPatterns(ignores);

    return {
        files: normal,
        excludeFiles: negated,
        options: {
            parser: "ignore-parser",
        },
    };
};
