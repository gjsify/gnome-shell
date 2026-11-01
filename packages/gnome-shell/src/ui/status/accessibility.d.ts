// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/accessibility.js

import * as PanelMenu from '../panelMenu.js';
import * as PopupMenu from '../popupMenu.js';

export declare class ATIndicator extends PanelMenu.Button {
    /** Initialize the ATIndicator */
    _init(): void;
    /** Sync the menu visibility based on certain conditions */
    _syncMenuVisibility(): boolean;
    /** Queue the menu visibility sync, avoiding redundant calls */
    _queueSyncMenuVisibility(): void;
    /**
     * Build a standard menu item.
     * @param string - The display string for the menu item.
     * @param schema - The GSettings schema id.
     * @param key - The key in the schema to associate with this item.
     * @returns A PopupSwitchMenuItem instance.
     */
    _buildItem(string: string, schema: string, key: string): PopupMenu.PopupSwitchMenuItem;
    /** Build a menu item specifically for adjusting font size. */
    _buildFontItem(): PopupMenu.PopupSwitchMenuItem;
}
