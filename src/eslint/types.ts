import type { EslintRules } from "@/types/eslint-rules";
import type { ImportOrder, ImportRules as ImportXRules } from "@/types/import-rules";
import type { ReactRules } from "@/types/react-rules";
import type { TypeScriptRules } from "@/types/typescript-rules";
import type { Linter } from "eslint";

type OrderOption = ImportOrder extends [] | [infer Item] ? Item : never;

export type ESLintConfig<Rules = Linter.RulesRecord> = Linter.Config<Rules & Linter.RulesRecord>;

export interface Configs {
    // eslint-disable-next-line typescript/no-empty-object-type
    javascript: {};
    typescript: { useTypeLinting?: boolean; tsconfigRootDir?: string };
    react: { useTypescript?: boolean; version?: string };
    import: { order?: OrderOption };
}

export interface Overrides {
    javascript: Partial<EslintRules>;
    typescript: Partial<EslintRules & TypeScriptRules>;
    react: Partial<EslintRules & TypeScriptRules & ReactRules>;
    import: Partial<ImportXRules>;
}

export type Option<T extends keyof Options> = Configs[T] & {
    overrides?: Overrides[T];
};

export interface Options {
    javascript?: boolean | Option<"javascript">;
    typescript?: boolean | Option<"typescript">;
    react?: boolean | Option<"react">;
    import?: boolean | Option<"import">;
}

export interface FullOptions extends Options {
    ignores?: string[];
}
