// @ts-check
import { withConfig } from "@goodbyenjn/configs/prettier";

export default withConfig({
    ignores: ["*/*.ignored.*", "!*/*.not.ignored.*", "snapshots/**/*"],
});
