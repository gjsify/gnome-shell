// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/bluetooth.js

import Gio from '@girs/gio-2.0';
import GObject from '@girs/gobject-2.0';
import St from '@girs/st-14';
import GnomeBluetooth from '@girs/gnomebluetooth-3.0';

import { Spinner } from '../animation.js';
import * as PopupMenu from '../popupMenu.js';
import { QuickMenuToggle, SystemIndicator } from '../quickSettings.js';

/**
 * Bluetooth client class, managing the state and devices of Bluetooth.
 */
export declare class BtClient extends GObject.Object {
    private _client: typeof GnomeBluetooth.Client;
    private _proxy: Gio.DBusProxy;
    private _adapter: any; // Replace with actual type
    private _deviceNotifyConnected: Set<string>;
    private _predictedState: GnomeBluetooth.AdapterState | undefined;
    private _devicesChangedId?: number;

    /**
     * Initializes a new instance of `BtClient`.
     */
    _init(): void;

    /**
     * Gets whether Bluetooth is available.
     */
    get available(): boolean;

    /**
     * Gets whether Bluetooth is active.
     */
    get active(): boolean;

    /**
     * Gets the state of the Bluetooth adapter.
     */
    get adapter_state(): GnomeBluetooth.AdapterState;

    /**
     * Toggles the active state of Bluetooth.
     */
    toggleActive(): void;

    /**
     * Toggles the connection state of a given Bluetooth device.
     */
    toggleDevice(device: any): Promise<void>; // Replace with actual type

    /**
     * Yields devices managed by the Bluetooth client.
     */
    getDevices(): IterableIterator<any>; // Replace with actual type
}

/**
 * Menu item representing a Bluetooth device.
 */
export declare class BluetoothDeviceItem extends PopupMenu.PopupBaseMenuItem {
    private _device: any; // Replace with actual type
    private _client: BtClient;
    private _icon: St.Icon;
    private _label: St.Label;
    private _subtitle: St.Label;
    private _spinner: Spinner;

    /**
     * Constructs a `BluetoothDeviceItem`.
     */
    constructor(device: any, client: BtClient); // Replace with actual device type

    /**
     * Toggles the connected state of the device.
     */
    private _toggleConnected(): Promise<void>;
}

/**
 * Toggle for managing Bluetooth settings.
 */
export declare class BluetoothToggle extends QuickMenuToggle {
    private _client: BtClient;
    private _deviceItems: Map<string, BluetoothDeviceItem>;
    private _deviceSection: PopupMenu.PopupMenuSection;
    private _placeholderItem: PopupMenu.PopupMenuItem;

    /** @hidden */
    _init(params: St.Button.ConstructorProps): void;

    /**
     * Initializes a new instance of `BluetoothToggle`.
     */
    _init(client: BtClient): void;

    private _onActiveChanged(): void;
    private _updatePlaceholder(): void;
    private _updateDeviceVisibility(): void;
    private _getSortedDevices(): any[]; // Replace with actual device array type
    private _removeDevice(path: string): void;
    private _reorderDeviceItems(): void;
    private _sync(): void;
    private _getIconNameFromState(state: GnomeBluetooth.AdapterState): string;
}

/**
 * System indicator for Bluetooth.
 */
export declare class Indicator extends SystemIndicator {
    private _client: BtClient;
    private _indicator: any; // Replace with actual indicator type

    /**
     * Initializes a new instance of `Indicator`.
     */
    _init(): void;

    private _sync(): void;
}
