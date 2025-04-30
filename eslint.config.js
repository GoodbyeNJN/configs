// @ts-check
import { withConfig } from "@goodbyenjn/configs/eslint";

export default [
    {
        ignores: ["tests/*/**/*"],
    },
    ...withConfig(),
];
