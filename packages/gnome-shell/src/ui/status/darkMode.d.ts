// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/darkMode.js

import Gio from '@girs/gio-2.0';

import { QuickToggle, SystemIndicator } from '../quickSettings.js';

/**
 * Toggle class for managing dark mode settings.
 * Extends `QuickToggle`.
 */
export declare class DarkModeToggle extends QuickToggle {
    _settings: Gio.Settings;
    _changedId: number;

    /**
     * Initializes a new instance of `DarkModeToggle`.
     */
    _init(): void;

    /**
     * Toggles the dark mode setting.
     */
    _toggleMode(): void;

    /**
     * Synchronizes the toggle state with the current dark mode setting.
     */
    _sync(): void;
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
