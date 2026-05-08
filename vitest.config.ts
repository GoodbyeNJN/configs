import tsconfigs from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        tsconfigs({
            projectDiscovery: "lazy",
        }),
    ],
    test: {
        testTimeout: 10000,
        server: {
            deps: {
                inline: ["@goodbyenjn/utils"],
            },
        },
    },
});
