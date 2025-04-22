import type { Options } from "./types";

export const parseDefaultOptions = (options: Options) => {
    const { ignores: _, plugins: __, overrides: ___, ...rest } = options;

    return rest;
};

export const parsePluginOptions = (options: Options) => {
    const { plugins = [] } = options;

    return plugins;
};

export const parseIgnoreOptions = (options: Options) => {
    const { ignores = [] } = options;

    return ignores;
};

export const parseOverrideOptions = (options: Options) => {
    const { overrides = [] } = options;

    return overrides;
};
