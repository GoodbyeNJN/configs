import type { CommonParams } from "./types";

export const getPlugins = ({ isTsFile }: CommonParams = {}) => {
    const common = ["import"];

    return common;
};
