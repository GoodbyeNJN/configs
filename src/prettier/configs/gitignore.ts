import fs from "node:fs";
import path from "node:path";

import { GITIGNORE, GITMODULES } from "@/shared/globs";
import { findUpSync } from "@/shared/modules";

import { parseIgnorePattern } from "../options";

import type { Overrides } from "../types";

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

export const gitignore = (): Overrides => {
    const cwd = process.cwd();

    const includes: string[] = [];
    const excludes: string[] = [];

    const gitignore = findUpSync(GITIGNORE, { cwd });
    const gitmodules = findUpSync(GITMODULES, { cwd });

    if (gitignore) {
        let content = "";
        try {
            content = fs.readFileSync(gitignore, "utf8");
        } catch {}

        const relativePath = path.relative(cwd, path.dirname(gitignore)).replaceAll("\\", "/");
        for (const line of content.split(/\r?\n/u)) {
            if (!line || line.startsWith("#")) continue;

            const { isNegated, pattern } = parseIgnorePattern(line);
            const relativePattern = toRelativePattern(pattern, relativePath, cwd);
            if (!relativePattern) continue;

            if (isNegated) {
                excludes.push(relativePattern);
            } else {
                includes.push(relativePattern);
            }
        }
    }

    if (gitmodules) {
        let content = "";
        try {
            content = fs.readFileSync(gitmodules, "utf8");
        } catch {}

        for (const line of content.split(/\r?\n/u)) {
            const match = line.match(/path\s*=\s*(.+)/u);
            if (!match) continue;

            const dir = match[1]!.trim();
            includes.push(`${dir}/**`);
        }
    }

    return {
        files: includes,
        excludeFiles: excludes,
        options: {
            parser: "ignore-parser",
        },
    };
};
