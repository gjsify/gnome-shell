// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/extensions/sharedInternals.js

import type Gio from '@girs/gio-2.0';

/** The raw extension metadata from metadata.json.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/extensionUtils.js#L143
 * @version 49
 */
export interface MetadataJson extends Record<string, any> {
    // GNOME Shell checks these properties
    readonly uuid: string;
    readonly name: string;
    readonly description: string;
    readonly 'shell-version': readonly string[];
}

/** The Metadata Object for Extensions
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/extensions/sharedInternals.js#L49
 * @version 49
 */
export interface ExtensionMetadata {
    readonly uuid: string;
    readonly dir: Gio.File;
    readonly path: string;
    readonly name: string;
    readonly description: string;
    readonly version?: string;
    readonly url?: string;
    readonly 'shell-version': string[];
    readonly 'settings-schema'?: string;
    readonly 'gettext-domain'?: string;
    readonly 'original-author'?: string[];
    readonly 'extension-id'?: string;
    readonly 'version-name'?: string;
}
