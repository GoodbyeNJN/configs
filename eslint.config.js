// @ts-check
import { withConfig } from "@goodbyenjn/configs/eslint";

export default withConfig({
    ignores: [
        "libs/",
        "__mocks__/",
        "tests/__fixtures__/",
        "tests/__snapshots__/",
        "types/generated/",
    ],
});
