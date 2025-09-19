// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/system.js

import Clutter from '@girs/clutter-17';
import Gio from '@girs/gio-2.0';
import St from '@girs/st-17';

import { QuickSettingsItem, QuickToggle, SystemIndicator } from '../quickSettings.js';

declare const BUS_NAME: string;
declare const OBJECT_PATH: string;

/**
 * Interface XML for DisplayDevice in UPower.
 */
declare const DisplayDeviceInterface: string;

/**
 * A proxy wrapper for the PowerManager using UPower's DisplayDevice.
 */
declare const PowerManagerProxy: Gio.DBusProxy;

/**
 * A toggle for managing and displaying power-related settings.
 */
declare class PowerToggle extends QuickToggle {
    _proxy: Gio.DBusProxy;

    /**
     * Initializes a new instance of PowerToggle.
     */
    constructor();

    /**
     * Update the toggle based on session updates.
     */
    _sessionUpdated(): void;

    /**
     * Synchronize the state of the toggle with the proxy data.
     */
    _sync(): void;
}

// ... other classes like ScreenshotItem, SettingsItem, ShutdownItem, LockItem ...

/**
 * A system item for quick settings, containing power, screenshot, settings, lock, and shutdown items.
 */
declare class SystemItem extends QuickSettingsItem {
    _powerToggle: PowerToggle;
    _laptopSpacer: Clutter.Actor;
    // ... other private members

    /**
     * Initializes a new instance of SystemItem.
     */
    constructor();

    /**
     * Gets the power toggle.
     */
    get powerToggle(): PowerToggle;
}

/**
 * The main system indicator for the GNOME Shell status area.
 */
declare class Indicator extends SystemIndicator {
    _desktopSettings: Gio.Settings;
    _indicator: St.Icon;
    _percentageLabel: St.Label;
    _systemItem: SystemItem;

    /**
     * Initializes a new instance of Indicator.
     */
    constructor();

    /**
     * Synchronize the indicator with the current state.
     */
    _sync(): void;
}

export { PowerToggle, SystemItem, Indicator };
