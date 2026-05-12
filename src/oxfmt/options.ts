import { isPackageExists } from "@/shared/pkg";

import type { Configs, Options } from "./types";

const defaultEnables: Required<Options> = {
    import: true,
    jsdoc: true,
    package: true,
    tailwind: isPackageExists("tailwindcss"),
    jsonc: true,
    yaml: true,
};

const getOptionByKey = <T extends keyof Options>(options: Options, key: T): false | Configs[T] => {
    const option = options[key];

    if (option === undefined) {
        if (key === "import") return {};

        return defaultEnables[key as Exclude<T, "import">] && {};
    }

    if (typeof option === "boolean") {
        return option && {};
    }

    return option as Configs[T];
};

export const getConfigsByKey = <T extends keyof Options>(options: Options, key: T): Configs[T] => {
    const option = getOptionByKey(options, key);
    if (!option) return {};

    return option;
};

export const getEnablesByKey = <T extends keyof Options>(options: Options, key: T): boolean => {
    const option = getOptionByKey(options, key);

    return Boolean(option);
};
