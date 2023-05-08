import type { ExtensionMetadata } from './extension-metadata.js';
import type { ExtensionType, ExtensionState } from '../misc/extensionUtils.js';

export interface Extension {
    type: ExtensionType;
    state: ExtensionState;
    path: string;
    error: string | null;
    hasPrefs: boolean;
    hasUpdate: boolean;
    canChange: boolean;
    metadata: ExtensionMetadata;
}