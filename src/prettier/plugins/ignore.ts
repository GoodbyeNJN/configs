import type { Plugin } from "prettier";

export const PLUGIN_NAME = "ignore";
export const PARSER_NAME = "ignore-parser";
export const AST_NAME = "ignore-ast";

const plugin: Plugin = {
    languages: [
        {
            name: PLUGIN_NAME,
            parsers: [PARSER_NAME],
        },
    ],
    parsers: {
        [PARSER_NAME]: {
            parse: source => source,
            astFormat: AST_NAME,
            locStart: _ => 0,
            locEnd: node => node.length,
        },
    },
    printers: {
        [AST_NAME]: {
            print: path => path.getNode() || "",
        },
    },
};

export default plugin;
