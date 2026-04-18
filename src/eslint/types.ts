import type {
    EslintRules,
    ImportRules,
    OrderOption,
    ParserOptions,
    ReactHooksRules,
    ReactRules,
    TypeScriptRules,
} from "@antfu/eslint-define-config";
import type { Linter } from "eslint";

export type { EslintRules };

export type ESLintConfig<Rules = {}> = Linter.Config<Rules & Linter.RulesRecord>;

export interface JavaScriptConfig {}

export interface TypeScriptConfig {
    parserOptions?: ParserOptions;
}

export interface ReactConfig {
    useTypescript?: boolean;
    version?: string;
}

export interface ImportsConfig {
    order?: OrderOption;
}

export interface Configs {
    javascript: JavaScriptConfig;
    typescript: TypeScriptConfig;
    react: ReactConfig;
    imports: ImportsConfig;
}

export type JavaScriptOverride = Partial<EslintRules>;

export type TypeScriptOverride = Partial<EslintRules & TypeScriptRules>;

export type ReactOverride = Partial<EslintRules & TypeScriptRules & ReactRules & ReactHooksRules>;

export type ImportsOverride = Partial<ImportRules>;

export interface Overrides {
    javascript: JavaScriptOverride;
    typescript: TypeScriptOverride;
    react: ReactOverride;
    imports: ImportsOverride;
}

export interface Enables {
    typescript: boolean;
    react: boolean;
    imports: boolean;
}

export type Option<T extends keyof Options> = Configs[T] & { overrides?: Overrides[T] };

export interface Options {
    javascript?: Option<"javascript">;
    typescript?: Enables["typescript"] | Option<"typescript">;
    react?: Enables["react"] | Option<"react">;
    imports?: Option<"imports">;
}
