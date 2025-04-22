// @ts-check
import { withGoodbyeNJNConfig } from "@goodbyenjn/eslint-config/prettier";

export default withGoodbyeNJNConfig({
    ignores: ["*/*.ignored.*", "snapshots/**/*"],
});
