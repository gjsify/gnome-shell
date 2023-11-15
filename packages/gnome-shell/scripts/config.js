import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = globalThis.__dirname || dirname(fileURLToPath(import.meta.url));
export const TYPE_DIR = resolve(__dirname,'../src');
