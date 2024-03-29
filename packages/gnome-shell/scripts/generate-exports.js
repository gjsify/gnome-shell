// Generates the exports for the package.json file

import { getAllFiles } from './utils/files.js';
import { loadJsonFile, writeJsonFile } from './utils/json.js';
import { DIST_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';

const IGNORE_FILENAMES = ['sharedInternals.d.ts', 'global.d.ts'];
const IGNORE_DIRS = ['types'];

/** */
const generateExport = (filePath) => {
    const relativePath = filePath.replace(DIST_DIR, '');
    const fileName = basename(relativePath);
    const pathWithoutExtension = relativePath.replace(extname(relativePath), '').replace('.d', '');
    const esmJsPath = pathWithoutExtension + '.js';
    const cjsJsPath = pathWithoutExtension + '.cjs';
    const ambientPath = pathWithoutExtension + '-ambient.d.ts';

    if (IGNORE_FILENAMES.includes(fileName)) return;
    if (fileName.endsWith('ambient.d.ts')) return;

    let exportName = pathWithoutExtension;
    exportName = basename(exportName) === 'index' ? '.' + resolve(exportName, '..') : '.' + exportName;
    if (exportName.endsWith('/')) exportName = exportName.substring(0, exportName.length - 1);

    const exp = {};

    exp[exportName] = {
        import: {
            types: `./dist${relativePath}`,
            default: `./dist${esmJsPath}`,
        },
        require: {
            types: `./dist${relativePath}`,
            default: `./dist${cjsJsPath}`,
        },
    };

    exp[exportName + '/ambient'] = `./dist${ambientPath}`;

    return exp;
};

const start = async () => {
    const pkg = await loadJsonFile(resolve(__dirname, '../package.json'));

    const typeFiles = await getAllFiles(DIST_DIR, ['.ts'], IGNORE_DIRS);

    let exports = {
        './extensions/global': './dist/extensions/global.d.ts',
    };

    for (const absolutePath of typeFiles) {
        exports = { ...exports, ...generateExport(absolutePath) };
    }

    pkg.exports = exports;

    writeJsonFile(resolve(__dirname, '../package.json'), pkg);
};

await start();
