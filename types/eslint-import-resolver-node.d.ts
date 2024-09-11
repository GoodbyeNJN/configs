declare module "eslint-import-resolver-node" {
    import type { Resolver } from "eslint-plugin-import-x/types.d.ts";

    declare const resolver: Resolver;

    export = resolver;
}
