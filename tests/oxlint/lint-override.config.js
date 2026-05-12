// @ts-check

import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig(
    {
        javascript: {
            rules: {
                "no-unused-vars": "off",
            },
        },
        typescript: false,
    },
    {
        ignorePatterns: [
            "__fixtures__/**/*.ignored.*",
            "!__fixtures__/**/*.not.ignored.*",
            "__snapshots__/",
        ],
    },
);
