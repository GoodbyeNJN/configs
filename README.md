# @goodbyenjn/eslint-config

个人使用的一套 ESLint 规则。基于 [eslint-config-alloy](https://github.com/alloyteam/eslint-config-alloy) 和 [@antfu/eslint-config](https://github.com/antfu/eslint-config)，并增加了 [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)、[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 插件。

目前已适配 ESLint flat config。

这是一个 ESM 模块，已弃用 CommonJS 支持。

## 使用方法

```bash
npm install --save-dev eslint @goodbyenjn/eslint-config
# or
pnpm add -D eslint @goodbyenjn/eslint-config
# or
yarn add -D eslint @goodbyenjn/eslint-config
```

在你的项目根目录下创建一个 `eslint.config.mjs` 文件，并将以下内容复制进去：

```js
import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config";

export default withGoodbyeNJNConfig();
```

本配置会根据 `package.json` 文件中是否存在 `react`、`vue` 和 `typescript` 依赖项来自动启用对应的规则。

你也可以手动覆盖相关配置，例如：

```js
import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config";

export default [
    ...withGoodbyeNJNConfig({
        // 禁用 TypeScript 相关规则
        typescript: false,

        // 启用 React 相关规则
        react: {
            // 手动指定 React 版本
            version: "18",

            // 覆盖 React 相关规则
            overrides: {
                "react/react-in-jsx-scope": "off",
            },
        },

        // 启用 Vue 相关规则
        vue: true,
    }),
];
```

本配置带类型定义，所以在进行配置时会有智能提示。

## 与 Prettier 配合使用

```bash
npm install --save-dev prettier
# or
pnpm add -D prettier
# or
yarn add -D prettier
```

在你的项目根目录下创建一个 `prettier.config.mjs` 文件，并将以下内容复制进去：

```js
import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config/prettier";

export default withGoodbyeNJNConfig();
```

本配置会自动忽略 `.gitignore` 中列出的文件，并且会忽略一些常见的文件，例如 `dist`、`.next`、`.nuxt`、`.output`、`.vercel`、`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml` 等。详细列表请查看 [globs.ts](src/globs.ts) 文件。

如果你需要忽略其他文件，可以在 `prettier.config.mjs` 中添加 `overrides` 选项，例如：

```js
import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config/prettier";

export default withGoodbyeNJNConfig({
    overrides: [
        {
            // 忽略所有的 JSON 文件
            files: ["*.json"],
            options: {
                // 指定名为 "ignored" 的解析器即可忽略匹配的文件
                parser: "ignored",
            },
        },
    ],
});
```
