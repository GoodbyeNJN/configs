import { getEnablesByKey, getConfigsByKey } from "../options";

import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const jsdoc = (options: Options): OxfmtConfig => {
    const enable = getEnablesByKey(options, "jsdoc");
    if (!enable) return { jsdoc: false };

    const config = getConfigsByKey(options, "jsdoc");

    return {
        jsdoc: {
            // 添加默认值到描述中
            addDefaultToDescription: true,
            // 不添加空格到类型的大括号内
            bracketSpacing: false,
            // 描述首字母大写
            capitalizeDescriptions: true,
            // 尽可能使用单行注释
            commentLineStrategy: "singleLine",
            // 不使用 @description 标签
            descriptionTag: false,
            // 不在描述末尾添加句号
            descriptionWithDot: false,
            // 不保留无法解析的 @example 缩进
            keepUnparsableExampleIndent: false,
            // 如果所有行都满足打印宽度限制，则保留换行符
            lineWrappingStyle: "balance",
            // 对于没有语言标记的代码块，使用 ``` 替代 4 空格缩进
            preferCodeFences: true,
            // 不在最后一个 @param 和 @returns 标签之间添加空行
            separateReturnsFromParam: false,
            // 不在不同标签组之间添加空行
            separateTagGroups: false,

            ...config,
        },
    };
};
