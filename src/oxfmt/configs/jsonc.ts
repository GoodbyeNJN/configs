import { GLOBS_JSONC } from "@/shared/globs";
import { getEnableOrConfig } from "@/shared/options";

import { defaultOptions } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const jsonc = (options: Options): OxfmtConfig => {
    const { enable, config } = getEnableOrConfig("jsonc", options, defaultOptions);
    if (!enable) return {};

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
