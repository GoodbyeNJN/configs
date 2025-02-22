import type { Config as PrettierConfig } from "prettier";

export type { Config as PrettierConfig, Options } from "prettier";

export type OverrideConfig = Required<NonNullable<PrettierConfig["overrides"]>>[number];
