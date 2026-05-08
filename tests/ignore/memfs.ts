import { fs, vol } from "memfs";

for (const method of ["cpSync", "statfsSync"] as const) {
    if (typeof vol[method] === "function") {
        fs[method] = vol[method].bind(vol) as Fn;
    }
}

export { fs, vol };
