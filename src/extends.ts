import { isReactLikeProject, isTsProject } from "./utils";

import type { CommonParams } from "./types";

export const getExtends = ({ isTsFile }: CommonParams = {}) => {
    const common = ["alloy"];

    if (isReactLikeProject) {
        common.push("alloy/react", "plugin:react-hooks/recommended");
    }

    if (isTsProject && isTsFile) {
        common.push("alloy/typescript");
    }

    return common;
};
