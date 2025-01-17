import type { ESLint } from "eslint";

export declare const pluginTypescript: ESLint.Plugin;
export * as parserTypescript from "@typescript-eslint/parser";

export declare const pluginImport: ESLint.Plugin;
export * as pluginImportResolverOxc from "eslint-import-resolver-oxc";

export { default as pluginReact } from "eslint-plugin-react";
export { default as pluginReactHooks } from "eslint-plugin-react-hooks";

export { default as pluginVue } from "eslint-plugin-vue";
export * as parserVue from "vue-eslint-parser";

export declare const configAlloyBase: ESLint.Plugin;
export declare const configAlloyReact: ESLint.Plugin;
export declare const configAlloyTypescript: ESLint.Plugin;
export declare const configAlloyVue: ESLint.Plugin;

export { default as configGitignore } from "eslint-config-flat-gitignore";

export { default as globals } from "globals";

export * as localPkg from "local-pkg";
