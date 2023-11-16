import { getAllFiles } from './utils/files.js';
import { copyFile, mkdir } from 'fs/promises';
import { SRC_DIR, DIST_DIR, __dirname } from './config.js';

const start = async () => {    
    const srcFiles = await getAllFiles(SRC_DIR, ['.ts']);

    for (const srcFile of srcFiles) {
        const destFile = srcFile.replace(SRC_DIR, DIST_DIR);
        await mkdir(destFile.split('/').slice(0, -1).join('/'), { recursive: true });
        await copyFile(srcFile, destFile);
    }
}

await start();