import { resolveToRoot } from "./utils";

export const CACHE_PATH = resolveToRoot(".temp");

export const SRC_PATH = resolveToRoot("src");

export const DIST_PATH = resolveToRoot("dist");

export const MODULES_PATH = resolveToRoot("modules");

export const BUNDLED_MODULES_PATH = resolveToRoot("modules/dist");

export const BUNDLED_MODULES_ENTRY = "index.cjs";
