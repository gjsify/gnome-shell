import { getAllFiles } from './utils/files.js';
import { DIST_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';
import { writeFile } from 'fs/promises';

const AMBIENT_TEMPLATE = (path, fileName) => `declare module "resource:///org/gnome${path}/${fileName}.js" {
    import * as ns from "@girs/gnome-shell${path}/${fileName}";
    export = ns;
}`

const ESM_TEMPLATE = (path, fileName) => `export * from 'resource:///org/gnome${path}/${fileName}.js';`;
const CJS_TEMPLATE = (path, fileName) => `module.exports = imports${path.replaceAll('/', '.')}.${fileName};`;

const IGNORE_FILENAMES = ['index.d.ts', 'index.ts', 'sharedInternals.d.ts']

const IGNORE_DIRS = ['types']


const generateFiles = async (absolutePath) => {
    const relativePath = absolutePath.replace(DIST_DIR, '');
    const fileName = basename(relativePath);

    if(IGNORE_FILENAMES.includes(fileName)) return;

    if(fileName.endsWith('-ambient.d.ts')) return;

    const relativeWithoutExtension = relativePath.replace(extname(relativePath), '').replace('.d', '');
    
    const fileNameWithoutExt = basename(relativeWithoutExtension);
    const relativeFilePath = relativePath.split('/').slice(0, -1).join('/')

    const ambientDestPath = absolutePath.replace(fileName, `${fileNameWithoutExt}-ambient.d.ts`)
    const esmDestPath = absolutePath.replace(fileName, `${fileNameWithoutExt}.js`)
    const cjsDestPath = absolutePath.replace(fileName, `${fileNameWithoutExt}.cjs`)

    const ambientContent = AMBIENT_TEMPLATE(relativeFilePath, fileNameWithoutExt)
    const esmContent = ESM_TEMPLATE(relativeFilePath, fileNameWithoutExt)
    const cjsContent = CJS_TEMPLATE(relativeFilePath, fileNameWithoutExt)

    await writeFile(ambientDestPath, ambientContent, 'utf-8')
    await writeFile(esmDestPath, esmContent, 'utf-8')
    await writeFile(cjsDestPath, cjsContent, 'utf-8')
}

const start = async () => {    
    const typeFiles = await getAllFiles(DIST_DIR, ['.ts'], IGNORE_DIRS);

    for (const absolutePath of typeFiles) {
        await generateFiles(absolutePath)
    }


}

await start();