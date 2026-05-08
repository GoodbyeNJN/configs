import micromatch from "micromatch";
import { minimatch } from "minimatch";
import { expect, test } from "vitest";

import { toRelativeMinimatch } from "@/shared/ignore";

const cases = [
    // -------------------------------------------------------------------------
    // Current directory — pattern returned unchanged
    // -------------------------------------------------------------------------
    {
        description: "empty relativePath returns pattern as-is",
        pattern: "**/node_modules",
        relativePath: "",
        cwd: "/project",
        expected: "**/node_modules",
    },
    {
        description: "dot relativePath returns pattern as-is",
        pattern: "dist/**",
        relativePath: ".",
        cwd: "/project",
        expected: "dist/**",
    },
    {
        description: "slash relativePath returns pattern as-is",
        pattern: "**/dist",
        relativePath: "/",
        cwd: "/project",
        expected: "**/dist",
    },

    // -------------------------------------------------------------------------
    // Child directories — path is prepended to the pattern
    // -------------------------------------------------------------------------
    {
        description: "single-level child directory prepends path to the pattern",
        pattern: "**/node_modules",
        relativePath: "packages",
        cwd: "/project",
        expected: "packages/**/node_modules",
        paths: {
            "packages/node_modules": true,
            "packages/a/node_modules": true,
            node_modules: false,
            "a/node_modules": false,
        },
    },
    {
        description: "multi-level child directory prepends the full path",
        pattern: "dist/**",
        relativePath: "packages/foo",
        cwd: "/project",
        expected: "packages/foo/dist/**",
        paths: {
            "packages/foo/dist/index.js": true,
            "packages/foo/dist/a/b.js": true,
            "packages/bar/dist/index.js": false,
            "dist/index.js": false,
        },
    },
    {
        description: "non-globstar pattern in child directory has path prepended",
        pattern: "build",
        relativePath: "apps/web",
        cwd: "/project",
        expected: "apps/web/build",
        paths: {
            "apps/web/build": true,
            "apps/api/build": false,
            build: false,
        },
    },
    {
        description: "negated pattern in child directory preserves the negation prefix",
        pattern: "!**/dist",
        relativePath: "src",
        cwd: "/project",
        expected: "!src/**/dist",
    },
    {
        description: "negated anchored pattern in child directory preserves the negation prefix",
        pattern: "!dist/**",
        relativePath: "packages/foo",
        cwd: "/project",
        expected: "!packages/foo/dist/**",
    },

    // -------------------------------------------------------------------------
    // Parent directories — ** patterns returned unchanged
    // -------------------------------------------------------------------------
    {
        description: "** pattern from single-level parent gitignore is returned unchanged",
        pattern: "**/node_modules",
        relativePath: "..",
        cwd: "/project/packages",
        expected: "**/node_modules",
    },
    {
        description: "** pattern from two-level parent gitignore is returned unchanged",
        pattern: "**/build",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        expected: "**/build",
    },
    {
        description: "negated ** pattern from parent gitignore is returned unchanged",
        pattern: "!**/node_modules",
        relativePath: "..",
        cwd: "/project/packages",
        expected: "!**/node_modules",
    },

    // -------------------------------------------------------------------------
    // Parent directories — anchored patterns stripped to cwd-relative form
    // -------------------------------------------------------------------------
    {
        description: "single-level parent: matching anchored pattern is stripped to relative form",
        pattern: "packages/dist/**",
        relativePath: "..",
        cwd: "/project/packages",
        expected: "dist/**",
        paths: {
            "dist/bundle.js": true,
            "dist/a/b.js": true,
            "packages/dist/bundle.js": false,
        },
    },
    {
        description: "single-level parent: non-matching anchored pattern returns null",
        pattern: "other/dist/**",
        relativePath: "..",
        cwd: "/project/packages",
        expected: null,
    },
    {
        description: "two-level parent: full matching prefix is stripped",
        pattern: "packages/foo/build/**",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        expected: "build/**",
        paths: {
            "build/index.js": true,
            "build/a/b.js": true,
            "packages/foo/build/index.js": false,
        },
    },
    {
        description: "two-level parent: only first segment matches, returns null",
        pattern: "packages/bar/build/**",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        expected: null,
    },
    {
        description: "two-level parent: unrelated top-level pattern returns null",
        pattern: "dist/**",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        expected: null,
    },
    {
        description:
            "negated matching anchored pattern from parent: negation is preserved after stripping",
        pattern: "!packages/foo/dist/**",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        expected: "!dist/**",
    },
    {
        description: "negated non-matching anchored pattern from parent returns null",
        pattern: "!packages/bar/dist/**",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        expected: null,
    },

    // -------------------------------------------------------------------------
    // Parent directories — mid-pattern ** causes early return after stripping
    // -------------------------------------------------------------------------
    {
        description:
            "parent pattern with ** after the first segment: stripping yields a ** pattern",
        pattern: "packages/**/dist",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        // "packages/" is stripped → "**/dist" which starts with ** → returned as-is
        expected: "**/dist",
    },
    {
        description:
            "parent pattern with full path prefix then **: full prefix stripped to ** pattern",
        pattern: "packages/foo/**/dist",
        relativePath: "../..",
        cwd: "/project/packages/foo",
        // "packages/" stripped → "foo/**/dist", then "foo/" stripped → "**/dist"
        expected: "**/dist",
    },

    // -------------------------------------------------------------------------
    // Uncle directories — invalid relative paths throw an error
    // -------------------------------------------------------------------------
    {
        description: "uncle directory (../sibling) throws an error",
        pattern: "**/foo",
        relativePath: "../sibling",
        cwd: "/project/child",
        expected: null,
        throws: true,
    },
    {
        description: "mixed uncle path (../../a/b) throws an error",
        pattern: "**/foo",
        relativePath: "../../a/b",
        cwd: "/project/x/y",
        expected: null,
        throws: true,
    },
];

test.for(cases)("$description", ({ pattern, relativePath, cwd, expected, throws, paths }) => {
    if (throws) {
        expect(() => toRelativeMinimatch(pattern, relativePath, cwd)).toThrow();
        return;
    }

    const result = toRelativeMinimatch(pattern, relativePath, cwd);
    expect(result).toBe(expected);

    if (result === null || result.startsWith("!") || !paths) return;

    for (const [filePath, shouldMatch] of Object.entries(paths)) {
        expect(
            minimatch(filePath, result, { dot: true }),
            `minimatch("${filePath}", "${result}")`,
        ).toBe(shouldMatch);

        expect(
            micromatch.isMatch(filePath, result, { dot: true, strictSlashes: true }),
            `micromatch.isMatch("${filePath}", "${result}")`,
        ).toBe(shouldMatch);
    }
});
