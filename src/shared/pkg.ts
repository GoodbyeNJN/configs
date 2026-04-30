import { createRequire } from "node:module";
import path, { win32 } from "node:path";

import { exists, existsSync, readJson, readJsonSync } from "@goodbyenjn/utils/fs";
import { findUp, findUpSync } from "find-up-simple";
import { interopDefault, resolvePathSync } from "mlly";

export interface PackageInfo {
    name: string;
    rootPath: string;
    packageJsonPath: string;
    version: string;
    packageJson: PackageJson;
}

export interface PackageResolvingOptions {
    paths?: string[];

    /**
     * @default 'auto'
     * Resolve path as posix or win32
     */
    platform?: "posix" | "win32" | "auto";
}

const resolve = (path: string, options: PackageResolvingOptions = {}) => {
    if (options.platform === "auto" || !options.platform) {
        options.platform = process.platform === "win32" ? "win32" : "posix";
    }

    if (process.versions.pnp) {
        const paths = options.paths ?? [];
        if (paths.length === 0) {
            paths.push(process.cwd());
        }

        const targetRequire = createRequire(import.meta.url);
        try {
            return targetRequire.resolve(path, { paths });
        } catch {}
    }

    const modulePath = resolvePathSync(path, {
        url: options.paths,
    });
    if (options.platform === "win32") return win32.normalize(modulePath);

    return modulePath;
};

const getPackageJsonPath = (name: string, options: PackageResolvingOptions = {}) => {
    const entry = resolvePackage(name, options);
    if (!entry) return;

    return searchPackageJSON(entry);
};

const resolvePackage = (name: string, options: PackageResolvingOptions = {}) => {
    try {
        return resolve(`${name}/package.json`, options);
    } catch {}

    try {
        return resolve(name, options);
    } catch (e) {
        // compatible with nodejs and mlly error
        if (
            e instanceof Error &&
            "code" in e &&
            e.code !== "MODULE_NOT_FOUND" &&
            e.code !== "ERR_MODULE_NOT_FOUND"
        ) {
            console.error(e);
        }

        return false;
    }
};

const searchPackageJSON = (dir: string) => {
    let current = dir;
    while (true) {
        if (!current) return;

        const dir = path.dirname(current);
        if (dir === current) return;

        current = dir;

        const packageJsonPath = path.join(current, "package.json");
        if (existsSync(packageJsonPath)) return packageJsonPath;
    }
};

export const getPackageInfo = async (name: string, options: PackageResolvingOptions = {}) => {
    const packageJsonPath = getPackageJsonPath(name, options);
    if (!packageJsonPath) return;

    const packageJson = await readJson<PackageJson>(packageJsonPath);
    if (packageJson.isNone()) return;

    return {
        name,
        version: packageJson.unwrap().version,
        rootPath: path.dirname(packageJsonPath),
        packageJsonPath,
        packageJson,
    };
};

export const getPackageInfoSync = (name: string, options: PackageResolvingOptions = {}) => {
    const packageJsonPath = getPackageJsonPath(name, options);
    if (!packageJsonPath) return;

    const packageJson = readJsonSync<PackageJson>(packageJsonPath);
    if (packageJson.isNone()) return;

    return {
        name,
        version: packageJson.unwrap().version,
        rootPath: path.dirname(packageJsonPath),
        packageJsonPath,
        packageJson,
    };
};

export const loadPackageJSON = async (cwd = process.cwd()) => {
    const path = await findUp("package.json", { cwd });
    if (!path || !(await exists(path))) return null;

    const packageJson = await readJson<PackageJson>(path);
    if (packageJson.isNone()) return null;

    return packageJson.unwrap();
};

export const loadPackageJSONSync = (cwd = process.cwd()) => {
    const path = findUpSync("package.json", { cwd });
    if (!path || !existsSync(path)) return null;

    const packageJson = readJsonSync<PackageJson>(path);
    if (packageJson.isNone()) return null;

    return packageJson.unwrap();
};

export const isPackageListed = async (name: string, cwd?: string) => {
    const pkg = (await loadPackageJSON(cwd)) ?? {};

    return name in (pkg.dependencies ?? {}) || name in (pkg.devDependencies ?? {});
};

export const isPackageListedSync = (name: string, cwd?: string) => {
    const pkg = loadPackageJSONSync(cwd) ?? {};

    return name in (pkg.dependencies ?? {}) || name in (pkg.devDependencies ?? {});
};

export const resolveModule = (name: string, options: PackageResolvingOptions = {}) => {
    try {
        return resolve(name, options);
    } catch {
        return undefined;
    }
};

export const importModule = async <T = unknown>(path: string): Promise<T> => {
    const i = await import(path);
    if (!i) return i;

    return interopDefault(i);
};

export const isPackageExists = (name: string, options: PackageResolvingOptions = {}) =>
    Boolean(resolvePackage(name, options));
