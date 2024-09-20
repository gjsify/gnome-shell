import type Adw from '@girs/adw-1';
import type Gtk from '@girs/gtk-4.0';

import type { ExtensionBase, TranslationFunctions } from './sharedInternals.js';

/**
 * @version 47
 */
export class ExtensionPreferences extends ExtensionBase {
    static defineTranslationFunctions(url: string): TranslationFunctions;

    /**
     * Get the single widget that implements
     * the extension's preferences.
     *
     * @returns {Gtk.Widget|Promise<Gtk.Widget>}
     * @throws {GObject.NotImplementedError}
     */
    getPreferencesWidget(): Gtk.Widget | Promise<Gtk.Widget>;

    /**
     * Fill the preferences window with preferences.
     *
     * The default implementation adds the widget
     * returned by getPreferencesWidget().
     *
     * @param {Adw.PreferencesWindow} window - the preferences window
     */
    fillPreferencesWindow(window: Adw.PreferencesWindow): Promise<void>;
}

export declare const gettext: TranslationFunctions['gettext'];
export declare const ngettext: TranslationFunctions['ngettext'];
export declare const pgettext: TranslationFunctions['pgettext'];
