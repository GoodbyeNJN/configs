export type BaseOptions = {
    cwd?: string;
};

export type BaseDefaultOptions = {
    cwd: string;
};

export type NormalizedOptions<O extends Record<string, any>> = {
    [K in keyof O]-?: Exclude<O[K], boolean>;
};

export const getEnableOrConfig = <
    K extends PropertyKey,
    O extends { [Key in K]?: boolean | Record<string, any> } & BaseOptions,
    D extends { [Key in K]: boolean } & BaseDefaultOptions,
>(
    key: K,
    options: O,
    defaultOptions: D,
): { enable: boolean; config: NormalizedOptions<O>[K] } => {
    const enableOrConfig = options[key] ?? defaultOptions[key];
    if (enableOrConfig === false) return { enable: false, config: {} as NormalizedOptions<O>[K] };

    const config = enableOrConfig === true ? {} : enableOrConfig;

    return { enable: true, config: config as NormalizedOptions<O>[K] };
};

export const getEnableOrConfigOrGetter = <
    K extends PropertyKey,
    O extends { [Key in K]?: boolean | Record<string, any> } & BaseOptions,
    D extends { [Key in K]: boolean | ((...params: any[]) => boolean) } & BaseDefaultOptions,
>(
    key: K,
    options: O,
    defaultOptions: D,
): { enable: boolean; config: NormalizedOptions<O>[K] } => {
    const enableOrConfigOrGetter = options[key] ?? defaultOptions[key];

    let enable;
    let config;
    if (typeof enableOrConfigOrGetter === "function") {
        const cwd = options.cwd ?? defaultOptions.cwd;
        enable = enableOrConfigOrGetter(cwd);
        config = {};
    } else if (typeof enableOrConfigOrGetter === "object") {
        enable = true;
        config = enableOrConfigOrGetter;
    } else {
        enable = enableOrConfigOrGetter;
        config = {};
    }

    return { enable, config: config as NormalizedOptions<O>[K] };
};
