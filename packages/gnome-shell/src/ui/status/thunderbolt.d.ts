// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/thunderbolt.js

import Gio from '@girs/gio-2.0';

import * as Signals from '../../misc/signals.js';
import { SystemIndicator } from '../quickSettings.js';
import * as MessageTray from '../messageTray.js';

declare const BoltClientInterface: string;
declare const BoltDeviceInterface: string;

declare const BOLT_DBUS_CLIENT_IFACE: string;
declare const BOLT_DBUS_NAME: string;
declare const BOLT_DBUS_PATH: string;

/**
 * Enum for Bolt device status.
 */
export enum Status {
    DISCONNECTED = 'disconnected',
    CONNECTING = 'connecting',
    CONNECTED = 'connected',
    AUTHORIZING = 'authorizing',
    AUTH_ERROR = 'auth-error',
    AUTHORIZED = 'authorized',
}

/**
 * Enum for Bolt device policy.
 */
export enum Policy {
    DEFAULT = 'default',
    MANUAL = 'manual',
    AUTO = 'auto',
}

/**
 * Enum for Bolt device authorization control.
 */
export enum AuthCtrl {
    NONE = 'none',
}

/**
 * Enum for Bolt device authorization mode.
 */
export enum AuthMode {
    DISABLED = 'disabled',
    ENABLED = 'enabled',
}

/**
 * A proxy wrapper for a Bolt device.
 */
export const BoltDeviceProxy: Gio.DBusProxy;

/**
 * Client class for interacting with Bolt service.
 */
export class Client extends Signals.EventEmitter {
    private _proxy: Gio.DBusProxy | null;
    public probing: boolean;

    /**
     * Initializes a new instance of Client.
     */
    constructor();

    /**
     * Asynchronously gets the Bolt D-Bus proxy.
     */
    private _getProxy(): Promise<void>;

    /**
     * Handles changes in Bolt properties.
     */
    private _onPropertiesChanged(proxy: any, properties: any): void;

    /**
     * Handles the addition of new devices.
     */
    private _onDeviceAdded(proxy: any, emitter: any, params: any): void;

    /**
     * Closes the client and cleans up resources.
     */
    close(): void;

    /**
     * Enrolls a device with the specified policy.
     */
    enrollDevice(id: string, policy: Policy): Promise<any>;

    /**
     * Gets the current authorization mode.
     */
    get authMode(): AuthMode;
}

/**
 * Helper class to automatically authorize new devices.
 */
export class AuthRobot extends Signals.EventEmitter {
    private _client: Client;
    private _devicesToEnroll: any[];
    private _enrolling: boolean;

    /**
     * Initializes a new instance of AuthRobot.
     * @param client The Bolt client instance.
     */
    constructor(client: Client);

    /**
     * Closes the AuthRobot and disconnects all signals.
     */
    close(): void;

    /**
     * Handles the addition of new devices.
     */
    private _onDeviceAdded(cli: any, dev: any): void;

    /**
     * Starts the enrollment process for devices.
     */
    private _enrollDevices(): void;

    /**
     * Idle callback for enrolling devices.
     */
    private _enrollDevicesIdle(): Promise<void>;
}

/**
 * System indicator for Thunderbolt devices.
 */
export class Indicator extends SystemIndicator {
    _source: MessageTray.Source | null;

    _init(): void;

    _createPermission(): Promise<void>;

    _onDestroy(): void;

    _ensureSource(): MessageTray.Source;

    _notify(title: string, body: string): void;

    /* Session callbacks */
    _sync(): void;

    /* Bolt.Client callbacks */
    _onProbing(cli: any, probing: any): void;

    /* AuthRobot callbacks */
    _onEnrollDevice(obj: any, device: any, policy: any): void;

    _onEnrollFailed(obj: any, device: any, error: any): void;
}
