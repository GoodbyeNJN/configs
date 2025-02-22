import type { Options, PrettierConfig } from "../types";

export const plugins = (config: PrettierConfig = {}): Options => {
    const { plugins = [] } = config;

    return {
        plugins: ["@goodbyenjn/eslint-config/prettier-plugin-ignored", ...plugins],
    };
};
