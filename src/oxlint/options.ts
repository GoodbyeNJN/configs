import { isPackageExists } from "@/shared/pkg";

import type { Configs, Option, Options, Rules } from "./types";

const defaultEnables: Required<Options> = {
    javascript: true,
    typescript: isPackageExists("typescript"),
    react: isPackageExists("react") || isPackageExists("preact"),
    import: true,
};

const getOptionByKey = <T extends keyof Options>(options: Options, key: T): false | Option<T> => {
    const option = options[key];

    if (option === undefined) {
        if (key === "javascript" || key === "import") return {};

        return defaultEnables[key as Exclude<T, "javascript" | "import">] && {};
    }

    if (typeof option === "boolean") {
        return option && {};
    }

    return option;
};

export const getConfigsByKey = <T extends keyof Options>(options: Options, key: T): Configs[T] => {
    const option = getOptionByKey(options, key);
    if (!option) return {};

    const { rules, ...configs } = option;

    return configs;
};

export const getRulesByKey = <T extends keyof Options>(options: Options, key: T): Rules[T] => {
    const option = getOptionByKey(options, key);

    return option ? (option.rules ?? {}) : {};
};

export const getEnablesByKey = <T extends keyof Options>(options: Options, key: T): boolean => {
    const option = getOptionByKey(options, key);

    return Boolean(option);
};
