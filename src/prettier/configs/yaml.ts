import type { Override } from "../types";

export const yaml = (): Override => {
    return {
        files: ["*.yml", "*.yaml"],
        options: {
            tabWidth: 2,
        },
    };
};
