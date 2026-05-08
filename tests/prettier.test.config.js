// @ts-check
import { withConfig } from "@goodbyenjn/configs/prettier";

export default withConfig({
    ignores: ["__fixtures__/**/*.ignored.*", "!__fixtures__/**/*.not.ignored.*", "__snapshots__/"],
});
