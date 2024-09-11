declare module "@typescript-eslint/eslint-plugin" {
    import type { ESLint } from "eslint";

    declare const plugin: ESLint.Plugin;

    export = plugin;
}
