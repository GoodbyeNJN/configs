import { getExtends } from "./extends";
import { getPlugins } from "./plugins";
import { getRules } from "./rules";

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

export { default as prettier } from "./prettier";

export default {
    ...baseEslintConfig,
    overrides: [tsOverride],
};
