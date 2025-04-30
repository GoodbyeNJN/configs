import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";

import { entryFilesToEntries, external, input, onwarn, output } from "./common";

export default defineConfig([
    {
        input: entryFilesToEntries([input.eslint, input.prettier]),

        output: {
            dir: output,
        },

        external,

        plugins: [dts({ respectExternal: true })],

        onwarn,
    },
]);
