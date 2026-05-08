const { fs, vol } = require("memfs");

for (const method of ["cpSync", "statfsSync"]) {
    if (typeof vol[method] === "function") {
        fs[method] = vol[method].bind(vol);
    }
}

module.exports = fs;
