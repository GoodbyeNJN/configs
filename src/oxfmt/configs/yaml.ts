import { GLOBS_YAML } from "@/shared/globs";

import { getEnablesByKey, getConfigsByKey } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const yaml = (options: Options): OxfmtConfig => {
    const enable = getEnablesByKey(options, "yaml");
    if (!enable) return {};

    const config = getConfigsByKey(options, "yaml");

    return {
        overrides: [
            {
                files: [...GLOBS_YAML],
                options: {
                    tabWidth: 2,

                    ...config,
                },
            },
        ],
    };
};
