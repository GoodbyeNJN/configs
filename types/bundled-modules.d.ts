interface Resolver {
    interfaceVersion?: 1 | 2;
    resolve: (...params: any[]) => any;
    resolveImport: (...params: any[]) => any;
}

declare module "bundled-modules" {
    import parserTypescript from "@typescript-eslint/parser";
    import configGitignore from "eslint-config-flat-gitignore";
    import globals from "globals";
    import localPkg from "local-pkg";
    import parserVue from "vue-eslint-parser";

    import type { ESLintConfig } from "@antfu/eslint-define-config";
    import type { ESLint } from "eslint";

    declare const configAlloy: {
        base: ESLintConfig;
        typescript: ESLintConfig;
        react: ESLintConfig;
        vue: ESLintConfig;
    };

    declare const pluginTypescript: ESLint.Plugin;
    declare const pluginImport: ESLint.Plugin;
    declare const pluginReact: ESLint.Plugin;
    declare const pluginReactHooks: ESLint.Plugin;
    declare const pluginVue: ESLint.Plugin;

    declare const pluginImportResolverNode: Resolver;
    declare const pluginImportResolverTypescript: Resolver;

    export {
        parserTypescript,
        parserVue,
        configAlloy,
        configGitignore,
        pluginTypescript,
        pluginImport,
        pluginReact,
        pluginReactHooks,
        pluginVue,
        pluginImportResolverNode,
        pluginImportResolverTypescript,
        globals,
        localPkg,
    };
}
