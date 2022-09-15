# eslint-config-goodbyenjn

个人使用的一套 ESLint 规则。基于 [eslint-config-alloy](https://github.com/alloyteam/eslint-config-alloy)，并增加了 [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)、[eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) 插件。

## 快速开始

请根据你的项目使用的技术栈选择以下配置：

-   [内置规则](#内置规则)
-   [React](#react)
-   [TypeScript](#typescript)
-   [TypeScript React](#typescript-react)

## 使用方法

### 内置规则

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: ["goodbyenjn/base"],
    env: {},
    globals: {},
    rules: {},
};
```

### React

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: ["goodbyenjn/react"],
    env: {},
    globals: {},
    rules: {},
};
```

### TypeScript

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: ["goodbyenjn/typescript"],
    env: {},
    globals: {},
    rules: {},
};
```

### TypeScript React

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: ["goodbyenjn/typescript-react"],
    env: {},
    globals: {},
    rules: {},
};
```

## 结合 Prettier 使用

在你的项目的根目录下创建一个 `.prettierrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    ...require("eslint-config-goodbyenjn/prettier"),

    // 其他配置 or 覆盖配置
};
```
