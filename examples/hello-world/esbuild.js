import { build } from 'esbuild';
import { copyFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __dirname = dirname(fileURLToPath(import.meta.url));
const metadata = JSON.parse(readFileSync('./src/metadata.json', 'utf8'));

console.debug(`Building ${metadata.name} v${metadata.version}...`);

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
    target: 'firefox78',
    platform: 'neutral',
    platform: 'node',
    // mainFields: ['main'],
    // conditions: ['require', 'default'],
    format: 'esm',
    external: ['gi://*', 'resource://*', 'system', 'gettext', 'cairo'],
}).then(() => {
    const metaSrc = resolve(__dirname, 'src/metadata.json');
    const metaDist = resolve(__dirname, 'dist/metadata.json');
    const zipFilename = `${metadata.uuid}.zip`;
    const zipDist = resolve(__dirname, zipFilename);
    copyFileSync(metaSrc, metaDist);

    const zip = new AdmZip();
    zip.addLocalFolder(resolve(__dirname, 'dist'));
    zip.writeZip(zipDist);

    console.log(`Build complete. Zip file: ${zipFilename}\n`);
    console.log(`Install with: gnome-extensions install ${zipFilename}`);
    console.log(`Update with: gnome-extensions install --force ${zipFilename}`);
    console.log(`Enable with: gnome-extensions enable ${metadata.uuid}`);
    console.log('');
    console.log(`Disable with: gnome-extensions disable ${metadata.uuid}`);
    console.log(`Remove with: gnome-extensions uninstall ${metadata.uuid}`);
    console.log('');
    console.log('To check if the extension has been recognized, you can execute the following: gnome-extensions list.');
    console.log(`If ${metadata.uuid} is listed in the output, you should be able to activate the extension.`);
    console.log('Otherwise, you will need to restart the GNOME Shell.');
});
