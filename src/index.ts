import { gitignore, ignores, imports, javascript, react, typescript, vue } from "./configs";
import { parseOptions } from "./options";

import type { ESLintConfig, Options } from "./types";

export const withGoodbyeNJNConfig = (options: Options = {}) => {
    const { configs, overrides, enables } = parseOptions(options);

    const eslintConfigs: ESLintConfig[][] = [
        gitignore(),
        ignores(),
        javascript(configs.javascript, overrides.javascript),
        imports(configs.imports, overrides.imports),
    ];

    const fileExtensions: string[] = [];
    if (enables.typescript) {
        configs.react.useTypescript = true;
        configs.vue.useTypescript = true;
    }
    if (enables.vue) {
        fileExtensions.push("vue");
        configs.typescript.useVue = true;
    }

    if (enables.typescript) {
        eslintConfigs.push(typescript(configs.typescript, overrides.typescript));
    }

    if (enables.react) {
        eslintConfigs.push(react(configs.react, overrides.react));
    }

    if (enables.vue) {
        eslintConfigs.push(vue(configs.vue, overrides.vue));
    }

    return eslintConfigs.flat();
};
