import process from "node:process";

import { isPackageExists } from "@/shared/pkg";

export const defaultOptions = {
    cwd: process.cwd(),
    javascript: true,
    typescript: (cwd: string) =>
        isPackageExists("typescript", cwd) || isPackageExists("@typescript/native-preview", cwd),
    react: (cwd: string) => isPackageExists("react", cwd) || isPackageExists("preact", cwd),
    import: true,
};
