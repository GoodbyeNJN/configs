// @ts-check
import oxlint from "eslint-plugin-oxlint";

import { withConfig } from "@goodbyenjn/configs/eslint";

export default [
    {
        ignores: ["tests/*/**/*"],
    },
    ...withConfig(),
    // ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
];
