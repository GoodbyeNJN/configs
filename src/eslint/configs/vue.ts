import { GLOB_VUE } from "@/shared/globs";
import { configAlloyVue, parserTypescript, parserVue, pluginVue } from "@/shared/modules";

import type { ESLintConfig, VueConfig, VueOverride } from "../types";

const {
    "vue/component-tags-order": ComponentTagsOrderRuleConfig,
    "vue/no-ref-object-destructure": NoRefObjectDestructureRuleConfig,
    "vue/no-setup-props-destructure": NoSetupPropsDestructureRuleConfig,
    ...configAlloyVueRules
} = configAlloyVue.rules;

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
                ...configAlloyVueRules,
                "vue/block-order": ComponentTagsOrderRuleConfig,
                "vue/no-ref-object-reactivity-loss": NoRefObjectDestructureRuleConfig,
                "vue/no-setup-props-reactivity-loss": NoSetupPropsDestructureRuleConfig,

                // https://github.com/vuejs/eslint-plugin-vue/issues/2356
                "vue/comment-directive": "off",

                ...override,
            },
        },
    ];
};
