import { getConfigsByKey, getEnablesByKey } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const imports = (options: Options): OxfmtConfig => {
    const enable = getEnablesByKey(options, "import");
    if (!enable) return { sortImports: false };

    const config = getConfigsByKey(options, "import");

    return {
        sortImports: {
            ignoreCase: true,
            newlinesBetween: true,
            order: "asc",
            partitionByComment: false,
            partitionByNewline: false,
            sortSideEffects: true,

            ...config,

            groups: config.groups ?? [
                "builtin",
                "external",
                ["internal", "subpath"],
                ["parent", "sibling", "index"],
                ["style", "side_effect_style"],
                "side_effect",
                "type",
                "unknown",
            ],
        },
    };
};
