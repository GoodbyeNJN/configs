import type { Options } from "./types";

export const parseIgnorePattern = (pattern: string) => {
    const isNegated = pattern.startsWith("!");
    const cleanPattern = isNegated ? pattern.slice(1) : pattern;

    return { isNegated, pattern: cleanPattern };
};

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
