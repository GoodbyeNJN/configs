// @ts-check
import { withGoodbyeNJNConfig } from "eslint-config-goodbyenjn";

export default [
    {
        ignores: ["tests/fixtures/input"],
    },
    ...withGoodbyeNJNConfig(),
];
