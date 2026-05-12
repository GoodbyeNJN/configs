import { getEnablesByKey, getRulesByKey } from "../options";

import type { Options } from "../types";
import type { OxlintConfig } from "oxlint";

export const imports = (options: Options): OxlintConfig => {
    const enable = getEnablesByKey(options, "import");
    if (!enable) return {};

    const rules = getRulesByKey(options, "import");

    return {
        plugins: ["import"],
        rules: {
            // recommended rules in ImportX but not enabled by default in Oxlint

            // override recommended rules in Oxlint

            // extra rules by user preference
            "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
            "import/first": "error",
            "import/no-duplicates": "error",
            "import/no-mutable-exports": "error",
            "import/no-named-default": "error",
            "import/no-self-import": "error",
            "import/no-webpack-loader-syntax": "error",

            ...rules,
        },
    };
};
