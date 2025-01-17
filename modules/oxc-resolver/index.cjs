let nativeBinding = null;

try {
    nativeBinding = require("@oxc-resolver/binding-wasm32-wasi");
} catch (err) {
    throw new Error("Failed to load native binding", { cause: err });
}

module.exports.ResolverFactory = nativeBinding.ResolverFactory;
module.exports.EnforceExtension = nativeBinding.EnforceExtension;
module.exports.sync = nativeBinding.sync;
