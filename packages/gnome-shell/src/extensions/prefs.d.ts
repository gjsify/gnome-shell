import type Adw from '@girs/adw-1';

import type { Extension } from './extension';
import type { ExtensionBase, TranslationFunctions } from './sharedInternals';

export class ExtensionPreferences extends ExtensionBase {
  static lookupByUUID(uuid: string): Extension | null;
  static defineTranslationFunctions(url: string): TranslationFunctions;

  /**
   * Get the single widget that implements
   * the extension's preferences.
   *
   * @returns {Gtk.Widget}
   * @throws {GObject.NotImplementedError}
   */
  getPreferencesWidget(): any; // TODO: Change this to Gtk.Widget as soon as this is implemented or extended

  /**
   * Fill the preferences window with preferences.
   *
   * The default implementation adds the widget
   * returned by getPreferencesWidget().
   *
   * @param {Adw.PreferencesWindow} window - the preferences window
   */
  fillPreferencesWindow(window: Adw.PreferencesWindow): void;
}

export declare const gettext: TranslationFunctions['gettext'];
export declare const ngettext: TranslationFunctions['ngettext'];
export declare const pgettext: TranslationFunctions['pgettext'];
