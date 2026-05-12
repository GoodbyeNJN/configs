import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig(
    {},
    {
        ignorePatterns: ["tests/__fixtures__/", "tests/__snapshots__/"],
    },
);
