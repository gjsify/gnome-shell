const { build } = require("esbuild");

build({
    entryPoints: ['src/extension.ts'],
    outdir: 'dist',
    bundle: true,
    // Do not remove the functions `enable()`, `disable()` and `init()`
    treeShaking: false,
    // firefox60  // Since GJS 1.53.90
    // firefox68  // Since GJS 1.63.90
    // firefox78  // Since GJS 1.65.90
    // firefox91  // Since GJS 1.71.1
    // firefox102 // Since GJS 1.73.2
    target: "firefox78",
    platform: "node",
    // platform: "neutral",
    // mainFields: ['main'],
    // conditions: ['require', 'default'],
    // format: 'cjs',
    external: ['gi://*', 'system', 'gettext', 'cairo'],
})