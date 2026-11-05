import process from "node:process";

import { isPackageExists } from "@/shared/pkg";

export const defaultOptions = {
    cwd: process.cwd(),
    import: true,
    jsdoc: true,
    package: true,
    tailwind: (cwd: string) => isPackageExists("tailwindcss", cwd),
    jsonc: true,
    yaml: true,
};
