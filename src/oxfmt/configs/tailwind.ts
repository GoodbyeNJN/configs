import { getConfigsByKey, getEnablesByKey } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const tailwind = (options: Options): OxfmtConfig => {
    const enable = getEnablesByKey(options, "tailwind");
    if (!enable) return { sortTailwindcss: false };

    const config = getConfigsByKey(options, "tailwind");

    return {
        sortTailwindcss: {
            ...config,

            functions: ["clsx", "cx", "cn", "cva", "tw", ...(config.functions ?? [])],
        },
    };
};
