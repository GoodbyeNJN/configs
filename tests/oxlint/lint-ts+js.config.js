// @ts-check

import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig(
    {
        typescript: true,
    },
    {
        ignorePatterns: [
            "__fixtures__/**/*.ignored.*",
            "!__fixtures__/**/*.not.ignored.*",
            "__snapshots__/",
        ],
    },
);
