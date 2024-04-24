export type { ExtensionMetadata } from '../types/extension-metadata.js';
import type { ExtensionBase, TranslationFunctions } from './sharedInternals.js';
export class Extension extends ExtensionBase {
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
