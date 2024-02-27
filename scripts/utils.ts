import fs from "node:fs";
import path from "node:path";
import url from "node:url";

export const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : import.meta.dirname ?? path.dirname(url.fileURLToPath(import.meta.url));

export const root = path.resolve(dirname, "..");

export const { resolve } = path;

export const resolveToRoot = (...paths: string[]) => resolve(root, ...paths);

export const readFile = async (filepath: string) => {
    if (!fs.existsSync(filepath)) return "";

    let data = "";
    try {
        data = await fs.promises.readFile(filepath, "utf-8");
    } catch {}

    return data;
};

export const writeFile = async (filepath: string, data: any) => {
    const dirpath = path.dirname(filepath);
    if (!fs.existsSync(dirpath)) {
        await mkdir(dirpath);
    }

    let stringify = "";
    switch (typeof data) {
        case "string":
            stringify = data;
            break;
        case "object":
            stringify = JSON.stringify(data, null, 2);
            break;
        default:
            stringify = data.toString();
            break;
    }

    await fs.promises.writeFile(filepath, stringify);
};

export const mkdir = async (dirpath: string) => {
    if (fs.existsSync(dirpath)) return;

    try {
        await fs.promises.mkdir(dirpath, { recursive: true });
    } catch {}
};

export const cp = async (from: string, to: string) => {
    const dirpath = path.dirname(to);
    if (!fs.existsSync(dirpath)) {
        await mkdir(dirpath);
    }

    await fs.promises.cp(from, to, { recursive: true, force: true });
};

export const rm = async (filepath: string) => {
    if (!fs.existsSync(filepath)) return;

    await fs.promises.rm(filepath, { recursive: true, force: true });
};
