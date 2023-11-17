export type { ExtensionMetadata } from '../types/extension-metadata.js';
import type { ExtensionType, ExtensionState } from '../misc/extensionUtils.js';
import type { ExtensionBase, TranslationFunctions } from './sharedInternals.js';
export class Extension extends ExtensionBase {
    static lookupByUUID(uuid: string): Extension | null;
    static defineTranslationFunctions(url: string): TranslationFunctions;

    /**
     * Open the extension's preferences window
     */
    openPreferences(): void;

    enable(): void;
    disable(): void;
}

export declare const gettext: TranslationFunctions['gettext'];
export declare const ngettext: TranslationFunctions['ngettext'];
export declare const pgettext: TranslationFunctions['pgettext'];
