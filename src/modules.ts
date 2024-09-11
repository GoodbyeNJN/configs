import pluginTypescript from "@typescript-eslint/eslint-plugin";
import parserTypescript from "@typescript-eslint/parser";
import configAlloyBase from "eslint-config-alloy/base";
import configAlloyReact from "eslint-config-alloy/react";
import configAlloyTypescript from "eslint-config-alloy/typescript";
import configAlloyVue from "eslint-config-alloy/vue";
import configGitignore from "eslint-config-flat-gitignore";
import pluginImportResolverNode from "eslint-import-resolver-node";
import * as pluginImportResolverTypescript from "eslint-import-resolver-typescript";
import pluginImport from "eslint-plugin-import-x";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import * as localPkg from "local-pkg";
import parserVue from "vue-eslint-parser";

export {
    pluginTypescript,
    parserTypescript,
    configAlloyBase,
    configAlloyReact,
    configAlloyTypescript,
    configAlloyVue,
    configGitignore,
    pluginImportResolverNode,
    pluginImportResolverTypescript,
    pluginImport,
    pluginReact,
    pluginReactHooks,
    pluginVue,
    globals,
    localPkg,
    parserVue,
};
