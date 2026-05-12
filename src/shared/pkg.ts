import { createRequire } from "node:module";
import { win32 } from "node:path";

const resolve = (path: string) => {
    const platform = process.platform === "win32" ? "win32" : "posix";
    const require = createRequire(import.meta.url);

    try {
        const modPath = require.resolve(path);

        if (platform === "win32") return win32.normalize(modPath);

        return modPath;
    } catch {
        return null;
    }
};

export const isPackageExists = (name: string) => Boolean(resolve(`${name}/package.json`));
