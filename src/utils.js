const fs = require("fs");
const path = require("path");

const exists = package =>
    fs.existsSync(path.resolve(process.cwd() || ".", "node_modules", package));

exports.isReactProject = exists("react");
exports.isPreactProject = exists("preact");
exports.isReactLikeProject = exports.isReactProject || exports.isPreactProject;

exports.isTsProject = exists("typescript");
