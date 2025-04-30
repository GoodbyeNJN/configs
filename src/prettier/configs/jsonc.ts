import type { Overrides } from "../types";

export const jsonc = (): Overrides => {
    return {
        files: ["*.jsonc", "*.cjson"],
        options: {
            trailingComma: "none",
        },
    };
};
