import globals from "globals";

import { loadEslint } from "@/shared/modules";

import { getOverridesByKey } from "../options";

import type { ESLintConfig, Overrides, Options } from "../types";

export const javascript = (options: Options): ESLintConfig<Overrides["javascript"]>[] => {
    const override = getOverridesByKey(options, "javascript");
    const { rules } = loadEslint();

    return [
        {
            name: "goodbyenjn/javascript/parser",
            languageOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                globals: {
                    ...globals.browser,
                    ...globals.node,
                    ...globals.es2025,
                },
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
        },
        {
            name: "goodbyenjn/javascript/rules",
            rules: {
                ...rules,

                // override recommended
                "no-empty": [
                    "error",
                    {
                        allowEmptyCatch: true,
                    },
                ],
                "no-unused-vars": [
                    "warn",
                    {
                        args: "none",
                        caughtErrors: "none",
                        ignoreRestSiblings: true,
                        varsIgnorePattern: "^_",
                    },
                ],

                // overridable by typescript

                // extends rules
                "accessor-pairs": "warn",
                eqeqeq: [
                    "error",
                    "always",
                    {
                        null: "ignore",
                    },
                ],
                "guard-for-in": "error",
                "logical-assignment-operators": [
                    "warn",
                    "always",
                    { enforceForIfStatements: true },
                ],
                "no-extra-bind": "error",
                "no-invalid-this": "error",
                "no-implicit-coercion": "error",
                "no-multi-assign": "error",
                "no-promise-executor-return": "error",
                "no-return-assign": ["error", "always"],
                "no-throw-literal": "error",
                "no-unmodified-loop-condition": "error",
                "no-useless-computed-key": "error",
                "object-shorthand": "warn",
                "operator-assignment": "warn",
                "prefer-arrow-callback": "warn",
                // "prefer-const": "warn",
                "prefer-destructuring": "warn",
                "prefer-object-spread": "warn",
                "prefer-promise-reject-errors": "error",
                "require-yield": "error",
                "symbol-description": "error",
                yoda: ["warn", "never", { onlyEquality: true }],

                ...override,
            },
        },
    ];
};
