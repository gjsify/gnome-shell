/**
 * Type definitions for the RFKill (Airplane Mode) feature in GNOME's UI status.
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/rfkill.js
 */

import Gio from '@girs/gio-2.0';
import GLib from '@girs/glib-2.0';
import GObject from '@girs/gobject-2.0';
import { QuickToggle, SystemIndicator } from '../quickSettings.js';

/**
 * The DBus interface details for the RFKill manager.
 */
declare const BUS_NAME: string;
declare const OBJECT_PATH: string;
declare const RfkillManagerInterface: string;
declare const rfkillManagerInfo: Gio.DBusInterfaceInfo;

/**
 * Class representing the RFKill Manager.
 */
export declare class RfkillManager extends GObject.Object {
    private _proxy: Gio.DBusProxy;

    /**
     * Create a new RFKill Manager.
     */
    constructor();

    /**
     * Get or set the airplane mode state.
     */
    get airplane_mode(): boolean;
    set airplane_mode(v: boolean);

    /**
     * Get the state of hardware airplane mode.
     */
    get hw_airplane_mode(): boolean;

    /**
     * Determine if airplane mode should be shown.
     */
    get show_airplane_mode(): boolean;

    /**
     * Handle changes in RFKill properties.
     */
    private _changed(proxy: Gio.DBusProxy, properties: GLib.Variant): void;
}

/**
 * Get the singleton instance of the RFKill Manager.
 */
export declare function getRfkillManager(): RfkillManager;

/**
 * Class representing the RFKill Toggle in Quick Settings.
 */
export declare class RfkillToggle extends QuickToggle {
    private _manager: RfkillManager;

    /**
     * Initialize a new RFKill Toggle.
     */
    _init(): void;
}

/**
 * Class representing the RFKill System Indicator.
 */
export declare class Indicator extends SystemIndicator {
    private _indicator: any;
    private _rfkillToggle: RfkillToggle;

    /**
     * Initialize a new RFKill Indicator.
     */
    _init(): void;

    /**
     * Synchronize the indicator's visibility.
     */
    private _sync(): void;
}
