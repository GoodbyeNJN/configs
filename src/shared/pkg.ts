import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { win32, resolve as pathResolve } from "node:path";

const resolve = (path: string, cwd: string) => {
    const platform = process.platform === "win32" ? "win32" : "posix";
    const require = createRequire(pathResolve(cwd, "package.json"));

    try {
        const modPath = require.resolve(path);

        if (platform === "win32") return win32.normalize(modPath);

        return modPath;
    } catch {
        return null;
    }
};

export const getPackageVersion = (name: string, cwd: string) => {
    const path = resolve(`${name}/package.json`, cwd);
    if (!path) return null;

    try {
        const content = readFileSync(path, "utf-8");
        const packageJson = JSON.parse(content);

        return packageJson?.version ?? null;
    } catch {
        return null;
    }
};

export const isPackageExists = (name: string, cwd: string) =>
    Boolean(resolve(`${name}/package.json`, cwd));
