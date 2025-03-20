/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { EslintRules, ReactRules, VueRules } from "@antfu/eslint-define-config";
import type { ESLint, Linter } from "eslint";

export const configGitignore: typeof import("eslint-config-flat-gitignore").default;
export const configAlloyBase: { rules: EslintRules };
export const configAlloyReact: { rules: ReactRules };
export const configAlloyTypescript: { rules: TypeScriptRule };
export const configAlloyVue: { rules: VueRules };

export const pluginTypescript: ESLint.Plugin;
export const pluginReact: ESLint.Plugin;
export const pluginReactHooks: ESLint.Plugin;
export const pluginVue: ESLint.Plugin;
export const pluginImport: ESLint.Plugin;
export const pluginImportResolverOxc: ESLint.Plugin;

export const parserTypescript: Linter.Parser;
export const parserVue: Linter.Parser;

export const globals: typeof import("globals");
export const isPackageExists: typeof import("local-pkg").isPackageExists;
