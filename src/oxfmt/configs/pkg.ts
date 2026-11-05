import { getEnableOrConfig } from "@/shared/options";

import { defaultOptions } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const pkg = (options: Options): OxfmtConfig => {
    const { enable, config } = getEnableOrConfig("package", options, defaultOptions);
    if (!enable) return { sortPackageJson: false };

    return {
        sortPackageJson: {
            sortScripts: false,
            ...config,
        },
    };
};
