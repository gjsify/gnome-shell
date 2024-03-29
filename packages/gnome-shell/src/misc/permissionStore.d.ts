// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/permissionStore.js

// permissionStore.d.ts

import Gio from '@girs/gio-2.0';

/**
 * Represents the D-Bus interface for the Permission Store.
 * This interface provides methods to access and manage permission data.
 */
export interface PermissionStoreIface extends Gio.DBusInterface {
    // Define methods and properties of PermissionStoreIface here
}

/**
 * Creates a proxy for accessing the Permission Store via D-Bus.
 */
export declare class PermissionStoreProxy extends Gio.DBusProxy {
    /**
     * Creates a new PermissionStoreProxy instance.
     * @param connection The D-Bus connection to use.
     * @param name The name of the D-Bus service.
     * @param objectPath The object path of the D-Bus service.
     * @param initCallback Callback function for initialization.
     * @param cancellable A Gio.Cancellable or null.
     */
    constructor(connection: Gio.DBusConnection, name: string, objectPath: string, initCallback: Function, cancellable: Gio.Cancellable | null);
}

/**
 * Creates a new instance of the Permission Store proxy.
 * @param initCallback Callback function to be called when the proxy is initialized.
 * @param cancellable A Gio.Cancellable to cancel the operation, or null.
 * @returns An instance of the Permission Store proxy.
 */
export declare function PermissionStore(initCallback: Function, cancellable: Gio.Cancellable | null): PermissionStoreProxy;
