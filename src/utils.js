const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(process.cwd() || ".", "package.json");
const packageJson = fs.readFileSync(packageJsonPath, { encoding: "utf8" });
const { dependencies = {}, devDependencies = {}, peerDependencies = {} } = JSON.parse(packageJson);

const exists = package =>
    Boolean(dependencies[package] || devDependencies[package] || peerDependencies[package]);

exports.isReactProject = exists("react");
exports.isPreactProject = exists("preact");
exports.isReactLikeProject = exports.isReactProject || exports.isPreactProject;

exports.isTsProject = exists("typescript");
