import type {
    LanguageOptions as BaseLanguageOptions,
    ParserOptions as BaseParserOptions,
    EslintRules,
    ImportRules,
    LinterOptions,
    Parser,
    ParserModule,
    ReactHooksRules,
    ReactRules,
    RuleConfig,
    TypeScriptRules,
    VueRules,
} from "@antfu/eslint-define-config";
// import unexported types with pnpm patch
import type { OrderOption } from "@antfu/eslint-define-config/rules/import/order";
import type { ESLint, Linter } from "eslint";

export type { EslintRules };

export interface ParserOptions extends Omit<BaseParserOptions, "parser"> {
    parser?: Parser | ParserModule | Record<string, Parser | ParserModule>;
}

export interface LanguageOptions extends Omit<BaseLanguageOptions, "parser" | "parserOptions"> {
    parser?: Parser | ParserModule;
    parserOptions?: ParserOptions;
}

export interface ESLintConfig<Rules = EslintRules> {
    name?: string;
    files?: string[];
    ignores?: string[];
    languageOptions?: LanguageOptions;
    linterOptions?: LinterOptions;
    processor?: string | Linter.Processor;
    plugins?: Record<string, ESLint.Plugin>;
    rules?: Partial<Rules & EslintRules & Record<string, RuleConfig>>;
    settings?: Record<string, any>;
}

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

export type TypeScriptOverride = Partial<TypeScriptRules>;

export type ReactOverride = Partial<ReactRules & ReactHooksRules>;

export type VueOverride = Partial<VueRules>;

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
