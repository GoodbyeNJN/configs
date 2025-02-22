import { GLOB_VUE } from "@/globs";
import { configAlloyVue, parserTypescript, parserVue, pluginVue } from "modules/eslint";

import type { ESLintConfig, VueConfig, VueOverride } from "../types";

export const vue = (config: VueConfig, override: VueOverride): ESLintConfig<VueOverride>[] => {
    const { useTypescript } = config;
    const files = [GLOB_VUE];

    return [
        {
            name: "goodbyenjn:vue:common",
            plugins: {
                vue: pluginVue,
            },
        },
        {
            name: "goodbyenjn:vue:rules",
            files,
            languageOptions: {
                parser: parserVue,
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    extraFileExtensions: [".vue"],
                    parser: useTypescript ? parserTypescript : undefined,
                    sourceType: "module",
                },
            },
            rules: {
                ...configAlloyVue.rules,

                // https://github.com/vuejs/eslint-plugin-vue/issues/2356
                "vue/comment-directive": "off",

                ...override,
            },
        },
    ];
};
