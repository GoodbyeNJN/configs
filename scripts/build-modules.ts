import crypto from "node:crypto";
import { existsSync } from "node:fs";

import ncc from "@vercel/ncc";

import { BUNDLED_MODULES_ENTRY, BUNDLED_MODULES_PATH, CACHE_PATH, MODULES_PATH } from "./constants";
import { cp, readFile, resolve, resolveToRoot, rm, writeFile } from "./utils";

const nccCache = resolve(CACHE_PATH, "ncc");
const moduleCache = resolve(CACHE_PATH, "module");
const entry = resolve(MODULES_PATH, "entry.cjs");

const getMetaInfo = async () => {
    const pkg = await readFile(resolveToRoot("package.json"));
    const { dependencies, devDependencies } = JSON.parse(pkg);
    const files = { entry: await readFile(entry) };

    const meta = { hash: "", cache: "", dependencies, devDependencies, files };
    meta.hash = crypto
        .createHash("shake256", { outputLength: 8 })
        .update(JSON.stringify(meta))
        .digest("hex");
    meta.cache = resolve(moduleCache, meta.hash);

    return meta;
};

const getCache = async () => {
    const { cache } = await getMetaInfo();
    return existsSync(cache) && cache;
};

const setCache = async (data: string) => {
    const { cache } = await getMetaInfo();
    await writeFile(cache, data);

    return cache;
};

const bundle = async (cache: string) => {
    const dist = BUNDLED_MODULES_PATH;

    await rm(dist);
    await cp(cache, resolve(dist, "modules.cjs"));
    await cp(resolve(MODULES_PATH, BUNDLED_MODULES_ENTRY), resolve(dist, BUNDLED_MODULES_ENTRY));
};

const main = async () => {
    let cache = await getCache();

    if (!cache) {
        const { code } = await ncc(entry, {
            externals: ["eslint", "prettier", "typescript"],
            cache: nccCache,
            minify: true,
        });
        cache = await setCache(code);
    }

    await bundle(cache);
};

main();
