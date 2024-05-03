// https://github.com/GNOME/gnome-shell/blob/main/js/misc/loginManager.js

// loginManager.d.ts

import Gio from '@girs/gio-2.0';
import * as Signals from './signals.js';

/**
 * Class representing an interface to the systemd login manager.
 */
declare class LoginManagerSystemd extends Signals.EventEmitter {
    private _proxy: Gio.DBusProxy;
    private _userProxy: Gio.DBusProxy;
    private _currentSession: Gio.DBusProxy | null;

    constructor();

    /**
     * Retrieves a proxy for the current session.
     */
    getCurrentSessionProxy(): Promise<Gio.DBusProxy | null>;

    /**
     * Checks if the system can be suspended.
     */
    canSuspend(): Promise<{ canSuspend: boolean; needsAuth: boolean }>;

    /**
     * Checks if the system can reboot to the boot loader menu.
     */
    canRebootToBootLoaderMenu(): Promise<{ canRebootToBootLoaderMenu: boolean; needsAuth: boolean }>;

    /**
     * Sets the system to reboot to the boot loader menu.
     */
    setRebootToBootLoaderMenu(): void;

    /**
     * Lists all active sessions.
     */
    listSessions(): Promise<any[]>;

    /**
     * Suspends the system.
     */
    suspend(): void;

    /**
     * Inhibits the system from performing certain actions.
     * @param reason The reason for inhibition.
     * @param cancellable A Gio.Cancellable object.
     */
    inhibit(reason: string, cancellable: Gio.Cancellable): Promise<Gio.UnixInputStream | null>;
}

/**
 * Dummy class used when systemd is not available.
 */
declare class LoginManagerDummy extends Signals.EventEmitter {
    getCurrentSessionProxy(): Promise<void>;
    canSuspend(): Promise<{ canSuspend: boolean; needsAuth: boolean }>;
    canRebootToBootLoaderMenu(): Promise<{ canRebootToBootLoaderMenu: boolean; needsAuth: boolean }>;
    setRebootToBootLoaderMenu(): void;
    listSessions(): Promise<any[]>;
    suspend(): void;
    inhibit(): Promise<null>;
}

/**
 * Singleton instance of the LoginManager.
 */
declare const _loginManager: LoginManagerSystemd | LoginManagerDummy | null;

/**
 * Gets the login manager instance.
 * @returns The login manager instance.
 */
export declare function getLoginManager(): LoginManagerSystemd | LoginManagerDummy;

// Other functions, types, and interfaces can be defined below
