import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { GITIGNORE, GITMODULES } from "@/globs";

import type { OverrideConfig } from "../types";

interface Options {
    cwd?: URL | string;
    type?: "file" | "directory";
    stopAt?: URL | string;
}

const findUpSync = (name: string, options?: Options) => {
    const { cwd = process.cwd(), type = "file", stopAt } = options || {};

    let directory = path.resolve(toPath(cwd) ?? "");
    const { root } = path.parse(directory);
    const stop = path.resolve(directory, toPath(stopAt) ?? root);
    const isAbsoluteName = path.isAbsolute(name);

    while (directory) {
        const filePath = isAbsoluteName ? name : path.join(directory, name);

        try {
            const stats = fs.statSync(filePath, { throwIfNoEntry: false });
            if (
                (type === "file" && stats?.isFile()) ||
                (type === "directory" && stats?.isDirectory())
            ) {
                return filePath;
            }
        } catch {}

        if (directory === stop || directory === root) {
            break;
        }

        directory = path.dirname(directory);
    }

    return;
};

const toPath = (urlOrPath?: URL | string) =>
    urlOrPath instanceof URL ? url.fileURLToPath(urlOrPath) : urlOrPath;

const toRelativePattern = (pattern: string, relativePath: string, cwd: string) => {
    const negated = pattern.startsWith("!") ? "!" : "";
    const normalizedPath = relativePath.endsWith("/") ? relativePath : `${relativePath}/`;
    let cleanPattern = negated ? pattern.slice(1) : pattern;

    // if gitignore is in the current directory leave it as is
    if (["", ".", "/"].includes(normalizedPath)) return pattern;

    // child directories need to just add path in start
    if (!normalizedPath.startsWith("..")) {
        return `${negated}${normalizedPath}${cleanPattern}`;
    }

    // uncle directories don't make sense
    if (!normalizedPath.match(/^(\.\.\/)+$/)) {
        throw new Error("The ignore file location should be either a parent or child directory");
    }

    // if it has ** depth it may be left as is
    if (cleanPattern.startsWith("**")) {
        return pattern;
    }

    // if glob doesn't match the parent dirs it should be ignored
    const parents = path.relative(path.resolve(cwd, normalizedPath), cwd).split(/[/\\]/);

    while (parents.length && cleanPattern.startsWith(`${parents[0]}/`)) {
        cleanPattern = cleanPattern.slice(parents[0]!.length + 1);
        parents.shift();
    }

    // if it has ** depth it may be left as is
    if (cleanPattern.startsWith("**")) {
        return `${negated}${cleanPattern}`;
    }

    // if all parents are out, it's clean
    if (parents.length === 0) {
        return `${negated}${cleanPattern}`;
    }

    // otherwise it doesn't matches the current folder
    return null;
};

export const gitignore = (): OverrideConfig => {
    const cwd = process.cwd();

    const ignores: string[] = [];

    const gitignore = findUpSync(GITIGNORE, { cwd });
    const gitmodules = findUpSync(GITMODULES, { cwd });

    if (gitignore) {
        let content = "";
        try {
            content = fs.readFileSync(gitignore, "utf8");
        } catch {}

        const relativePath = path.relative(cwd, path.dirname(gitignore)).replaceAll("\\", "/");
        const patterns = content
            .split(/\r?\n/u)
            .filter(line => line && !line.startsWith("#"))
            .map(pattern => toRelativePattern(pattern, relativePath, cwd))
            .filter(x => x !== null);

        ignores.push(...patterns);
    }

    if (gitmodules) {
        let content = "";
        try {
            content = fs.readFileSync(gitmodules, "utf8");
        } catch {}

        const patterns = content
            .split(/\r?\n/u)
            .map(line => line.match(/path\s*=\s*(.+)/u))
            .filter(match => match !== null)
            .map(match => match![1]!.trim())
            .map(dir => `${dir}/**`);

        ignores.push(...patterns);
    }

    return {
        files: ignores,
        options: {
            parser: "ignored",
        },
    };
};
