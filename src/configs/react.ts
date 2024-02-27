import { configAlloy, pluginReact, pluginReactHooks } from "bundled-modules";

import { GLOB_JSX, GLOB_TSX } from "../globs";

import type { ESLintConfig, ReactConfig, ReactOverride } from "../types";

export const react = (
    config: ReactConfig,
    override: ReactOverride,
): ESLintConfig<ReactOverride>[] => {
    const { useTypescript, version = "detect" } = config;
    const files = [GLOB_JSX, GLOB_TSX];

    return [
        {
            name: "goodbyenjn:react:common",
            plugins: {
                react: pluginReact,
                "react-hooks": pluginReactHooks,
            },
            settings: {
                react: { version },
            },
        },
        {
            name: "goodbyenjn:react:rules",
            files,
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
            rules: {
                ...configAlloy.react.rules,
                ...(useTypescript ? { "react/jsx-no-undef": "off" } : {}),
                ...override,
            },
        },
    ];
};
