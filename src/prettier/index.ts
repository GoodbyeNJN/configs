import { defaults } from "./configs/defaults";
import { ignores } from "./configs/ignores";
import { jsonc } from "./configs/jsonc";
import { plugins } from "./configs/plugins";
import { yaml } from "./configs/yaml";

import type { Options, PrettierConfig } from "./types";

export type { Options, Overrides } from "./types";

export const withConfig = (options: Options = {}): PrettierConfig => {
    const overrides = options.overrides ?? [];

    return {
        ...defaults(options),

        ...plugins(options),

        overrides: [ignores(options), jsonc(), yaml(), ...overrides],
    };
};

export default withConfig();
