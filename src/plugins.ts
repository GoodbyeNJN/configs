import { isSolidProject } from "./utils";

import type { CommonParams } from "./types";

export const getPlugins = ({ isTsFile }: CommonParams = {}) => {
    const common = ["import"];

    if (isSolidProject) {
        common.push("solid");
    }

    return common;
};
