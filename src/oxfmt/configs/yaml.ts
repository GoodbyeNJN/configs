import { GLOBS_YAML } from "@/shared/globs";
import { getEnableOrConfig } from "@/shared/options";

import { defaultOptions } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const yaml = (options: Options): OxfmtConfig => {
    const { enable, config } = getEnableOrConfig("yaml", options, defaultOptions);
    if (!enable) return {};

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
