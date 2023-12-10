import module from "node:module";

const dirname = typeof __dirname === "undefined" ? import.meta.url : __dirname;
const require = module.createRequire(dirname);

const exists = (name: string) => {
    try {
        const module = require(name);
        return Boolean(module);
    } catch {
        return false;
    }
};

export const isReactProject = exists("react");
export const isPreactProject = exists("preact");
export const isReactLikeProject = isReactProject || isPreactProject;

export const isSolidProject = exists("solid-js");

export const isTsProject = exists("typescript");
