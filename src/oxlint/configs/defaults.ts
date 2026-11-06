import type { Options } from "../types";
import type { OxlintConfig } from "oxlint";

export const defaults = (options: Options): OxlintConfig => {
    return {
        env: {
            browser: true,
            node: true,
            builtin: true, // latest ECMAScript globals
        },

        options: {
            reportUnusedDisableDirectives: "warn",
        },
    };
};
