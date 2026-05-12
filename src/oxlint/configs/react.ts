import { GLOBS_JSX, GLOBS_TSX } from "@/shared/globs";

import { getConfigsByKey, getEnablesByKey, getRulesByKey } from "../options";

import type { Options } from "../types";
import type { DummyRuleMap, OxlintConfig } from "oxlint";

const commonRules: DummyRuleMap = {
    // recommended rules in React but not enabled by default in Oxlint
    "react/exhaustive-deps": "warn",
    "react/jsx-no-comment-textnodes": "warn",
    "react/no-array-index-key": "warn",
    "react/no-clone-element": "warn",
    "react/no-direct-mutation-state": "error",
    "react/rules-of-hooks": "error",

    // override recommended rules in Oxlint

    // extra rules by user preference
};

export const react = (options: Options): OxlintConfig => {
    const enable = getEnablesByKey(options, "react");
    if (!enable) return {};

    const enableTypescript = getEnablesByKey(options, "typescript");
    const { useTypescript, version = "detect" } = getConfigsByKey(options, "react");
    const overrideRules = getRulesByKey(options, "react");

    const overrides: OxlintConfig["overrides"] = [
        {
            files: [...GLOBS_JSX],
            plugins: ["react"],
            rules: {
                ...commonRules,
                ...overrideRules,
            },
        },
    ];
    if (enableTypescript || useTypescript) {
        overrides.push({
            files: [...GLOBS_TSX],
            plugins: ["react", "typescript"],
            rules: {
                ...commonRules,
                ...overrideRules,
            },
        });
    }

    return {
        settings: {
            react: { version },
        },
        overrides,
    };
};
