// @ts-check
import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config";

export default [
    {
        ignores: ["tests/*/**/*"],
    },
    ...withGoodbyeNJNConfig(),
];
