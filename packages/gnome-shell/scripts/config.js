import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = globalThis.__dirname || dirname(fileURLToPath(import.meta.url));
export const SRC_DIR = resolve(__dirname, '../src');
export const DIST_DIR = resolve(__dirname, '../dist');
