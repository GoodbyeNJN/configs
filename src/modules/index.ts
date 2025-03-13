import _pluginTypescript from "@typescript-eslint/eslint-plugin";
import _pluginImport from "eslint-plugin-import-x";

import type { ESLint } from "eslint";

export * as parserTypescript from "@typescript-eslint/parser";
// @ts-ignore
export { default as configAlloyBase } from "eslint-config-alloy/base";
// @ts-ignore
export { default as configAlloyReact } from "eslint-config-alloy/react";
// @ts-ignore
export { default as configAlloyTypescript } from "eslint-config-alloy/typescript";
// @ts-ignore
export { default as configAlloyVue } from "eslint-config-alloy/vue";
export { default as configGitignore } from "eslint-config-flat-gitignore";
export * as pluginImportResolverOxc from "eslint-import-resolver-oxc";
export { default as pluginReact } from "eslint-plugin-react";
// @ts-ignore
export { default as pluginReactHooks } from "eslint-plugin-react-hooks";
export { default as pluginVue } from "eslint-plugin-vue";
export { default as globals } from "globals";
export * as parserVue from "vue-eslint-parser";

export { isPackageExists } from "local-pkg";

export const pluginTypescript = _pluginTypescript as unknown as ESLint.Plugin;
export const pluginImport = _pluginImport as unknown as ESLint.Plugin;
