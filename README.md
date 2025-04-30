# @goodbyenjn/configs

个人使用的一套配置，包含 ESLint、Prettier、TypeScript 等配置。

## 使用方法

### 安装

```bash
npm install --save-dev @goodbyenjn/configs
# or
pnpm add -D @goodbyenjn/configs
# or
yarn add -D @goodbyenjn/configs
```

### ESLint

本配置基于 [eslint-config-alloy](https://github.com/alloyteam/eslint-config-alloy) 和 [@antfu/eslint-config](https://github.com/antfu/eslint-config)，并增加了 [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)、[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 等插件。

```bash
npm install --save-dev eslint
# or
pnpm add -D eslint
# or
yarn add -D eslint
```

在你的项目根目录下创建一个 `eslint.config.mjs` 文件，并将以下内容复制进去：

```js
import { withConfig } from "@goodbyenjn/configs/eslint";

export default withConfig();
```

本配置会根据 `package.json` 文件中是否存在 `react`、`vue` 和 `typescript` 依赖项来自动启用对应的规则。

你也可以手动覆盖相关配置，例如：

```js
import { withConfig } from "@goodbyenjn/configs/eslint";

export default [
    ...withConfig({
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

本配置带类型定义，在进行配置时会有智能提示。

### Prettier

```bash
npm install --save-dev prettier
# or
pnpm add -D prettier
# or
yarn add -D prettier
```

在你的项目根目录下创建一个 `prettier.config.mjs` 文件，并将以下内容复制进去：

```js
import { withConfig } from "@goodbyenjn/configs/prettier";

export default withConfig();
```

本配置会自动忽略 `.gitignore` 中列出的文件，并且会忽略一些常见的文件，例如 `dist`、`.next`、`.nuxt`、`.output`、`.vercel`、`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml` 等。详细列表请查看 [globs.ts](src/globs.ts) 文件。

如果你需要忽略其他文件，可以在 `prettier.config.mjs` 中添加 `ignores` 选项，例如：

```js
import { withConfig } from "@goodbyenjn/configs/prettier";

export default withConfig({
    // 忽略所有的 JSON 文件
    ignores: ["*.json"],
});
```

其中 `ignores` 选项的格式与 Prettier 配置中的 `overrides[].files` 选项相同。详情请参考 [Prettier 文档](https://prettier.io/docs/configuration#configuration-overrides)。

### TypeScript

```bash
npm install --save-dev typescript
# or
pnpm add -D typescript
# or
yarn add -D typescript
```

在你的项目根目录下创建一个 `tsconfig.json` 文件，并将以下内容复制进去：

```json
{
    "extends": "@goodbyenjn/configs/tsconfigs/<name>"
}
```

其中 `<name>` 可以是以下值：

- `base`: 基础配置，包含大多数常用的配置项。
- `react`: 在 `base` 的基础上增加了 React 相关配置，包含 `jsx` 配置项和 `dom` 相关的库。
- `decorator`: 在 `base` 的基础上增加了装饰器相关配置，包含 `emitDecoratorMetadata` 和 `experimentalDecorators` 配置项。
