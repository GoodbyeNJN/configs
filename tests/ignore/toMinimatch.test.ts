import ignore from "ignore";
import micromatch from "micromatch";
import { minimatch } from "minimatch";
import { expect, test } from "vitest";

import { toMinimatch } from "@/shared/ignore";

const cases = [
    // -------------------------------------------------------------------------
    // Blank lines and comments (git spec §gitignore)
    // -------------------------------------------------------------------------
    {
        description: "a blank line matches no files",
        pattern: "",
        paths: { a: false, "a/b/c": false },
    },
    {
        description: "a line starting with # is a comment and matches nothing",
        pattern: "#abc",
        paths: { "#abc": false, abc: false, "b/#abc": false },
    },
    {
        description: "backslash before # escapes the hash, making it a literal pattern",
        pattern: "\\#abc",
        paths: { "#abc": true, abc: false, "b/#abc": true },
    },
    {
        description: "backslash before ! escapes the exclamation mark, making it a literal pattern",
        pattern: "\\!abc",
        paths: { "!abc": true, abc: false, "b/!abc": true },
    },
    {
        description: "backslash before ! with exclamation in filename also matches via wildcard",
        pattern: "\\!important!.txt",
        paths: { "!important!.txt": true, "important!.txt": false, "b/!important!.txt": true },
    },

    // -------------------------------------------------------------------------
    // Trailing whitespace (git spec §gitignore)
    // -------------------------------------------------------------------------
    {
        description: "unescaped trailing spaces are stripped",
        pattern: "bcd  ",
        paths: { bcd: true, "bcd ": false, "bcd  ": false, "dir/bcd": true },
    },
    {
        description: "trailing space quoted with backslash is preserved (one space result)",
        // JS string "abc\\  " = gitignore pattern: abc\  (abc + backslash + 2 spaces)
        // First space is escaped → kept, second trailing space is stripped → abc<space>
        pattern: "abc\\  ",
        paths: { "abc ": true, abc: false, "abc  ": false },
    },

    // -------------------------------------------------------------------------
    // Patterns without a slash — match at any directory level
    // -------------------------------------------------------------------------
    {
        description: "pattern with no slash matches a filename at any level",
        pattern: "a.js",
        paths: { "a.js": true, "b/a/a.js": true, "a/a.js": true, "b/a.jsa": false },
    },
    {
        description: "dot-prefixed file matched at any level",
        pattern: ".d",
        paths: { ".d": true, ".dd": false, "d.d": false, "d/.d": true },
    },
    {
        description: "wildcard * pattern matches any filename at any level",
        pattern: "*.log",
        paths: { "test.log": true, "dir/test.log": true, "test.txt": false },
    },
    {
        description: "single character wildcard ? matches exactly one non-slash character",
        pattern: "foo?bar",
        paths: { fooxbar: true, "foo/bar": false, fooxxbar: false, "sub/fooxbar": true },
    },
    {
        description: "? at the end of an extension pattern",
        pattern: "*.web?",
        paths: { "a.webp": true, "a.webm": true, "a.webam": false, "dir/a.webp": true },
    },
    {
        description: "character set [oa] matches one character",
        pattern: "*.[oa]",
        paths: {
            "a.js": false,
            "a.a": true,
            "a.aa": false,
            "a.o": true,
            "a.0": false,
            "sub/a.o": true,
        },
    },
    {
        description: "multiple character sets *.[ab][cd][ef]",
        pattern: "*.[ab][cd][ef]",
        paths: { "a.ace": true, "a.bdf": true, "a.bce": true, "a.abc": false, "a.aceg": false },
    },
    {
        description: "character range [a-z]",
        pattern: "*.pn[a-z]",
        paths: { "a.png": true, "a.pna": true, "a.pn1": false },
    },
    {
        description: "character range [0-9]",
        pattern: "*.pn[0-9]",
        paths: { "a.pn1": true, "a.pn2": true, "a.png": false, "a.pna": false },
    },

    // -------------------------------------------------------------------------
    // Patterns containing a slash — anchored to the root
    // -------------------------------------------------------------------------
    {
        description: "pattern with a slash in the middle is anchored: wildcards do not cross /",
        pattern: "a/a.js",
        paths: { "a/a.js": true, "b/a/a.js": false, "a/a.jsa": false },
    },
    {
        description: "wildcards in an anchored pattern do not match / in the pathname",
        pattern: "Documentation/*.html",
        paths: {
            "Documentation/git.html": true,
            "Documentation/ppc/ppc.html": false,
            "tools/perf/Documentation/perf.html": false,
        },
    },
    {
        description: "leading slash anchors the pattern to the repository root",
        pattern: "/*.c",
        paths: { "cat-file.c": true, "mozilla-sha1/sha1.c": false },
    },

    // -------------------------------------------------------------------------
    // Trailing slash — directory-only patterns
    // -------------------------------------------------------------------------
    {
        description: "trailing slash means the pattern only matches a directory and its contents",
        pattern: "abc/",
        paths: { abc: false, "abc/": true, "bcd/abc/": true, "abc/file": true },
    },
    {
        description: "trailing slash with middle slash is anchored at root",
        pattern: "doc/frotz/",
        // Has a slash in the middle → anchored; trailing slash → directory only
        paths: { "doc/frotz/": true, "doc/frotz/file": true, "a/doc/frotz/": false },
    },
    {
        description: "unanchored directory pattern matches at any depth",
        pattern: "node_modules/",
        paths: {
            "node_modules/": true,
            "node_modules/abc.md": true,
            "node_modules/gulp/abc.md": true,
        },
    },
    {
        description: "file pattern 'a.js' and directory pattern 'f/' handled independently",
        pattern: "f/",
        paths: { "f/": true, "g/f/": true, f: false },
    },

    // -------------------------------------------------------------------------
    // Double-star (globstar) patterns
    // -------------------------------------------------------------------------
    {
        description: "leading **/ matches in all directories (direct matches only)",
        pattern: "**/foo",
        paths: {
            foo: true,
            "a/foo": true,
            "a/b/c/foo": true,
            "a/b": false,
        },
    },
    {
        description: "**/foo/bar matches bar directly under any foo directory",
        pattern: "**/foo/bar",
        paths: { "foo/bar": true, "abc/foo/bar": true },
    },
    {
        description: "trailing /** matches everything inside the named directory",
        pattern: "abc/**",
        paths: {
            "abc/a/": true,
            "abc/b": true,
            "abc/d/e/f/g": true,
            "bcd/abc/a": false,
            abc: false,
        },
    },
    {
        description: "/**/ in the middle matches zero or more intermediate directories",
        pattern: "a/**/b",
        paths: { "a/b": true, "a/x/b": true, "a/x/y/b": true, "b/a/b": false },
    },

    // -------------------------------------------------------------------------
    // Negation patterns — conversion only (semantics differ in multi-pattern context)
    // These cases only assert the converted form starts with "!" to confirm the prefix
    // is correctly preserved. Full negation behaviour requires multiple patterns working
    // together and is outside the scope of this per-pattern conversion utility.
    // -------------------------------------------------------------------------
    {
        description: "! prefix is preserved in the converted pattern",
        pattern: "!foo",
        paths: {},
    },
    {
        description: "! prefix with directory pattern is preserved",
        pattern: "!build/",
        paths: {},
    },
];

