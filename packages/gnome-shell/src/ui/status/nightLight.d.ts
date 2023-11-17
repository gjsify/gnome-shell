/**
 * Type definitions for the Night Light feature in GNOME's UI status.
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/nightLight.js
 */

import Gio from '@girs/gio-2.0';
import { QuickToggle, SystemIndicator } from '../quickSettings.js';

/**
 * Interface for the Night Light settings.
 */
declare const ColorInterface: string;

/**
 * DBus information for the Color interface.
 */
declare const colorInfo: Gio.DBusInterfaceInfo;

/**
 * Class representing the toggle for Night Light in the system settings.
 */
declare class NightLightToggle extends QuickToggle {
    /**
     * Initialize a new Night Light toggle.
     */
    _init(): void;
}

/**
 * System indicator class for Night Light.
 */
export declare class Indicator extends SystemIndicator {
    private _indicator: any; // Replace with appropriate type.
    private _proxy: Gio.DBusProxy;

    /**
     * Initialize the Night Light indicator.
     */
    _init(): void;

    /**
     * Synchronize the visibility of the indicator based on the Night Light active state.
     */
    _sync(): void;
}

// Constants
declare const BUS_NAME: string;
declare const OBJECT_PATH: string;

export {};
