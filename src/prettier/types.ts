import type {
    BuiltInParserName,
    Config as PrettierConfig,
    Options as PrettierOptions,
} from "prettier";

export type { Config as PrettierConfig } from "prettier";

export type ParserName = BuiltInParserName | "ignored";
export type PrettierOverride = Required<NonNullable<PrettierConfig["overrides"]>>[number];

export interface OverrideOptions extends PrettierOptions {
    parser?: ParserName;
}

export interface Override extends PrettierOverride {
    options?: OverrideOptions;
}

export interface Options extends PrettierConfig {
    /**
     * An array of glob patterns indicating the files that the configuration
     * object should not apply to.
     */
    ignores?: string[];
    overrides?: Override[];
}
