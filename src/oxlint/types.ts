import type { DummyRuleMap } from "oxlint";

export interface Configs {
    // eslint-disable-next-line typescript/no-empty-object-type
    javascript: {};
    typescript: { useTypeLinting?: boolean };
    react: { useTypescript?: boolean; version?: string };
    // eslint-disable-next-line typescript/no-empty-object-type
    import: {};
}

export interface Rules {
    javascript: DummyRuleMap;
    typescript: DummyRuleMap;
    react: DummyRuleMap;
    import: DummyRuleMap;
}

export type Option<T extends keyof Options> = Configs[T] & {
    rules?: Rules[T];
};

export interface Options {
    javascript?: boolean | Option<"javascript">;
    typescript?: boolean | Option<"typescript">;
    react?: boolean | Option<"react">;
    import?: boolean | Option<"import">;
}
