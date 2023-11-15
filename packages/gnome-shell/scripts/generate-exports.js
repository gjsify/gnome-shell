import { getAllFiles, fileExists } from './utils/files.js';
import { loadJsonFile, writeJsonFile } from './utils/json.js';
import { TYPE_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';

const createExport = (filePath) => {
    const relativePath = filePath.replace(TYPE_DIR, '');
    const withoutExtension = relativePath.replace(extname(relativePath), '').replace('.d', '');
    const esmJsPath = withoutExtension + '.js';
    const cjsJsPath = withoutExtension + '.cjs';

    let exportName = withoutExtension;
    exportName = basename(exportName) === 'index' ? './' + basename(resolve(exportName, '..')) : '.' + exportName;
    if(exportName.endsWith('/')) exportName = exportName.substring(0, exportName.length - 1);

    const exp = {};

    exp[exportName] = {
        import: {
            types: `./src${relativePath}`,
            default: `./src${esmJsPath}`
        },
        require: {
            types: `./src${relativePath}`,
            default: `./src${cjsJsPath}`
        }
    }

    return exp
}

const start = async () => {
    const pkg = await loadJsonFile(resolve(__dirname, '../package.json'));
    
    const typeFiles = await getAllFiles(TYPE_DIR, ['.ts']);

    let exports = {};

    for (const absolutePath of typeFiles) {
        exports = { ...exports, ...createExport(absolutePath) }
    }

    pkg.exports = exports;
    
    writeJsonFile(resolve(__dirname, '../package.json'), pkg);
}

await start();