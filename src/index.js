const { isReactLikeProject, isTsProject } = require("./utils");

const getExtends = () => {
    const base = ["alloy"];

    if (isReactLikeProject) {
        base.push("alloy/react", "plugin:react-hooks/recommended");
    }

    if (isTsProject) {
        base.push("alloy/typescript");
    }

    return base;
};

const getPlugins = () => {
    const base = ["import"];

    return base;
};

const getRules = () => {
    const importOrderConfig = {
        "newlines-between": "always",
        warnOnUnassignedImports: true,
        pathGroups: [
            // @/... 开头的视为内部模块
            {
                pattern: "@/**",
                group: "internal",
            },
        ],
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        alphabetize: {
            order: "asc",
            caseInsensitive: true,
        },
    };

    if (isReactLikeProject) {
        // 样式文件放在最后，单独一组
        importOrderConfig.pathGroups.push({
            pattern: "**/*.+(sa|sc|le|c)ss",
            group: "index",
            patternOptions: { matchBase: true },
            position: "after",
        });
    }

    const base = {
        // import 强制排序
        "import/order": ["warn", importOrderConfig],

        // 合并同一个模块的 import
        "import/no-duplicates": "warn",

        // 对命名导入的名称排序
        "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],
    };

    if (isTsProject) {
        // 优先使用 import type ... from ...
        base["@typescript-eslint/consistent-type-imports"] = "warn";

        // undef 检查交由 typescript 来处理
        base["no-undef"] = "off";
    }

    return base;
};

module.exports = {
    extends: getExtends(),
    plugins: getPlugins(),
    rules: getRules(),
};
