// https://gitlab.gnome.org/GNOME/gnome-shell/blob/main/js/misc/extensionUtils.js

import type { Extension } from '../extensions/extension.js';

export enum ExtensionType {
    SYSTEM = 1,
    PER_USER = 2,
}

export enum ExtensionState {
    ENABLED = 1,
    DISABLED = 2,
    ERROR = 3,
    OUT_OF_DATE = 4,
    DOWNLOADING = 5,
    INITIALIZED = 6,
    DISABLING = 7,
    ENABLING = 8,
    /**
     * Used as an error state for operations on unknown extensions,
     * should never be in a real extensionMeta object.
     */
    UNINSTALLED = 99,
}

declare const SERIALIZED_PROPERTIES: string[];

export function serializeExtension(extension: Extension): object;

export function deserializeExtension(data: object): Extension;
