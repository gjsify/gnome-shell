import { getAllFiles, fileExists } from './utils/files.js';
import { loadJsonFile, writeJsonFile } from './utils/json.js';
import { DIST_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';

const generateExport = (filePath) => {
    const relativePath = filePath.replace(DIST_DIR, '');
    const withoutExtension = relativePath.replace(extname(relativePath), '').replace('.d', '');
    const esmJsPath = withoutExtension + '.js';
    const cjsJsPath = withoutExtension + '.cjs';

    let exportName = withoutExtension;
    exportName = basename(exportName) === 'index' ? './' + basename(resolve(exportName, '..')) : '.' + exportName;
    if(exportName.endsWith('/')) exportName = exportName.substring(0, exportName.length - 1);

    const exp = {};

    exp[exportName] = {
        import: {
            types: `./dist${relativePath}`,
            default: `./dist${esmJsPath}`
        },
        require: {
            types: `./dist${relativePath}`,
            default: `./dist${cjsJsPath}`
        }
    }

    return exp
}

const start = async () => {
    const pkg = await loadJsonFile(resolve(__dirname, '../package.json'));
    
    const typeFiles = await getAllFiles(DIST_DIR, ['.ts']);

    let exports = {};

    for (const absolutePath of typeFiles) {
        exports = { ...exports, ...generateExport(absolutePath) }
    }

    pkg.exports = exports;
    
    writeJsonFile(resolve(__dirname, '../package.json'), pkg);
}

await start();