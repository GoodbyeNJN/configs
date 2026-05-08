import path from "node:path";

import { unindent } from "@goodbyenjn/utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getPatternsFromGitignore, getPatternsFromGitmodules } from "@/shared/ignore";

import { vol } from "./memfs";

vi.mock("node:fs");
vi.mock("node:fs/promises");

const cwd = "/app";
const gitignorePath = path.join(cwd, ".gitignore");
const gitmodulesPath = path.join(cwd, ".gitmodules");

describe("getPatternsFromGitignore", () => {
    beforeEach(() => {
        vol.reset();
    });

    test("not found", () => {
        const result = getPatternsFromGitignore(cwd);
        expect(result).toEqual([]);
    });

    test("basic patterns", () => {
        vol.fromJSON({
            [gitignorePath]: unindent`
                node_modules
                dist
                build
            `,
        });
        const result = getPatternsFromGitignore(cwd, gitignorePath);

        expect(result.length).toBeGreaterThan(0);
        expect(result).toContain("**/node_modules");
        expect(result).toContain("**/dist");
    });

    test("skip comments", () => {
        vol.fromJSON({
            [gitignorePath]: unindent`
                # This is a comment
                node_modules

                # Another comment
                dist
            `,
        });
        const result = getPatternsFromGitignore(cwd, gitignorePath);

        expect(result.length).toBe(2);
        expect(result).toContain("**/node_modules");
        expect(result).toContain("**/dist");
    });

    test("negation", () => {
        vol.fromJSON({
            [gitignorePath]: unindent`
                node_modules
                !node_modules/lib
            `,
        });
        const result = getPatternsFromGitignore(cwd, gitignorePath);

        expect(result.some(p => p.startsWith("!"))).toBe(true);
    });

    test("line endings", () => {
        vol.fromJSON({
            [gitignorePath]: "node_modules\r\ndist\r\nbuild\r\n",
        });
        const result = getPatternsFromGitignore(cwd, gitignorePath);

        expect(result.length).toBeGreaterThan(0);
    });

    test("whitespace", () => {
        vol.fromJSON({
            [gitignorePath]: unindent`
                node_modules
                dist\t
            `,
        });
        const result = getPatternsFromGitignore(cwd, gitignorePath);

        expect(result.length).toBeGreaterThan(0);
    });
});

describe("getPatternsFromGitmodules", () => {
    beforeEach(() => {
        vol.reset();
    });

    test("not found", () => {
        const result = getPatternsFromGitmodules(cwd);
        expect(result).toEqual([]);
    });

    test("parse paths", () => {
        vol.fromJSON({
            [gitmodulesPath]: unindent`
                [submodule "lib/utils"]
                    path = lib/utils
                    url = https://github.com/user/utils.git
                [submodule "lib/core"]
                    path = lib/core
                    url = https://github.com/user/core.git
            `,
        });
        const result = getPatternsFromGitmodules(cwd, gitmodulesPath);

        expect(result).toContain("lib/utils/**");
        expect(result).toContain("lib/core/**");
    });

    test("single", () => {
        vol.fromJSON({
            [gitmodulesPath]: unindent`
                [submodule "vendor/package"]
                    path = vendor/package
            `,
        });
        const result = getPatternsFromGitmodules(cwd, gitmodulesPath);

        expect(result).toEqual(["vendor/package/**"]);
    });

    test("with spaces", () => {
        vol.fromJSON({
            [gitmodulesPath]: unindent`
                [submodule "lib/my package"]
                    path = lib/my package
            `,
        });
        const result = getPatternsFromGitmodules(cwd, gitmodulesPath);

        expect(result).toContain("lib/my package/**");
    });

    test("ignore no path", () => {
        vol.fromJSON({
            [gitmodulesPath]: unindent`
                [submodule "lib/utils"]
                    url = https://github.com/user/utils.git
                [submodule "lib/core"]
                    path = lib/core
            `,
        });
        const result = getPatternsFromGitmodules(cwd, gitmodulesPath);

        expect(result).toEqual(["lib/core/**"]);
    });
});
