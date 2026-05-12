import { withConfig } from "@goodbyenjn/configs/oxfmt";

export default withConfig(
    {},
    {
        ignorePatterns: ["tests/__fixtures__/", "tests/__snapshots__/"],
    },
);
