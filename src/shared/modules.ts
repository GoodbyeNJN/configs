import { configs as eslintConfigs } from "@eslint/js";
import {
    createNodeResolver,
    meta as importXMeta,
    rules as importXRules,
} from "eslint-plugin-import-x";

import type { ESLint, Linter } from "eslint";

export const loadEslint = () => {
    const rules: Linter.RulesRecord = eslintConfigs.recommended.rules;

    return { rules };
};

export const loadImportX = () => {
    const plugin: ESLint.Plugin = {
        meta: importXMeta,
        rules: importXRules as unknown as ESLint.Plugin["rules"],
    };

    return { plugin, createNodeResolver };
};

export const loadTypescript = async () => {
    const [{ meta, rules: _rules }, { flatConfigs, parser: _parser }] = await Promise.all([
        import("@typescript-eslint/eslint-plugin"),
        import("@typescript-eslint/eslint-plugin/use-at-your-own-risk/raw-plugin"),
    ]);

    const plugin: ESLint.Plugin = {
        meta,
        rules: _rules as unknown as ESLint.Plugin["rules"],
    };
    const rules = {
        recommendEslint: flatConfigs["flat/eslint-recommended"].rules as Linter.RulesRecord,
        recommend: flatConfigs["flat/recommended"][2]!.rules as Linter.RulesRecord,
        recommendTyped: flatConfigs["flat/recommended-type-checked-only"][2]!
            .rules as Linter.RulesRecord,
    };
    const parser = _parser as unknown as Linter.Parser;

    return { plugin, rules, parser };
};

export const loadReact = async () => {
    const {
        default: { meta, rules: _rules, configs },
    } = await import("@eslint-react/eslint-plugin");

    const plugin: ESLint.Plugin = {
        meta,
        rules: _rules,
    };
    const rules = {
        recommend: configs.recommended.rules as Linter.RulesRecord,
        recommendTyped: configs["recommended-type-checked"].rules as Linter.RulesRecord,
    };
    const { settings } = configs.recommended;

    return { plugin, rules, settings };
};
