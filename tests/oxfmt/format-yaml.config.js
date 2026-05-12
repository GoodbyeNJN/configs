// @ts-check

import { withConfig } from "@goodbyenjn/configs/oxfmt";

export default withConfig(undefined, {
    ignorePatterns: [
        "__fixtures__/**/*.ignored.*",
        "!__fixtures__/**/*.not.ignored.*",
        "__snapshots__/",
    ],
});
