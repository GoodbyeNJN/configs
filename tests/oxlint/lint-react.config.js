// @ts-check

import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig(
    {
        typescript: false,
        react: { version: "18" },
    },
    {
        ignorePatterns: [
            "__fixtures__/**/*.ignored.*",
            "!__fixtures__/**/*.not.ignored.*",
            "__snapshots__/",
        ],
    },
);
