import { configAlloyTypescript, parserTypescript, pluginTypescript } from "modules";

import { GLOB_JS, GLOB_JSX, GLOB_SRC, GLOB_VUE } from "../globs";

import type { ESLintConfig, TypeScriptConfig, TypeScriptOverride } from "../types";

export const typescript = (
    config: TypeScriptConfig,
    override: TypeScriptOverride,
): ESLintConfig<TypeScriptOverride>[] => {
    const { useVue, tsconfigPath, parserOptions } = config;
    const extraFileExtensions: string[] = [];
    const files = [GLOB_SRC];

    if (useVue) {
        extraFileExtensions.push(".vue");
        files.push(GLOB_VUE);
    }

    return [
        {
            name: "goodbyenjn:typescript:common",
            plugins: { "@typescript-eslint": pluginTypescript },
        },
        {
            name: "goodbyenjn:typescript:parser",
            files,
            languageOptions: {
                parser: parserTypescript,
                parserOptions: {
                    sourceType: "module",
                    ecmaVersion: 2022,
                    ecmaFeatures: {
                        jsx: true,
                        globalReturn: false,
                    },
                    extraFileExtensions,

                    ...(tsconfigPath
                        ? { project: tsconfigPath, tsconfigRootDir: process.cwd() }
                        : { project: true }),

                    ...parserOptions,
                },
            },
        },
        {
            name: "goodbyenjn:typescript:rules",
            files,
            rules: {
                ...configAlloyTypescript.rules,

                "no-undef": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-empty-interface": "off",
                "@typescript-eslint/no-invalid-this": "off",
                "@typescript-eslint/no-invalid-void-type": "off",
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
                ],
                "@typescript-eslint/explicit-member-accessibility": "off",

                ...override,
            },
        },
        // {
        //     name: "goodbyenjn:typescript:type-aware-parser",
        //     files: [GLOB_TS, GLOB_TSX],
        //     languageOptions: {
        //         parser: parserTypescript,
        //         parserOptions: {
        //             sourceType: "module",
        //             ecmaVersion: 2022,
        //             ecmaFeatures: {
        //                 jsx: true,
        //                 globalReturn: false,
        //             },
        //             extraFileExtensions,
        //             ...project,

        //             ...parserOptions,
        //         },
        //     },
        // },
        // {
        //     name: "goodbyenjn:typescript:parser",
        //     files: [GLOB_SRC, ...extraFiles],
        //     ignores: [GLOB_TS, GLOB_TSX],
        //     languageOptions: {
        //         parser: parserTypescript,
        //         parserOptions: {
        //             sourceType: "module",
        //             ecmaVersion: 2022,
        //             ecmaFeatures: {
        //                 jsx: true,
        //                 globalReturn: false,
        //             },
        //             extraFileExtensions,

        //             ...parserOptions,
        //         },
        //     },
        // },
        {
            files: [GLOB_JS, GLOB_JSX],
            name: "goodbyenjn:typescript:js-override",
            rules: {
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-var-requires": "off",
            },
        },
    ];
};
