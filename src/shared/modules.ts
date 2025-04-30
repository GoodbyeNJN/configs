/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/consistent-type-imports */

import type {
    EslintRules,
    ReactRules,
    TypeScriptRules,
    VueRules,
} from "@antfu/eslint-define-config";
import type { ESLint, Linter } from "eslint";

export declare const configGitignore: typeof import("eslint-config-flat-gitignore").default;
exports.configGitignore = require("eslint-config-flat-gitignore").default;

export declare const configAlloyBase: { rules: EslintRules };
export declare const configAlloyReact: { rules: ReactRules };
export declare const configAlloyTypescript: { rules: TypeScriptRules };
export declare const configAlloyVue: { rules: VueRules };
exports.configAlloyBase = require("eslint-config-alloy/base");
exports.configAlloyReact = require("eslint-config-alloy/react");
exports.configAlloyTypescript = require("eslint-config-alloy/typescript");
exports.configAlloyVue = require("eslint-config-alloy/vue");

export declare const pluginTypescript: ESLint.Plugin;
export declare const pluginReact: ESLint.Plugin;
export declare const pluginReactHooks: ESLint.Plugin;
export declare const pluginVue: ESLint.Plugin;
export declare const pluginImport: ESLint.Plugin &
    Pick<typeof import("eslint-plugin-import-x"), "createNodeResolver" | "importXResolverCompat">;
exports.pluginTypescript = require("@typescript-eslint/eslint-plugin");
exports.pluginReact = require("eslint-plugin-react");
exports.pluginReactHooks = require("eslint-plugin-react-hooks");
exports.pluginVue = require("eslint-plugin-vue");
exports.pluginImport = require("eslint-plugin-import-x");

export declare const parserTypescript: Linter.Parser;
export declare const parserVue: Linter.Parser;
exports.parserTypescript = require("@typescript-eslint/parser");
exports.parserVue = require("vue-eslint-parser");

export declare const globals: typeof import("globals");
exports.globals = require("globals");

export declare const isPackageExists: typeof import("local-pkg").isPackageExists;
exports.isPackageExists = require("local-pkg").isPackageExists;

export declare const findUpSync: typeof import("find-up-simple").findUpSync;
exports.findUpSync = require("find-up-simple").findUpSync;
