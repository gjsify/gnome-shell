export type { ConsoleLike } from './sharedInternals.js';
import type { ExtensionBase, TranslationFunctions } from './sharedInternals.js';

/**
 * @version 49
 */
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

/**
 * @version 49
 */
export declare const gettext: TranslationFunctions['gettext'];
/**
 * @version 49
 */
export declare const ngettext: TranslationFunctions['ngettext'];
/**
 * @version 49
 */
export declare const pgettext: TranslationFunctions['pgettext'];
