import type {
    FormatConfig,
    JsdocConfig,
    SortImportsConfig,
    SortPackageJsonConfig,
    SortTailwindcssConfig,
} from "oxfmt";

export interface Configs {
    import: SortImportsConfig;
    jsdoc: JsdocConfig;
    package: SortPackageJsonConfig;
    tailwind: SortTailwindcssConfig;
    jsonc: FormatConfig;
    yaml: FormatConfig;
}

export interface Options {
    import?: boolean | Configs["import"];
    jsdoc?: boolean | Configs["jsdoc"];
    package?: boolean | Configs["package"];
    tailwind?: boolean | Configs["tailwind"];
    jsonc?: boolean | Configs["jsonc"];
    yaml?: boolean | Configs["yaml"];
}
