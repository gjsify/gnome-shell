import type { ExtensionMetadata } from '../types/extension-metadata.js';
import type { Extension } from './extension.js';

import type Gio from '@girs/gio-2.0';

export interface TranslationFunctions {
    /**
     * Translate `str` using the extension's gettext domain
     *
     * @param {string} str - the string to translate
     *
     * @returns {string} the translated string
     */
    gettext(str: string): string;
    /**
     * Translate `str` and choose plural form using the extension's
     * gettext domain
     *
     * @param {string} str - the string to translate
     * @param {string} strPlural - the plural form of the string
     * @param {number} n - the quantity for which translation is needed
     *
     * @returns {string} the translated string
     */
    ngettext(str: string, strPlural: string, n: number): string;

    /**
     * Translate `str` in the context of `context` using the extension's
     * gettext domain
     *
     * @param {string} context - context to disambiguate `str`
     * @param {string} str - the string to translate
     *
     * @returns {string} the translated string
     */
    pgettext(context: string, str: string): string;
}

export class ExtensionBase {
    #gettextDomain: string | null;

    readonly metadata: ExtensionMetadata;

    /**
     * Look up an extension by URL (usually 'import.meta.url')
     *
     * @param url - a file:// URL
     */
    static lookupByURL(url: string): Extension | null;

    /**
     * Look up an extension by UUID
     *
     * @param {string} _uuid
     */
    static lookupByUUID(_uuid: string): Extension | null;

    /**
     * @param metadata - metadata passed in when loading the extension
     */
    constructor(metadata: ExtensionMetadata);

    get uuid(): string;

    get dir(): Gio.File;

    get path(): string;

    /**
     * Get a GSettings object for schema, using schema files in
     * extensionsdir/schemas. If schema is omitted, it is taken
     * from metadata['settings-schema'].
     *
     * @param schema - the GSettings schema id
     *
     * @returns {}
     */
    getSettings(schema?: string): Gio.Settings;

    /**
     * Initialize Gettext to load translations from extensionsdir/locale. If
     * domain is not provided, it will be taken from metadata['gettext-domain']
     * if provided, or use the UUID
     *
     * @param {string=} domain - the gettext domain to use
     */
    initTranslations(domain: string): void;

    /**
     * Translate `str` using the extension's gettext domain
     *
     * @param str - the string to translate
     *
     * @returns the translated string
     */
    gettext(str: string): string;

    /**
     * Translate `str` and choose plural form using the extension's
     * gettext domain
     *
     * @param {string} str - the string to translate
     * @param {string} strPlural - the plural form of the string
     * @param {number} n - the quantity for which translation is needed
     *
     * @returns {string} the translated string
     */
    ngettext(str: string, strPlural: string, n: number): string;

    /**
     * Translate `str` in the context of `context` using the extension's
     * gettext domain
     *
     * @param {string} context - context to disambiguate `str`
     * @param {string} str - the string to translate
     *
     * @returns {string} the translated string
     */
    pgettext(context: string, str: string): string;

    /**
     * @param {string} func
     */
    #checkGettextDomain(func: string);
}

export class GettextWrapper {
    #url: string | null;
    #extensionClass: ExtensionBase;

    constructor(extensionClass: ExtensionBase, url: string);

    #detectUrl(): string | null;

    #lookupExtension(funcName: string): ExtensionBase;

    #gettext(str: string): string;

    #ngettext(str: string, strPlural: string, n: number): string;

    #pgettext(context: any, str: string): string;

    defineTranslationFunctions(): TranslationFunctions;
}
