import { pluginImport } from "bundled-modules";

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
            rules: {
                // import 强制排序
                "import/order": [
                    "warn",
                    {
                        "newlines-between": "always",
                        warnOnUnassignedImports: true,
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
