import { isReactLikeProject, isSolidProject, isTsProject } from "./utils";

import type { CommonParams } from "./types";

export const getExtends = ({ isTsFile }: CommonParams = {}) => {
    const common = ["alloy"];

    if (isReactLikeProject) {
        common.push("alloy/react", "plugin:react-hooks/recommended");
    }

    if (isSolidProject) {
        if (isTsProject && isTsFile) {
            common.push("plugin:solid/typescript");
        } else {
            common.push("plugin:solid/recommended");
        }
    }

    if (isTsProject && isTsFile) {
        common.push("alloy/typescript");
    }

    return common;
};
