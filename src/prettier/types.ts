import type { PARSER_NAME } from "./plugins/ignore";
import type {
    BuiltInParserName,
    Config as PrettierConfig,
    Options as PrettierOptions,
} from "prettier";

export type { Config as PrettierConfig } from "prettier";

export type ParserName = BuiltInParserName | typeof PARSER_NAME;
export type PrettierOverride = Required<NonNullable<PrettierConfig["overrides"]>>[number];

export interface OverrideOptions extends PrettierOptions {
    parser?: ParserName;
}

export interface Overrides extends PrettierOverride {
    options?: OverrideOptions;
}

export interface Options extends PrettierConfig {
    /**
     * An array of glob patterns indicating the files that the configuration
     * object should not apply to.
     */
    ignores?: string[];
    overrides?: Overrides[];
}
