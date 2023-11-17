// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/darkMode.js

import Gio from '@girs/gio-2.0';

import { QuickToggle, SystemIndicator } from '../quickSettings.js';

/**
 * Toggle class for managing dark mode settings.
 * Extends `QuickToggle`.
 */
export declare class DarkModeToggle extends QuickToggle {
    private _settings: Gio.Settings;
    private _changedId: number;

    /**
     * Initializes a new instance of `DarkModeToggle`.
     */
    _init(): void;

    /**
     * Toggles the dark mode setting.
     */
    private _toggleMode(): void;

    /**
     * Synchronizes the toggle state with the current dark mode setting.
     */
    private _sync(): void;
}

/**
 * System indicator for dark mode control.
 */
export declare class Indicator extends SystemIndicator {
    /**
     * Initializes a new instance of `Indicator`.
     */
    _init(): void;
}
