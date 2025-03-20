import type { Override } from "../types";

export const jsonc = (): Override => {
    return {
        files: ["*.jsonc", "*.cjson"],
        options: {
            trailingComma: "none",
        },
    };
};
