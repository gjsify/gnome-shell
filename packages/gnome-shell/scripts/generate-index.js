// Generates index and ambient files for each file

import { getAllFiles, getAllDirs } from './utils/files.js';
import { capitalized } from './utils/string.js';
import { DIST_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';
import { writeFile } from 'fs/promises';

const IGNORE_DIRS = ['types'];
const IGNORE_FILENAMES = ['index.d.ts', 'index.ts', 'sharedInternals.d.ts', 'global.d.ts'];
const EXPORT_ESM_TEMPLATE = (exportName, fileName) => `export * as ${exportName} from './${fileName}.js';`;
const EXPORT_CJS_TEMPLATE = (exportName, fileName) => `module.exports.${exportName} = require('./${fileName}.cjs');`;
const IMPORT_AMBIENT_TEMPLATE = (fileName) => `import './${fileName}-ambient.d.ts';`;

const appendDir = async (dirPath, data) => {
    const dirName = basename(dirPath);
    const dirIndexName = `${dirName}/index`;

    data.esm += EXPORT_ESM_TEMPLATE(capitalized(dirName), dirIndexName) + '\n';
    data.cjs += EXPORT_CJS_TEMPLATE(capitalized(dirName), dirIndexName) + '\n';
    data.ambient += IMPORT_AMBIENT_TEMPLATE(dirIndexName) + '\n';

    return data;
};

const appendFile = async (filePath, data) => {
    const fileName = basename(filePath);
    const withoutExtension = fileName.replace(extname(fileName), '').replace('.d', '');

    data.esm += EXPORT_ESM_TEMPLATE(withoutExtension, withoutExtension) + '\n';
    data.cjs += EXPORT_CJS_TEMPLATE(withoutExtension, withoutExtension) + '\n';
    data.ambient += IMPORT_AMBIENT_TEMPLATE(withoutExtension) + '\n';

    return data;
};

const start = async () => {
    const dirs = await getAllDirs(DIST_DIR, IGNORE_DIRS, true);

    for (const absoluteDir of dirs) {
        const childDirs = await getAllDirs(absoluteDir, IGNORE_DIRS, false);
        const files = (await getAllFiles(absoluteDir, ['.ts'], IGNORE_DIRS, false)).filter((file) => !file.endsWith('ambient.d.ts') && !IGNORE_FILENAMES.includes(basename(file)));

        const data = {
            esm: '',
            cjs: '',
            ambient: '',
        };

        for (const file of files) {
            appendFile(file, data);
        }

        for (const childDir of childDirs) {
            appendDir(childDir, data);
        }

        await writeFile(resolve(absoluteDir, 'index.d.ts'), data.esm, 'utf-8');
        await writeFile(resolve(absoluteDir, 'index.js'), data.esm, 'utf-8');
        await writeFile(resolve(absoluteDir, 'index.cjs'), data.cjs, 'utf-8');
        await writeFile(resolve(absoluteDir, 'index-ambient.d.ts'), data.ambient, 'utf-8');
    }

    const rootDirs = await getAllDirs(DIST_DIR, IGNORE_DIRS, false);

    const data = {
        esm: '',
        cjs: '',
        ambient: '',
    };

    for (const rootDir of rootDirs) {
        appendDir(rootDir, data);
    }

    await writeFile(resolve(DIST_DIR, 'index.d.ts'), data.esm, 'utf-8');
    await writeFile(resolve(DIST_DIR, 'index.js'), data.esm, 'utf-8');
    await writeFile(resolve(DIST_DIR, 'index.cjs'), data.cjs, 'utf-8');
    await writeFile(resolve(DIST_DIR, 'index-ambient.d.ts'), data.ambient, 'utf-8');
};

await start();
