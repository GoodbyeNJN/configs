const { getExtends } = require("./extends");
const { getPlugins } = require("./plugins");
const { getRules } = require("./rules");

const baseEslintConfig = {
    extends: getExtends(),
    plugins: getPlugins(),
    rules: getRules(),
};

const tsOverride = {
    files: ["**/*.ts", "**/*.tsx"],
    extends: getExtends({ isTsFile: true }),
    plugins: getPlugins({ isTsFile: true }),
    rules: getRules({ isTsFile: true }),
};

module.exports = {
    ...baseEslintConfig,
    overrides: [tsOverride],
};
