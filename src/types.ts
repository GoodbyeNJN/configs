import type {
    EslintRules,
    ImportRules,
    OrderOption,
    ParserOptions,
    ReactHooksRules,
    ReactRules,
    TypeScriptRules,
    VueRules,
} from "@antfu/eslint-define-config";
import type { Linter } from "eslint";

export type { EslintRules };

export type ESLintConfig<Rules extends Linter.RulesRecord = Linter.RulesRecord> =
    Linter.Config<Rules>;

export interface JavaScriptConfig {}

export interface TypeScriptConfig {
    useVue?: boolean;
    tsconfigPath?: string;
    parserOptions?: ParserOptions;
}

export interface ReactConfig {
    useTypescript?: boolean;
    version?: string;
}

export interface VueConfig {
    useTypescript?: boolean;
}

export interface ImportsConfig {
    order?: OrderOption;
}

export interface Configs {
    javascript: JavaScriptConfig;
    typescript: TypeScriptConfig;
    react: ReactConfig;
    vue: VueConfig;
    imports: ImportsConfig;
}

export type JavaScriptOverride = Partial<EslintRules>;

export type TypeScriptOverride = Partial<EslintRules & TypeScriptRules>;

export type ReactOverride = Partial<EslintRules & TypeScriptRules & ReactRules & ReactHooksRules>;

export type VueOverride = Partial<EslintRules & TypeScriptRules & VueRules>;

export type ImportsOverride = Partial<ImportRules>;

export interface Overrides {
    javascript: JavaScriptOverride;
    typescript: TypeScriptOverride;
    react: ReactOverride;
    vue: VueOverride;
    imports: ImportsOverride;
}

export interface Enables {
    typescript: boolean;
    react: boolean;
    vue: boolean;
    imports: boolean;
}

export type Option<T extends keyof Options> = Configs[T] & { overrides?: Overrides[T] };

export interface Options {
    javascript?: Option<"javascript">;
    typescript?: Enables["typescript"] | Option<"typescript">;
    react?: Enables["react"] | Option<"react">;
    vue?: Enables["vue"] | Option<"vue">;
    imports?: Option<"imports">;
}
