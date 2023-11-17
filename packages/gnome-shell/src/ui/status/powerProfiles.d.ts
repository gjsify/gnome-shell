/**
 * Type definitions for the Power Profiles feature in GNOME's UI status.
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/powerProfiles.js
 */

import Gio from '@girs/gio-2.0';
import { QuickMenuToggle, SystemIndicator } from '../quickSettings.js';
import * as PopupMenu from '../popupMenu.js';

/**
 * Interface for the Power Profiles DBus.
 */
declare const PowerProfilesIface: string;

/**
 * DBus proxy wrapper for Power Profiles.
 */
declare class PowerProfilesProxy extends Gio.DBusProxy {
    // Add specific methods and properties relevant to PowerProfilesProxy
}

/**
 * Object mapping power profile keys to their display names and icon names.
 */
declare const PROFILE_PARAMS: {
    [profileKey: string]: {
        name: string;
        iconName: string;
    };
};

/**
 * Key for the last selected power profile in the settings.
 */
declare const LAST_PROFILE_KEY: string;

/**
 * Class representing the toggle for Power Profiles in the system settings.
 */
declare class PowerProfilesToggle extends QuickMenuToggle {
    private _profileItems: Map<string, PopupMenu.PopupImageMenuItem>;
    private _profileSection: PopupMenu.PopupMenuSection;
    private _proxy: PowerProfilesProxy;

    /**
     * Initialize a new Power Profiles toggle.
     */
    _init(): void;

    /**
     * Sync and update the list of power profiles.
     */
    _syncProfiles(): void;

    /**
     * Sync the current state of the power profiles.
     */
    _sync(): void;
}

/**
 * System indicator class for Power Profiles.
 */
export declare class Indicator extends SystemIndicator {
    /**
     * Initialize the Power Profiles indicator.
     */
    _init(): void;
}

// Constants
declare const BUS_NAME: string;
declare const OBJECT_PATH: string;

export {};
