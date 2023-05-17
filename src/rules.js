const { isReactLikeProject, isTsProject } = require("./utils");

const getImportOrderConfig = ({ isTsFile } = {}) => {
    const common = {
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
        common.pathGroups.push({
            pattern: "**/*.+(sa|sc|le|c)ss",
            group: "index",
            patternOptions: { matchBase: true },
            position: "after",
        });
    }

    return common;
};

exports.getRules = ({ isTsFile } = {}) => {
    const common = {
        // import 强制排序
        "import/order": ["warn", getImportOrderConfig({ isTsFile })],

        // 合并同一个模块的 import
        "import/no-duplicates": "warn",

        // 对命名导入的名称排序
        "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],

        // 检查未使用的变量和函数参数，忽略下划线开头的
        "no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],

        // 允许使用 void，方便 React 事件绑定时使用 () => void 或 () => void fn() 写法
        "no-void": "off",
    };

    if (isTsProject && isTsFile) {
        // 优先使用 import type ... from ...
        common["@typescript-eslint/consistent-type-imports"] = "warn";

        // unused-vars 检查交由 typescript 来处理
        common["@typescript-eslint/no-unused-vars"] = common["no-unused-vars"];
        common["no-unused-vars"] = "off";

        // undef 检查交由 typescript 来处理
        common["no-undef"] = "off";

        // 不检查访问修饰符
        common["@typescript-eslint/explicit-member-accessibility"] = "off";
    }

    return common;
};
