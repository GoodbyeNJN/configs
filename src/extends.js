const { isReactLikeProject, isTsProject } = require("./utils");

exports.getExtends = ({ isTsFile } = {}) => {
    const common = ["alloy"];

    if (isReactLikeProject) {
        common.push("alloy/react", "plugin:react-hooks/recommended");
    }

    if (isTsProject && isTsFile) {
        common.push("alloy/typescript");
    }

    return common;
};
