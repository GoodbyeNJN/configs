import type { Overrides } from "../types";

export const yaml = (): Overrides => {
    return {
        files: ["*.yml", "*.yaml"],
        options: {
            tabWidth: 2,
        },
    };
};
