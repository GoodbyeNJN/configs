import { defaults, gitignore, ignores, jsonc, plugins, yaml } from "./configs";
import { parseOverrideOptions } from "./options";

import type { Options, PrettierConfig } from "./types";

export type { Options, Overrides } from "./types";

export const withConfig = (options: Options = {}): PrettierConfig => {
    const overrides = parseOverrideOptions(options);

    return {
        ...defaults(options),

        ...plugins(options),

        overrides: [gitignore(), ignores(options), jsonc(), yaml(), ...overrides],
    };
};
