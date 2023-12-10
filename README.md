# eslint-config-goodbyenjn

个人使用的一套 ESLint 规则。基于 [eslint-config-alloy](https://github.com/alloyteam/eslint-config-alloy)，并增加了 [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)、[eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) 插件。

## 使用方法

```bash
npm install --save-dev eslint eslint-config-goodbyenjn
# or
yarn add -D eslint eslint-config-goodbyenjn
```

在你的项目根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: ["goodbyenjn"],
    env: {},
    globals: {},
    rules: {},
};
```

如果你的项目为 ESM 项目，则需要在项目根目录下创建一个 `.eslintrc.mjs` 文件，

会根据 `package.json` 文件中是否存在 `react`、`preact` 和 `typescript` 依赖项来自动启用对应的规则。

## 与 Prettier 配合使用

```bash
npm install --save-dev prettier
# or
yarn add -D prettier
```

在你的项目根目录下创建一个 `.prettierrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    ...require("eslint-config-goodbyenjn/prettier"),
};
```
