import { defaults, gitignore, ignores, plugins, yaml } from "./configs";

import type { PrettierConfig } from "./types";

export const withGoodbyeNJNConfig = (config: PrettierConfig = {}): PrettierConfig => {
    const { overrides = [] } = config;

    return {
        ...defaults(config),

        ...plugins(config),

        overrides: [gitignore(), ignores(), yaml(), ...overrides],
    };
};
