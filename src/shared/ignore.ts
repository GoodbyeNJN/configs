import path from "node:path";

import { addSuffix, toForwardSlash } from "@goodbyenjn/utils";
import { readFileSync } from "@goodbyenjn/utils/fs";
import { findUpSync } from "find-up-simple";

const GITIGNORE = ".gitignore";
const GITMODULES = ".gitmodules";

export const toMinimatch = (pattern: string) => {
    let p = pattern;

    // Trim trailing unescaped whitespace char by char (git spec: trailing spaces can be marked by
    // backslash). Each trailing space/tab preceded by an odd number of backslashes is "escaped"
    // (preserved); all others are stripped. Processing right-to-left stops at the first escaped
    // whitespace character so that double-backslash (\\) correctly un-escapes itself.
    while (p.length > 0) {
        const lastChar = p[p.length - 1];
        if (lastChar !== " " && lastChar !== "\t") break;

        let numBackslashes = 0;
        let j = p.length - 2;
        while (j >= 0 && p[j] === "\\") {
            numBackslashes += 1;
            j -= 1;
        }

        if (numBackslashes % 2 === 1) break;

        p = p.slice(0, -1);
    }

    // A blank line matches no files
    if (!p) return null;

    // A line starting with # serves as a comment
    if (p.startsWith("#")) return null;

    // An optional prefix ! which negates the pattern
    const isNegated = p.startsWith("!");
    if (isNegated) {
        p = p.slice(1);
    }

    // Put a backslash in front of the first # or ! for patterns that begin with those characters
    if (p.startsWith("\\#") || p.startsWith("\\!")) {
        p = p.slice(1);
    }

    // If there is a separator at the end of the pattern then the pattern will only match directories
    const isDirectoryOnly = p.endsWith("/");
    if (isDirectoryOnly) {
        p = p.slice(0, -1);
    }

    // If there is a separator at the beginning or middle (or both) of the pattern, then the pattern
    // is relative to the level of the particular .gitignore file itself (anchored).
    // Otherwise the pattern may also match at any level below the .gitignore level.
    const isAnchored = p.includes("/");

    // Remove leading slash so the pattern is relative to root
    if (p.startsWith("/")) {
        p = p.slice(1);
    }

    // If not anchored, add **/ prefix to allow matching at any level
    if (!isAnchored) {
        p = `**/${p}`;
    }

    // If directory-only, add /** suffix to match all contents of the directory
    if (isDirectoryOnly) {
        p = `${p}/**`;
    }

    return isNegated ? `!${p}` : p;
};

export const toRelativeMinimatch = (pattern: string, relativePath: string, cwd: string) => {
    // if in the current directory leave it as is
    if (["", ".", "/"].includes(relativePath)) return pattern;

    const negated = pattern.startsWith("!") ? "!" : "";
    const normalizedPath = addSuffix("/", relativePath);
    const cleanPattern = (negated ? pattern.slice(1) : pattern).trimEnd();

    // child directories need to just add path in start
    const isParent = normalizedPath.startsWith("..");
    if (!isParent) return `${negated}${normalizedPath}${cleanPattern}`;

    // uncle directories don't make sense
    if (!/^(\.\.\/)+$/.exec(normalizedPath)) {
        throw new Error("The ignore file location should be either a parent or child directory");
    }

    // if it has ** depth it may be left as is
    if (cleanPattern.startsWith("**")) return pattern;

    // if pattern doesn't match the parent dirs it should be ignored
    const parents = path.relative(path.resolve(cwd, normalizedPath), cwd).split(/[/\\]/);
    let relativePattern = cleanPattern;
    while (parents.length > 0 && relativePattern.startsWith(`${parents[0]}/`)) {
        relativePattern = relativePattern.slice(parents[0]!.length + 1).trimEnd();
        parents.shift();
    }

    // if it has ** depth it may be left as is
    if (relativePattern.startsWith("**")) {
        return `${negated}${relativePattern}`;
    }

    // if all parents are out, it's clean
    if (parents.length === 0) return `${negated}${relativePattern}`;

    // otherwise it doesn't matches the current folder
    return null;
};

export const getGitignoreFilepath = (cwd = process.cwd()) => findUpSync(GITIGNORE, { cwd });

export const getGitmodulesFilepath = (cwd = process.cwd()) => findUpSync(GITMODULES, { cwd });

export const getPatternsFromGitignore = (
    cwd = process.cwd(),
    gitignore = getGitignoreFilepath(cwd),
): string[] => {
    if (!gitignore) return [];

    const content = readFileSync(gitignore);
    if (content.isNone()) return [];

    const relativePath = toForwardSlash(path.relative(cwd, path.dirname(gitignore)));
    const patterns = content
        .unwrap()
        .split(/\r?\n/u)
        // .filter(line => line.length > 0 && !line.startsWith("#"))
        .map(line => toMinimatch(line))
        .filter(pattern => pattern !== null)
        .map(pattern => toRelativeMinimatch(pattern, relativePath, cwd))
        .filter(pattern => pattern !== null);

    return patterns;
};

export const getPatternsFromGitmodules = (
    cwd = process.cwd(),
    gitmodules = getGitmodulesFilepath(cwd),
): string[] => {
    if (!gitmodules) return [];

    const content = readFileSync(gitmodules);
    if (content.isNone()) return [];

    const patterns = content
        .unwrap()
        .split(/\r?\n/u)
        .map(line => /path\s*=\s*(.+)/u.exec(line))
        .filter(match => match !== null)
        .map(match => match[1]!.trim())
        .map(dir => `${dir}/**`);

    return patterns;
};

export const getPatternsFromGlobs = (globs: string[]) =>
    globs.map(glob => toMinimatch(glob)).filter(pattern => pattern !== null);

export const separateNegatedPatterns = (patterns: string[]) => {
    const normal: string[] = [];
    const negated: string[] = [];
    for (const pattern of patterns) {
        if (pattern.startsWith("!")) {
            negated.push(pattern.slice(1));
        } else {
            normal.push(pattern);
        }
    }

    return { normal, negated };
};
