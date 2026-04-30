import { ignores } from "./configs/ignores";
import { importx } from "./configs/importx";
import { javascript } from "./configs/javascript";
import { react } from "./configs/react";
import { typescript } from "./configs/typescript";
import { getEnablesByKey } from "./options";

import type { ESLintConfig, FullOptions as Options } from "./types";

export type { Configs, FullOptions as Options, Overrides } from "./types";

export const withConfig = async (options: Options = {}) => {
    const enableTypescript = getEnablesByKey(options, "typescript");
    const enableReact = getEnablesByKey(options, "react");

    const eslintConfigs: ESLintConfig[][] = [
        ignores(options),
        javascript(options),
        importx(options),
        enableTypescript ? await typescript(options) : [],
        enableReact ? await react(options, enableTypescript) : [],
    ];

    return eslintConfigs.flat();
};
