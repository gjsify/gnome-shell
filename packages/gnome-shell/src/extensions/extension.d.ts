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

/**
 * @version 47
 */
export class InjectionManager {
    overrideMethod<T, M extends keyof T, F extends T[M] extends (...args: any[]) => any ? T[M] : never>(prototype: T, methodName: M, createOverrideFunc: (this: T, originalMethod: F) => (this: T, ...args: Parameters<F>) => ReturnType<F>): void;
    restoreMethod<T, M extends keyof T>(prototype: T, methodName: M): void;
    clear(): void;
}

export declare const gettext: TranslationFunctions['gettext'];
export declare const ngettext: TranslationFunctions['ngettext'];
export declare const pgettext: TranslationFunctions['pgettext'];
