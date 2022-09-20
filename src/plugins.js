const { isReactLikeProject, isTsProject } = require("./utils");

exports.getPlugins = ({ isTsFile } = {}) => {
    const common = ["import"];

    return common;
};
