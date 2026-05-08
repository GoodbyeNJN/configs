// @ts-check
import { withConfig } from "@goodbyenjn/configs/eslint";

export default withConfig({
    ignores: ["__mocks__/", "tests/__fixtures__/", "tests/__snapshots__/", "types/generated/"],
});
