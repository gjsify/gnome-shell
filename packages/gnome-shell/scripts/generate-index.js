// Generates index and ambient files for each file

import { getAllFiles, getAllDirs } from './utils/files.js';
import { DIST_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';
import { writeFile, readdir } from 'fs/promises';

const IGNORE_DIRS = ['types']
const IGNORE_FILENAMES = ['index.d.ts', 'index.ts', 'sharedInternals.d.ts']
const EXPORT_ESM_TEMPLATE = (exportName, fileName) => `export * as ${exportName} from './${fileName}.js';`;
const EXPORT_CJS_TEMPLATE = (exportName, fileName) => `module.exports.${exportName} = require('./${fileName}.cjs');`;
const IMPORT_AMBIENT_TEMPLATE = (fileName) => `import './${fileName}-ambient.d.ts';`;

const start = async () => {    
    const dirs = await getAllDirs(DIST_DIR, IGNORE_DIRS, true);

    console.debug("dirs", dirs)

    for (const absoluteDir of dirs) {
        // const relativeDir = absoluteDir.replace(DIST_DIR, '');
        const childDirs = await getAllDirs(absoluteDir, IGNORE_DIRS, false);
        const files = (await getAllFiles(absoluteDir, ['.ts'], IGNORE_DIRS, false))
        .filter((file) => !file.endsWith('ambient.d.ts') && !IGNORE_FILENAMES.includes(basename(file)));

        let indexEsmContent = '';
        let indexCjsContent = '';
        let ambientContent = '';

        for (const file of files) {
            const fileName = basename(file);
            const withoutExtension = fileName.replace(extname(fileName), '').replace('.d', '');

            indexEsmContent += EXPORT_ESM_TEMPLATE(withoutExtension, withoutExtension) + '\n';
            indexCjsContent += EXPORT_CJS_TEMPLATE(withoutExtension, withoutExtension) + '\n';
            ambientContent += IMPORT_AMBIENT_TEMPLATE(withoutExtension) + '\n'
        }

        for (const childDir of childDirs) {
            const dirName = basename(childDir);
            const dirIndexName = `${dirName}/index`;
            console.debug("relativeChildDir", dirName, dirIndexName)

            indexEsmContent += EXPORT_ESM_TEMPLATE(dirName, dirIndexName) + '\n';
            indexCjsContent += EXPORT_CJS_TEMPLATE(dirName, dirIndexName) + '\n';
            ambientContent += IMPORT_AMBIENT_TEMPLATE(dirIndexName) + '\n'
        }

        await writeFile(resolve(absoluteDir, 'index.d.ts'), indexEsmContent, 'utf-8');
        await writeFile(resolve(absoluteDir, 'index.js'), indexEsmContent, 'utf-8');
        await writeFile(resolve(absoluteDir, 'index.cjs'), indexCjsContent, 'utf-8');
        await writeFile(resolve(absoluteDir, 'index-ambient.d.ts'), ambientContent, 'utf-8');
        
    }


}

await start();