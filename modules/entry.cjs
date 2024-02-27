const pluginTypescript = require("@typescript-eslint/eslint-plugin");
const parserTypescript = require("@typescript-eslint/parser");
const configAlloyBase = require("eslint-config-alloy/base");
const configAlloyReact = require("eslint-config-alloy/react");
const configAlloyTypescript = require("eslint-config-alloy/typescript");
const configAlloyVue = require("eslint-config-alloy/vue");
const configGitignore = require("eslint-config-flat-gitignore");
const pluginImport = require("eslint-plugin-i");
const pluginReact = require("eslint-plugin-react");
const pluginReactHooks = require("eslint-plugin-react-hooks");
const pluginVue = require("eslint-plugin-vue");
const globals = require("globals");
const localPkg = require("local-pkg");
const parserVue = require("vue-eslint-parser");

module.exports = {
    pluginTypescript,
    parserTypescript,
    configAlloy: {
        base: configAlloyBase,
        typescript: configAlloyTypescript,
        react: configAlloyReact,
        vue: configAlloyVue,
    },
    configGitignore,
    pluginImport,
    pluginReact,
    pluginReactHooks,
    pluginVue,
    globals,
    localPkg,
    parserVue,
};
