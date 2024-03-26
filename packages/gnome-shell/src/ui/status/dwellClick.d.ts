// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/dwellClick.js

import Clutter from '@girs/clutter-14';
import Gio from '@girs/gio-2.0';
import GLib from '@girs/glib-2.0';
import St from '@girs/st-14';

import * as PanelMenu from '../panelMenu.js';

/**
 * Interface for dwell click modes.
 */
export interface DwellClickMode {
    name: string;
    icon: string;
    type: Clutter.PointerA11yDwellClickType;
}

/**
 * Indicator for dwell click accessibility feature.
 * Extends `PanelMenu.Button`.
 */
export declare class DwellClickIndicator extends PanelMenu.Button {
    private _icon: St.Icon;
    private _a11ySettings: Gio.Settings;
    private _seat: Clutter.Seat;

    /**
     * Initializes a new instance of `DwellClickIndicator`.
     */
    _init(): void;

    /**
     * Syncs the menu visibility based on the accessibility settings.
     */
    private _syncMenuVisibility(): typeof GLib.SOURCE_REMOVE;

    /**
     * Adds a dwell action to the menu.
     * @param mode - The mode for the dwell action.
     */
    private _addDwellAction(mode: { name: string; icon: string; type: DwellClickMode }): void;

    /**
     * Updates the click type icon based on the provided click type.
     * @param manager - The Clutter manager.
     * @param clickType - The type of click.
     */
    private _updateClickType(manager: any, clickType: DwellClickMode): void;

    /**
     * Sets the click type for the dwell action.
     * @param mode - The mode to set for the click type.
     */
    private _setClickType(mode: { type: DwellClickMode; icon: string }): void;
}
