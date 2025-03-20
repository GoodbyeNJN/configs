import { defaults, gitignore, ignores, plugins, yaml } from "./configs";

import type { Options, PrettierConfig } from "./types";

export type { Options, Override } from "./types";

export const withGoodbyeNJNConfig = (options: Options = {}): PrettierConfig => {
    const { overrides = [] } = options;

    return {
        ...defaults(options),

        ...plugins(options),

        overrides: [gitignore(), ignores(options), yaml(), ...overrides],
    };
};
