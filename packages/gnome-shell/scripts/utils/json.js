import { readFile, writeFile } from 'fs/promises';

export const loadJsonFile = async (path) => {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
};

export const writeJsonFile = async (path, data) => {
    return writeFile(path, JSON.stringify(data, null, 2));
};
