const fs = require("fs");
const homeDir = require('os').homedir();
const metadata = require("./src/metadata.json");

const extensionDir = homeDir + "/.local/share/gnome-shell/extensions/" + metadata.uuid;

console.debug("Installing extension to " + extensionDir)

fs.mkdirSync(extensionDir, { recursive: true });
fs.copyFileSync("./dist/extension.js", extensionDir + "/extension.js");
fs.copyFileSync("./src/metadata.json", extensionDir + "/metadata.json");

console.debug("Done")