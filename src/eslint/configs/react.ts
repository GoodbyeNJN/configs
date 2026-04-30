import { GLOBS_JS, GLOBS_JSX, GLOBS_TS, GLOBS_TSX } from "@/shared/globs";
import { getPatternsFromGlobs } from "@/shared/ignore";
import { loadReact } from "@/shared/modules";

import { getConfigsByKey } from "../options";
import { mapRuleNamespace } from "../utils";

import type { ESLintConfig, Options, Overrides } from "../types";

export const react = async (options: Options, useTypescript?: boolean) => {
    const { version, useTypescript: _useTypescript } = getConfigsByKey(options, "react");
    const { plugin, settings, rules } = await loadReact();

    const configs: ESLintConfig<Overrides["react"]>[] = [
        {
            name: "goodbyenjn/react/parser",
            plugins: {
                react: plugin,
            },
            settings: {
                react: { ...settings, ...(version ? { version } : {}) },
            },
        },
        {
            name: "goodbyenjn/react/js",
            files: getPatternsFromGlobs([...GLOBS_JS, ...GLOBS_JSX]),
            rules: {
                ...mapRuleNamespace(rules.recommend, "@eslint-react", "react"),
            },
        },
    ];
    if (useTypescript || _useTypescript) {
        configs.push({
            name: "goodbyenjn/react/ts",
            files: getPatternsFromGlobs([...GLOBS_TS, ...GLOBS_TSX]),
            rules: {
                ...mapRuleNamespace(rules.recommend, "@eslint-react", "react"),
            },
        });
    }

    return configs;
};
