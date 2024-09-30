# eslint-config-goodbyenjn

个人使用的一套 ESLint 规则。基于 [eslint-config-alloy](https://github.com/alloyteam/eslint-config-alloy) 和 [@antfu/eslint-config](https://github.com/antfu/eslint-config)，并增加了 [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i)、[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 插件。

目前已适配 ESLint flat config。

## 使用方法

```bash
npm install --save-dev eslint eslint-config-goodbyenjn
# or
pnpm add -D eslint eslint-config-goodbyenjn
# or
yarn add -D eslint eslint-config-goodbyenjn
```

在你的项目根目录下创建一个 `eslint.config.js` 文件，并将以下内容复制进去：

```js
import { withGoodbyeNJNConfig } from "eslint-config-goodbyenjn";

export default [...withGoodbyeNJNConfig()];

// or

const { withGoodbyeNJNConfig } = require("eslint-config-goodbyenjn");

module.exports = [...withGoodbyeNJNConfig()];
```

本配置会根据 `package.json` 文件中是否存在 `react`、`vue` 和 `typescript` 依赖项来自动启用对应的规则。

你也可以手动覆盖相关配置，例如：

```js
import { withGoodbyeNJNConfig } from "eslint-config-goodbyenjn";

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

在你的项目根目录下创建一个 `prettier.config.js` 文件，并将以下内容复制进去：

```js
import { withGoodbyeNJNConfig } from "eslint-config-goodbyenjn/prettier";

export default withGoodbyeNJNConfig({
    // custom configs
});

// or

const { withGoodbyeNJNConfig } = require("eslint-config-goodbyenjn/prettier");

module.exports = withGoodbyeNJNConfig({
    // custom configs
});
```
