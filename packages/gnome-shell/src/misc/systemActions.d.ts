// https://github.com/GNOME/gnome-shell/blob/main/js/misc/systemActions.js

import AccountsService from '@girs/accountsservice-1.0';
import Gio from '@girs/gio-2.0';
import GObject from '@girs/gobject-2.0';

import { SessionManager } from './gnomeSession.js';
import * as LoginManager from './loginManager.js';

export interface ActionDetails {
    name: string;
    iconName: string;
    // Translators: A list of keywords that match the power-off action, separated by semicolons
    keywords: string[];
    available: boolean;
}

/**
 * Class representing system-wide actions such as power off, restart, lock screen, etc.
 */
declare class SystemActions extends GObject.Object {
    private _canHavePowerOff: boolean;
    private _canHaveSuspend: boolean;
    private _suspendNeedsAuth: boolean;
    private _loginScreenSettings: Gio.Settings;
    private _lockdownSettings: Gio.Settings;
    private _orientationSettings: Gio.Settings;
    private _session: ReturnType<typeof SessionManager>;
    private _loginManager: ReturnType<typeof LoginManager.getLoginManager>;
    private _userManager: AccountsService.UserManager;
    private _actions: Map<string, ActionDetails>;

    constructor();

    /**
     * Checks if the system can be powered off.
     */
    get canPowerOff(): boolean;

    /**
     * Checks if the system can be restarted.
     */
    get canRestart(): boolean;

    /**
     * Checks if the system can be suspended.
     */
    get canSuspend(): boolean;

    /**
     * Checks if the screen can be locked.
     */
    get canLockScreen(): boolean;

    /**
     * Checks if user switching is allowed.
     */
    get canSwitchUser(): boolean;

    /**
     * Checks if logout is possible.
     */
    get canLogout(): boolean;

    /**
     * Checks if orientation lock is possible.
     */
    get canLockOrientation(): boolean;

    /**
     * Gets the icon for the orientation lock.
     */
    get orientationLockIcon(): string;

    // Other methods...
}

/**
 * Singleton instance of `SystemActions`.
 */
declare const _singleton: SystemActions | null;

/**
 * Get the default `SystemActions` instance.
 */
export function getDefault(): SystemActions;

// Define any additional types, interfaces, etc., used within the class here
