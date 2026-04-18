import { gitignore, ignores, imports, javascript, react, typescript } from "./configs";
import { parseOptions } from "./options";

import type { ESLintConfig, Options } from "./types";

export type { Configs, Options, Overrides } from "./types";

export const withConfig = (options: Options = {}) => {
    const { configs, overrides, enables } = parseOptions(options);

    const eslintConfigs: ESLintConfig[][] = [
        gitignore(),
        ignores(),
        javascript(configs.javascript, overrides.javascript),
        imports(configs.imports, overrides.imports),
    ];

    if (enables.typescript) {
        configs.react.useTypescript = true;
    }

    if (enables.typescript) {
        eslintConfigs.push(typescript(configs.typescript, overrides.typescript));
    }

    if (enables.react) {
        eslintConfigs.push(react(configs.react, overrides.react));
    }

    return eslintConfigs.flat();
};
