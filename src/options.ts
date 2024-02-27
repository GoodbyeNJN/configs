import { localPkg } from "bundled-modules";

import type { Configs, Enables, Option, Options, Overrides } from "./types";

const { isPackageExists } = localPkg;

export const defaultEnables: Enables = {
    typescript: isPackageExists("typescript"),
    react: isPackageExists("react") || isPackageExists("preact"),
    vue: isPackageExists("vue") || isPackageExists("nuxt") || isPackageExists("vitepress"),
    imports: true,
};

export const getOptionByKey = <T extends keyof Options>(
    options: Options,
    key: T,
): false | Option<T> => {
    const option = options[key];

    if (typeof option === "undefined") {
        if (key === "javascript") {
            return {};
        }

        const nonJavascriptKey = key as Exclude<T, "javascript">;
        return defaultEnables[nonJavascriptKey] && {};
    }

    if (typeof option === "boolean") {
        return option && {};
    }

    return option as Option<T>;
};

export const getConfigsByKey = <T extends keyof Options>(options: Options, key: T): Configs[T] => {
    const option = getOptionByKey(options, key);
    if (!option) {
        return {};
    }

    const { overrides: _, ...configs } = option;
    return configs;
};

export const getOverridesByKey = <T extends keyof Options>(
    options: Options,
    key: T,
): Overrides[T] => {
    const option = getOptionByKey(options, key);
    return option ? option.overrides || {} : {};
};

export const getEnablesByKey = <T extends keyof Enables>(options: Options, key: T): Enables[T] => {
    const option = getOptionByKey(options, key);
    return Boolean(option);
};

export const parseOptions = (options: Options) => {
    const configs: Configs = {
        javascript: getConfigsByKey(options, "javascript"),
        typescript: getConfigsByKey(options, "typescript"),
        react: getConfigsByKey(options, "react"),
        vue: getConfigsByKey(options, "vue"),
        imports: getConfigsByKey(options, "imports"),
    };
    const overrides: Overrides = {
        javascript: getOverridesByKey(options, "javascript"),
        typescript: getOverridesByKey(options, "typescript"),
        react: getOverridesByKey(options, "react"),
        vue: getOverridesByKey(options, "vue"),
        imports: getOverridesByKey(options, "imports"),
    };
    const enables: Enables = {
        typescript: getEnablesByKey(options, "typescript"),
        react: getEnablesByKey(options, "react"),
        vue: getEnablesByKey(options, "vue"),
        imports: getEnablesByKey(options, "imports"),
    };

    return { configs, overrides, enables };
};
