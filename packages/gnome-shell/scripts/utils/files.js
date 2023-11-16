import { stat, readdir } from 'fs/promises';
import { resolve, extname } from 'path';

export const getAllFiles = async (dirPath, allowedExtensionNames, ignoreDirs = [], filesList = []) => {
    const files = await readdir(dirPath);

    for (const file of files) {
        const filePath = resolve(dirPath, file);
        const _stat = await stat(filePath);

        if (_stat.isDirectory()) {
            if(ignoreDirs.find((ignoreDir) => filePath.endsWith(ignoreDir))) continue;
            filesList = await getAllFiles(filePath, allowedExtensionNames, ignoreDirs, filesList);
            continue;
        }

        if(allowedExtensionNames && !allowedExtensionNames.includes(extname(filePath))) continue;
        
        filesList.push(filePath);
    }

    return filesList;
}

export const fileExists = async (path) => {
    try {
        return (await stat(path)).isFile();
    } catch (e) {
        return false;
    }
}