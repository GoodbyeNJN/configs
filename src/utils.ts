import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.resolve(process.cwd() || ".", "package.json");
const packageJson = fs.readFileSync(packageJsonPath, { encoding: "utf8" });
const { dependencies = {}, devDependencies = {}, peerDependencies = {} } = JSON.parse(packageJson);

const exists = (name: string) =>
    Boolean(dependencies[name] || devDependencies[name] || peerDependencies[name]);

export const isReactProject = exists("react");
export const isPreactProject = exists("preact");
export const isReactLikeProject = isReactProject || isPreactProject;

export const isSolidProject = exists("solid-js");

export const isTsProject = exists("typescript");
