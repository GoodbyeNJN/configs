import { isPackageExists } from "@/shared/pkg";

import type { Configs, Option, Options, Overrides } from "./types";

const defaultEnables: Options = {
    javascript: true,
    typescript: isPackageExists("typescript"),
    react: isPackageExists("react") || isPackageExists("preact"),
    import: true,
};

const getOptionByKey = <T extends keyof Options>(options: Options, key: T): false | Option<T> => {
    const option = options[key];

    if (typeof option === "undefined") {
        if (key === "javascript") return {};

        return defaultEnables[key as Exclude<T, "javascript">] && {};
    }

    if (typeof option === "boolean") {
        return option && {};
    }

    return option;
};

export const getConfigsByKey = <T extends keyof Options>(options: Options, key: T): Configs[T] => {
    const option = getOptionByKey(options, key);
    if (!option) return {};

    const { overrides, ...configs } = option;

    return configs;
};

export const getOverridesByKey = <T extends keyof Options>(
    options: Options,
    key: T,
): Overrides[T] => {
    const option = getOptionByKey(options, key);

    return option ? (option.overrides ?? {}) : {};
};

export const getEnablesByKey = <T extends keyof Options>(options: Options, key: T): boolean => {
    const option = getOptionByKey(options, key);

    return Boolean(option);
};
