import fs from "node:fs";

import json from "./time.json";

const times = json
    .map(
        ({
            stats: {
                times: { passes },
            },
        }) => ({
            parse: passes[0]!.parse.total,
            total: passes[0]!.total,
        }),
    )
    .map(({ parse, total }) => ({
        parse,
        rules: total - parse,
        total,
    }))
    .map(({ parse, rules, total }) => ({
        parse,
        rules,
        total,
        parsePercent: Number(((parse / total) * 100).toFixed(2)),
        rulesPercent: Number(((rules / total) * 100).toFixed(2)),
    }));

fs.writeFileSync("./times.json", JSON.stringify(times, null, 2));

// import json from "./times.json";

// const parse = json.map(({ parsePercent }) => parsePercent);
// const rules = json.map(({ rulesPercent }) => rulesPercent);

// const parseAvg = Number((parse.reduce((a, b) => a + b, 0) / parse.length).toFixed(2));
// const rulesAvg = Number((rules.reduce((a, b) => a + b, 0) / rules.length).toFixed(2));

// const parseMax = Math.max(...parse);
// const rulesMax = Math.max(...rules);

// const parseMin = Math.min(...parse);
// const rulesMin = Math.min(...rules);

// const parseSigma = Number(
//     Math.sqrt(parse.reduce((a, b) => a + (b - parseAvg) ** 2, 0) / (parse.length - 1)).toFixed(2),
// );
// const rulesSigma = Number(
//     Math.sqrt(rules.reduce((a, b) => a + (b - rulesAvg) ** 2, 0) / (rules.length - 1)).toFixed(2),
// );

// console.log("parse:");
// console.log("  avg:", parseAvg);
// console.log("  max:", parseMax);
// console.log("  min:", parseMin);
// console.log("  sigma:", parseSigma);
// console.log("");
// console.log("rules:");
// console.log("  avg:", rulesAvg);
// console.log("  max:", rulesMax);
// console.log("  min:", rulesMin);
// console.log("  sigma:", rulesSigma);
