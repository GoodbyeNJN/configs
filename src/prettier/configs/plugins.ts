import { parsePluginOptions } from "../options";

import type { Options, PrettierConfig } from "../types";

const BUILT_IN_PLUGINS = import.meta.env.PRETTIER_PLUGINS.map(
    plugin => new URL(plugin, import.meta.url).pathname,
);

export const plugins = (options: Options = {}): PrettierConfig => {
    const plugins = parsePluginOptions(options);

    return {
        plugins: [...BUILT_IN_PLUGINS, ...plugins],
    };
};
