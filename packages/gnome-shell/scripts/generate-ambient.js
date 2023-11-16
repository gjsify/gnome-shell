import { getAllFiles, fileExists } from './utils/files.js';
import { loadJsonFile, writeJsonFile } from './utils/json.js';
import { TYPE_DIR, __dirname } from './config.js';
import { resolve, extname, basename } from 'path';
import { writeFile } from 'fs/promises';

const AMBIENT_TEMPLATE = (path, fileName) => `declare module "resource:///org/gnome${path}/${fileName}.js" {
    import * as ns from "@girs/gnome-shell${path}/${fileName}";
    export = ns;
}`

const IGNORE_FILENAMES = ['index.d.ts', 'index.ts', 'sharedInternals.d.ts']

const IGNORE_DIRS = ['types']


const generateAmbient = async (absolutePath) => {
    const relativePath = absolutePath.replace(TYPE_DIR, '');
    const fileName = basename(relativePath);

    if(IGNORE_FILENAMES.includes(fileName)) return;

    if(fileName.endsWith('-ambient.d.ts')) return;

    const relativeWithoutExtension = relativePath.replace(extname(relativePath), '').replace('.d', '');
    
    const fileNameWithoutExt = basename(relativeWithoutExtension);
    const relativeFilePath = relativePath.split('/').slice(0, -1).join('/')
    const ambientAbsolutePath = absolutePath.replace(fileName, `${fileNameWithoutExt}-ambient.d.ts`)

    const ambientContent = AMBIENT_TEMPLATE(relativeFilePath, fileNameWithoutExt)

    await writeFile(ambientAbsolutePath, ambientContent, 'utf-8')

}

const start = async () => {    
    const typeFiles = await getAllFiles(TYPE_DIR, ['.ts'], IGNORE_DIRS);

    for (const absolutePath of typeFiles) {
        await generateAmbient(absolutePath)
    }


}

await start();