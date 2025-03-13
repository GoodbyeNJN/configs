import { pluginImport, pluginImportResolverOxc } from "modules";

import type { ESLintConfig, ImportsConfig, ImportsOverride } from "../types";

export const imports = (
    config: ImportsConfig,
    override: ImportsOverride,
): ESLintConfig<ImportsOverride>[] => {
    const { order = {} } = config;

    return [
        {
            name: "goodbyenjn:imports",
            plugins: { import: pluginImport },
            settings: {
                "import-x/resolver": [
                    {
                        name: "oxc",
                        enable: true,
                        options: {},
                        resolver: pluginImportResolverOxc,
                    },
                ],
            },
            rules: {
                // import 强制排序
                "import/order": [
                    "warn",
                    {
                        "newlines-between": "always",
                        warnOnUnassignedImports: true,
                        pathGroupsExcludedImportTypes: ["type"],
                        pathGroups: [
                            // @/ $/ 开头的视为内部模块
                            {
                                pattern: "+(@|$)/**",
                                group: "internal",
                            },
                            // 样式文件放在最后，单独一组
                            {
                                pattern: "**/*.+(sa|sc|le|c)ss",
                                group: "index",
                                patternOptions: { matchBase: true },
                                position: "after",
                            },
                        ],
                        groups: [
                            "builtin",
                            "external",
                            "internal",
                            "parent",
                            "sibling",
                            "index",
                            "object",
                            "type",
                        ],
                        alphabetize: {
                            order: "asc",
                            caseInsensitive: true,
                        },

                        // 允许自定义排序
                        ...order,
                    },
                ],

                "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
                "import/first": "error",
                "import/newline-after-import": "error",
                "import/no-duplicates": "error",
                "import/no-mutable-exports": "error",
                "import/no-named-default": "error",
                "import/no-self-import": "error",
                "import/no-webpack-loader-syntax": "error",

                ...override,
            },
        },
    ];
};
