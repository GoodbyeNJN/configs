import type { Linter } from "eslint";

export const mapRuleNamespace = (rules: Linter.RulesRecord, from: string, to: string) =>
    Object.fromEntries<Linter.RulesRecord>(
        Object.entries(rules as Record<string, Linter.RulesRecord[string]>).map(([key, value]) =>
            key.startsWith(`${from}/`) ? [key.replace(from, to), value] : [key, value],
        ),
    );
