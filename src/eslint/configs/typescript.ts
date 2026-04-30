import { GLOBS_TS, GLOBS_TSX } from "@/shared/globs";
import { getPatternsFromGlobs } from "@/shared/ignore";
import { loadTypescript } from "@/shared/modules";

import { getConfigsByKey, getOverridesByKey } from "../options";
import { mapRuleNamespace } from "../utils";

import type { ESLintConfig, Options, Overrides } from "../types";

export const typescript = async (
    options: Options,
): Promise<ESLintConfig<Overrides["typescript"]>[]> => {
    const { useTypeLinting = true, tsconfigRootDir } = getConfigsByKey(options, "typescript");
    const override = getOverridesByKey(options, "typescript");
    const { plugin, rules, parser } = await loadTypescript();

    return [
        {
            name: "goodbyenjn/typescript/parser",
            plugins: {
                typescript: plugin,
            },
            languageOptions: {
                parser,
                sourceType: "module",
                parserOptions: {
                    projectService: true,
                    tsconfigRootDir,
                },
            },
        },
        {
            name: "goodbyenjn/typescript/rules",
            files: getPatternsFromGlobs([...GLOBS_TS, ...GLOBS_TSX]),
            rules: {
                ...mapRuleNamespace(
                    {
                        ...rules.recommendEslint,
                        ...rules.recommend,
                        ...(useTypeLinting ? rules.recommendTyped : {}),
                    },
                    "@typescript-eslint",
                    "typescript",
                ),

                // override recommended
                "prefer-const": "off",
                "typescript/no-explicit-any": "off",
                "typescript/no-unused-vars": [
                    "warn",
                    {
                        args: "none",
                        caughtErrors: "none",
                        ignoreRestSiblings: true,
                        varsIgnorePattern: "^_",
                    },
                ],
                ...(useTypeLinting
                    ? {
                          "typescript/no-unsafe-argument": "off",
                          "typescript/no-unsafe-assignment": "off",
                          "typescript/no-unsafe-call": "off",
                          "typescript/no-unsafe-member-access": "off",
                          "typescript/no-unsafe-return": "off",
                      }
                    : {}),

                // stylistic
                "typescript/adjacent-overload-signatures": "error",
                "typescript/array-type": "error",
                "typescript/consistent-generic-constructors": "warn",
                "typescript/consistent-indexed-object-style": "warn",
                "typescript/consistent-type-assertions": "warn",
                "typescript/consistent-type-definitions": "warn",
                // "typescript/consistent-type-imports": "warn", // maybe conflict with tsconfig.verbatimModuleSyntax
                "typescript/no-confusing-non-null-assertion": "error",
                "typescript/prefer-for-of": "warn",
                "typescript/prefer-function-type": "warn",
                ...(useTypeLinting
                    ? {
                          "typescript/dot-notation": "warn",
                          "typescript/non-nullable-type-assertion-style": "warn",
                          "typescript/prefer-find": "warn",
                          "typescript/prefer-includes": "warn",
                          "typescript/prefer-nullish-coalescing": "warn",
                          "typescript/prefer-optional-chain": "warn",
                          "typescript/prefer-regexp-exec": "warn",
                          "typescript/prefer-string-starts-ends-with": "warn",
                      }
                    : {}),

                // strict
                ...(useTypeLinting
                    ? {
                          "typescript/return-await": "error",
                          "typescript/use-unknown-in-catch-callback-variable": "error",
                      }
                    : {}),

                // extends rules
                "typescript/method-signature-style": "error",
                ...(useTypeLinting
                    ? {
                          "prefer-destructuring": "off",
                          "typescript/prefer-destructuring": "warn",
                          "typescript/prefer-readonly": "warn",
                          "typescript/promise-function-async": "error",
                      }
                    : {}),

                ...override,
            },
        },
    ];
};
