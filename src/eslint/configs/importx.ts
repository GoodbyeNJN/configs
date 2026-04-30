import { loadImportX } from "@/shared/modules";

import { getConfigsByKey, getOverridesByKey } from "../options";

import type { ESLintConfig, Overrides, Options } from "../types";

export const importx = (options: Options): ESLintConfig<Overrides["import"]>[] => {
    const { order = {} } = getConfigsByKey(options, "import");
    const override = getOverridesByKey(options, "import");
    const { plugin, createNodeResolver } = loadImportX();

    return [
        {
            name: "goodbyenjn/import",
            plugins: {
                import: plugin,
            },
            settings: {
                "import/resolver-next": [createNodeResolver()],
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
