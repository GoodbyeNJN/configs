import { getConfigsByKey, getEnablesByKey } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const pkg = (options: Options): OxfmtConfig => {
    const enable = getEnablesByKey(options, "package");
    if (!enable) return { sortPackageJson: false };

    const config = getConfigsByKey(options, "package");

    return {
        sortPackageJson: {
            sortScripts: false,
            ...config,
        },
    };
};
