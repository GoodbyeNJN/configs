import { GLOBS_JSONC } from "@/shared/globs";

import { getConfigsByKey, getEnablesByKey } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const jsonc = (options: Options): OxfmtConfig => {
    const enable = getEnablesByKey(options, "jsonc");
    if (!enable) return {};

    const config = getConfigsByKey(options, "jsonc");

    return {
        overrides: [
            {
                files: [...GLOBS_JSONC],
                options: {
                    trailingComma: "none",

                    ...config,
                },
            },
        ],
    };
};
