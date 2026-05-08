import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PKG_NAME_PREFIX = "@unrs/resolver-binding-";
const loadErrors = [];

const safeRequire = path => {
    try {
        return require(path);
    } catch (e) {
        loadErrors.push(e);
    }
};

function requireNative() {
    let arch = "";

    if (process.platform === "win32") {
        arch = "win32-";
        if (process.arch === "x64") {
            arch += "x64-msvc";
        } else if (process.arch === "arm64") {
            arch += "arm64-msvc";
        } else {
            loadErrors.push(new Error(`Unsupported architecture on Windows: ${process.arch}`));
        }
    } else if (process.platform === "darwin") {
        arch = "darwin-";
        if (process.arch === "x64") {
            arch += "x64";
        } else if (process.arch === "arm64") {
            arch += "arm64";
        } else {
            loadErrors.push(new Error(`Unsupported architecture on macOS: ${process.arch}`));
        }
    } else if (process.platform === "linux") {
        arch = "linux-";
        if (process.arch === "x64") {
            arch += "x64-gnu";
        } else if (process.arch === "arm64") {
            arch += "arm64-gnu";
        } else {
            loadErrors.push(new Error(`Unsupported architecture on Linux: ${process.arch}`));
        }
    } else {
        loadErrors.push(
            new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`),
        );
    }

    if (arch) {
        return safeRequire(`${PKG_NAME_PREFIX}${arch}`);
    }
}

let nativeBinding = requireNative();
if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
    try {
        nativeBinding = require(`${PKG_NAME_PREFIX}wasm32-wasi`);
    } catch (err) {
        if (process.env.NAPI_RS_FORCE_WASI) {
            loadErrors.push(err);
        }
    }
}
if (!nativeBinding) {
    if (loadErrors.length > 0) {
        throw new Error(
            `Cannot find native binding. ` +
                `npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). ` +
                "Please try `npm i` again after removing both package-lock.json and node_modules directory.",
            { cause: loadErrors },
        );
    }
    throw new Error(`Failed to load native binding`);
}

const binding = nativeBinding;

export default binding;
export const { ResolverFactory, EnforceExtension, ModuleType, sync } = binding;

if (process.versions.pnp) {
    process.env.UNRS_RESOLVER_YARN_PNP = "1";
}
