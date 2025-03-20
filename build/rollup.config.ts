import { pick } from "remeda";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";

import { external, input, output } from "./common";

import type { LogHandlerWithDefault } from "rollup";

const IGNORED_WARNING_CODES = ["UNRESOLVED_IMPORT", "CIRCULAR_DEPENDENCY"];

const onLog: LogHandlerWithDefault = (level, log, handler) => {
    if (level === "warn" && IGNORED_WARNING_CODES.includes(log.code || "")) return;

    handler(level, log);
};

export default defineConfig([
    {
        input: pick(input, ["index", "prettier"]),

        output: {
            dir: output.types,
        },

        external,

        plugins: [dts({ respectExternal: true })],

        onLog,
    },
]);
