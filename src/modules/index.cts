/* eslint-disable @typescript-eslint/no-require-imports */
import configGitignore from "eslint-config-flat-gitignore";

exports.configGitignore = configGitignore;
exports.configAlloyBase = require("eslint-config-alloy/base");
exports.configAlloyReact = require("eslint-config-alloy/react");
exports.configAlloyTypescript = require("eslint-config-alloy/typescript");
exports.configAlloyVue = require("eslint-config-alloy/vue");

exports.pluginTypescript = require("@typescript-eslint/eslint-plugin");
exports.pluginReact = require("eslint-plugin-react");
exports.pluginReactHooks = require("eslint-plugin-react-hooks");
exports.pluginVue = require("eslint-plugin-vue");
exports.pluginImport = require("eslint-plugin-import-x");
exports.pluginImportResolverOxc = require("eslint-import-resolver-oxc");

exports.parserTypescript = require("@typescript-eslint/parser");
exports.parserVue = require("vue-eslint-parser");

exports.globals = require("globals");
exports.isPackageExists = require("local-pkg").isPackageExists;
