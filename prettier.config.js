// @ts-check
import { withConfig } from "@goodbyenjn/configs/prettier";

export default withConfig({
    ignores: ["tests/__fixtures__/", "tests/__snapshots__/", "types/generated/"],
});
