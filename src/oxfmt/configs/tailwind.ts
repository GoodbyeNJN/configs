import { getEnableOrConfigOrGetter } from "@/shared/options";

import { defaultOptions } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const tailwind = (options: Options): OxfmtConfig => {
    const { enable, config } = getEnableOrConfigOrGetter("tailwind", options, defaultOptions);
    if (!enable) return { sortTailwindcss: false };

    return {
        sortTailwindcss: {
            ...config,

            functions: ["clsx", "cx", "cn", "cva", "tw", ...(config.functions ?? [])],
        },
    };
};
