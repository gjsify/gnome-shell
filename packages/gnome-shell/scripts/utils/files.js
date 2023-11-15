import { stat, readdir } from 'fs/promises';
import { resolve, extname } from 'path';

export const getAllFiles = async (dirPath, allowedExtensionNames, filesList = []) => {
    const files = await readdir(dirPath);

    for (const file of files) {
        const filePath = resolve(dirPath, file);
        const _stat = await stat(filePath);

        if (_stat.isDirectory()) {
            filesList = await getAllFiles(filePath, allowedExtensionNames, filesList);
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