import { configAlloy, globals } from "bundled-modules";

import type { ESLintConfig, JavaScriptConfig, JavaScriptOverride } from "../types";

export const javascript = (
    config: JavaScriptConfig,
    override: JavaScriptOverride,
): ESLintConfig[] => {
    return [
        {
            name: "goodbyenjn:javascript",
            languageOptions: {
                sourceType: "module",
                ecmaVersion: 2022,
                globals: {
                    ...globals.browser,
                    ...globals.node,
                    ...globals.commonjs,
                    ...globals.es2021,
                },
                parserOptions: {
                    sourceType: "module",
                    ecmaVersion: 2022,
                    ecmaFeatures: {
                        jsx: true,
                        globalReturn: false,
                    },
                },
            },
            rules: {
                ...configAlloy.base.rules,

                "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],
                "no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
                "no-void": "off",

                ...override,
            },
        },
    ];
};
