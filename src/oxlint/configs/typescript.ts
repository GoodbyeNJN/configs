import { GLOBS_TS, GLOBS_TSX } from "@/shared/globs";

import { getConfigsByKey, getEnablesByKey, getRulesByKey } from "../options";

import type { Options } from "../types";
import type { DummyRuleMap, OxlintConfig } from "oxlint";

const baseRules: DummyRuleMap = {
    // recommended rules in TypeScript but not enabled by default in Oxlint
    "no-redeclare": "off", // override ESLint rule
    "no-undef": "off", // override ESLint rule
    "typescript/ban-ts-comment": "error",
    "typescript/no-empty-object-type": "off",
    "typescript/no-explicit-any": "off",
    "typescript/no-namespace": "error",
    "typescript/no-require-imports": "error",
    "typescript/no-unnecessary-type-constraint": "error",
    "typescript/no-unsafe-function-type": "error",

    // override recommended rules in Oxlint

    // stylistic rules in TypeScript
    "typescript/adjacent-overload-signatures": "error",
    "typescript/array-type": "error",
    "typescript/consistent-generic-constructors": "warn",
    "typescript/consistent-indexed-object-style": "warn",
    "typescript/consistent-type-assertions": "warn",
    "typescript/consistent-type-definitions": "warn",
    "typescript/no-confusing-non-null-assertion": "error",
    "typescript/prefer-for-of": "warn",
    "typescript/prefer-function-type": "warn",

    // strict rules in TypeScript

    // extra rules by user preference
    // "typescript/method-signature-style": "error",
};

const typedRules: DummyRuleMap = {
    // recommended rules in TypeScript but not enabled by default in Oxlint
    "no-throw-literal": "off", // override ESLint rule
    "prefer-promise-reject-errors": "off", // override ESLint rule
    "require-await": "off", // override ESLint rule
    "typescript/no-misused-promises": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "typescript/no-unsafe-argument": "off",
    "typescript/no-unsafe-assignment": "off",
    "typescript/no-unsafe-call": "off",
    "typescript/no-unsafe-enum-comparison": "error",
    "typescript/no-unsafe-member-access": "off",
    "typescript/no-unsafe-return": "off",
    "typescript/only-throw-error": "error",
    "typescript/prefer-promise-reject-errors": "error",
    "typescript/require-await": "error",
    "typescript/restrict-plus-operands": "error",

    // override recommended rules in Oxlint

    // stylistic rules in TypeScript
    "typescript/dot-notation": "warn",
    "typescript/non-nullable-type-assertion-style": "warn",
    "typescript/prefer-find": "warn",
    "typescript/prefer-includes": "warn",
    "typescript/prefer-nullish-coalescing": "warn",
    "typescript/prefer-optional-chain": "warn",
    "typescript/prefer-regexp-exec": "warn",
    "typescript/prefer-string-starts-ends-with": "warn",

    // strict rules in TypeScript
    "typescript/return-await": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",

    // extra rules by user preference
    "prefer-destructuring": "off",
    // "typescript/prefer-destructuring": "warn",
    "typescript/prefer-readonly": "warn",
    "typescript/promise-function-async": "error",
};

export const typescript = (options: Options): OxlintConfig => {
    const enable = getEnablesByKey(options, "typescript");
    if (!enable) return {};

    const { useTypeLinting = true } = getConfigsByKey(options, "typescript");
    const overrideRules = getRulesByKey(options, "typescript");

    return {
        options: {
            typeAware: useTypeLinting,
            typeCheck: useTypeLinting,
        },
        overrides: [
            {
                files: [...GLOBS_TS, ...GLOBS_TSX],
                plugins: ["typescript"],
                rules: {
                    ...baseRules,
                    ...(useTypeLinting ? typedRules : {}),
                    ...overrideRules,
                },
            },
        ],
    };
};
