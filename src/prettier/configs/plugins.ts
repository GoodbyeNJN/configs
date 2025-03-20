import type { Options, PrettierConfig } from "../types";

export const plugins = (options: Options = {}): PrettierConfig => {
    const { plugins = [] } = options;

    return {
        plugins: ["@goodbyenjn/eslint-config/prettier-plugin-ignored", ...plugins],
    };
};
