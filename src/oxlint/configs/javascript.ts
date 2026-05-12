import { getEnablesByKey, getRulesByKey } from "../options";

import type { Options } from "../types";
import type { OxlintConfig } from "oxlint";

export const javascript = (options: Options): OxlintConfig => {
    const enable = getEnablesByKey(options, "javascript");
    if (!enable) return {};

    const rules = getRulesByKey(options, "javascript");

    return {
        plugins: ["eslint"],
        rules: {
            // recommended rules in ESLint but not enabled by default in Oxlint
            "no-case-declarations": "error",
            "no-empty": ["error", { allowEmptyCatch: true }],
            "no-fallthrough": "error",
            "no-prototype-builtins": "error",
            "no-redeclare": "error",
            "no-regex-spaces": "error",
            "no-undef": "error",
            "no-unexpected-multiline": "error",
            "no-useless-assignment": "error",
            "preserve-caught-error": "error",

            // override recommended rules in Oxlint
            "no-unused-vars": [
                "warn",
                {
                    args: "none",
                    caughtErrors: "none",
                    ignoreRestSiblings: true,
                    ignoreUsingDeclarations: true,
                    varsIgnorePattern: "^_",
                    fix: { imports: "off" },
                },
            ],

            // extra rules by user preference
            "accessor-pairs": "warn",
            eqeqeq: ["error", "always", { null: "ignore" }],
            "guard-for-in": "error",
            "logical-assignment-operators": ["warn", "always", { enforceForIfStatements: true }],
            "no-array-constructor": "error",
            "no-extra-bind": "error",
            "no-implicit-coercion": "error",
            "no-multi-assign": "error",
            "no-promise-executor-return": "error",
            "no-return-assign": "off",
            "no-throw-literal": "error",
            "no-unmodified-loop-condition": "error",
            "no-unused-expressions": "error",
            "no-useless-computed-key": "error",
            "no-var": "error",
            "object-shorthand": "warn",
            "operator-assignment": "warn",
            // "prefer-const": "warn",
            "prefer-destructuring": "warn",
            "prefer-object-spread": "warn",
            "prefer-promise-reject-errors": "error",
            "prefer-rest-params": "error",
            "require-yield": "error",
            "prefer-spread": "error",
            "symbol-description": "error",
            yoda: ["warn", "never", { onlyEquality: true }],

            ...rules,
        },
    };
};
