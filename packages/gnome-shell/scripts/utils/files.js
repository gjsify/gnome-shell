import { stat, readdir } from 'fs/promises';
import { resolve, extname } from 'path';

export const getAllFiles = async (dirPath, allowedExtensionNames, ignoreDirs = [], recursive = true, filesList = []) => {
    const files = await readdir(dirPath);

    for (const file of files) {
        const filePath = resolve(dirPath, file);
        const _stat = await stat(filePath);

        if (_stat.isDirectory()) {
            if (!recursive) continue;
            if (ignoreDirs.find((ignoreDir) => filePath.endsWith(ignoreDir))) continue;
            filesList = await getAllFiles(filePath, allowedExtensionNames, ignoreDirs, recursive, filesList);
            continue;
        }

        if (allowedExtensionNames && !allowedExtensionNames.includes(extname(filePath))) continue;

        filesList.push(filePath);
    }

    return filesList;
};

export const getAllDirs = async (dirPath, ignoreDirs = [], recursive = true, dirList = []) => {
    const files = await readdir(dirPath);

    for (const file of files) {
        const currentPath = resolve(dirPath, file);
        const _stat = await stat(currentPath);

        if (!_stat.isDirectory() || ignoreDirs.find((ignoreDir) => currentPath.endsWith(ignoreDir))) {
            continue;
        }

        if (recursive) dirList.push(...(await getAllDirs(currentPath, ignoreDirs, dirList)));

        dirList.push(currentPath);
    }

    return dirList;
};

export const fileExists = async (path) => {
    try {
        return (await stat(path)).isFile();
    } catch (e) {
        return false;
    }
};
