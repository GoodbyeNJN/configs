import { defaults } from "./configs/defaults";
import { imports } from "./configs/imports";
import { javascript } from "./configs/javascript";
import { react } from "./configs/react";
import { typescript } from "./configs/typescript";

import type { Options } from "./types";
import type { OxlintConfig } from "oxlint";

export type { Options, OxlintConfig };

export const withConfig = (options: Options = {}, config: OxlintConfig = {}): OxlintConfig => {
    const defaultsConfig = defaults(options);
    const javascriptConfig = javascript(options);
    const typescriptConfig = typescript(options);
    const reactConfig = react(options);
    const importsConfig = imports(options);

    return {
        ...config,

        env: {
            ...defaultsConfig.env,
            ...config.env,
        },
        plugins: [
            ...(javascriptConfig.plugins ?? []),
            ...(typescriptConfig.plugins ?? []),
            ...(reactConfig.plugins ?? []),
            ...(importsConfig.plugins ?? []),
            ...(defaultsConfig.plugins ?? []),
            ...(config.plugins ?? []),
        ],
        options: {
            ...(javascriptConfig.options ?? {}),
            ...(typescriptConfig.options ?? {}),
            ...(reactConfig.options ?? {}),
            ...(importsConfig.options ?? {}),
            ...(defaultsConfig.options ?? {}),
            ...(config.options ?? {}),
        },
        settings: {
            ...(javascriptConfig.settings ?? {}),
            ...(typescriptConfig.settings ?? {}),
            ...(reactConfig.settings ?? {}),
            ...(importsConfig.settings ?? {}),
            ...(defaultsConfig.settings ?? {}),
            ...(config.settings ?? {}),
        },
        rules: {
            ...(javascriptConfig.rules ?? {}),
            ...(typescriptConfig.rules ?? {}),
            ...(reactConfig.rules ?? {}),
            ...(importsConfig.rules ?? {}),
            ...(defaultsConfig.rules ?? {}),
            ...(config.rules ?? {}),
        },
        overrides: [
            ...(javascriptConfig.overrides ?? []),
            ...(typescriptConfig.overrides ?? []),
            ...(reactConfig.overrides ?? []),
            ...(importsConfig.overrides ?? []),
            ...(defaultsConfig.overrides ?? []),
            ...(config.overrides ?? []),
        ],
    };
};
