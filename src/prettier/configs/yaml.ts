import type { OverrideConfig } from "../types";

export const yaml = (): OverrideConfig => {
    return {
        files: ["*.yml", "*.yaml"],
        options: {
            tabWidth: 2,
        },
    };
};