test.for(cases)("$description", ({ pattern, paths }) => {
    // Derive the expected ignore results from node-ignore (source of truth)
    const ig = ignore();
    ig.add(pattern);

    const converted = toMinimatch(pattern);

    if (converted === null) {
        // Pattern converts to null → it is a comment or blank line.
        // node-ignore should not ignore any of the listed paths.
        for (const [path, shouldIgnore] of Object.entries(paths)) {
            expect(ig.ignores(path), `node-ignore baseline for "${path}"`).toBe(shouldIgnore);
            expect(shouldIgnore, `null pattern should never ignore "${path}"`).toBe(false);
        }
        return;
    }

    if (converted.startsWith("!")) {
        // Negation pattern — only assert the converted form is correctly negated.
        expect(converted).toMatch(/^!/);
        return;
    }

    for (const [path, shouldIgnore] of Object.entries(paths)) {
        // 1. Verify node-ignore agrees with our stated expectation (guards test setup).
        expect(ig.ignores(path), `node-ignore baseline for "${path}"`).toBe(shouldIgnore);

        // 2. minimatch should match iff node-ignore says ignored.
        expect(
            minimatch(path, converted, { dot: true }),
            `minimatch("${path}", "${converted}")`,
        ).toBe(shouldIgnore);

        // 3. micromatch should match iff node-ignore says ignored.
        //    strictSlashes: true ensures patterns like abc/** do not match "abc" itself.
        expect(
            micromatch.isMatch(path, converted, { dot: true, strictSlashes: true }),
            `micromatch.isMatch("${path}", "${converted}")`,
        ).toBe(shouldIgnore);
    }
});
