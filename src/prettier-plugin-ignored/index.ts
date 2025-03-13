import type { Parser, Printer, SupportLanguage } from "prettier";

const PLUGIN_NAME = "ignored";
const PARSER_NAME = "ignored-parser";
const AST_NAME = "ignored-ast";

export const languages: SupportLanguage[] = [
    {
        name: PLUGIN_NAME,
        parsers: [PARSER_NAME],
    },
];

export const parsers: Record<string, Parser<string>> = {
    ignored: {
        parse: source => source,
        astFormat: AST_NAME,
        locStart: _ => 0,
        locEnd: node => node.length,
    },
};

export const printers: Record<string, Printer<string>> = {
    [AST_NAME]: {
        print: path => path.getNode() || "",
    },
};
