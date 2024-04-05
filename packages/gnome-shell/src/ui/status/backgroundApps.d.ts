// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/backgroundApps.js

import Gio from '@girs/gio-2.0';
import Shell from '@girs/shell-14';

import * as PopupMenu from '../popupMenu.js';
import { Spinner } from '../animation.js';
import { QuickToggle, SystemIndicator } from '../quickSettings.js';

declare const BackgroundMonitorProxy: typeof Gio.DBusProxy;

/**
 * Class for a menu item related to background applications.
 * This class extends `PopupMenu.PopupImageMenuItem`.
 */
export declare class BackgroundAppMenuItem extends PopupMenu.PopupImageMenuItem {
    private _spinner: Spinner;
    private _spinnerTimeoutId: number | null;
    app: Shell.App;
    message: string;

    /** @hidden */
    override _init(...args: any[]): void;
    /** @hidden */
    override _init(text: string, active: boolean, params?: PopupMenu.PopupSwitchMenuItem.ConstructorProps): void;

    /**
     * Initializes a new instance of `BackgroundAppMenuItem`.
     * @param app - The related Shell.App instance.
     * @param params - Additional parameters, including the message.
     */
    override _init(app: Shell.App, params?: { message?: string }): void;

    /**
     * Handles destruction of the menu item.
     */
    _onDestroy(): void;

    /**
     * Attempts to quit the associated application.
     */
    _quitApp(): Promise<void>;
}

/**
 * Toggle class for background applications.
 * This class extends `QuickToggle`.
 */
export declare class BackgroundAppsToggle extends QuickToggle {
    private _appSystem: typeof Shell.AppSystem;
    private _proxy: typeof BackgroundMonitorProxy | null;
    private _listTitle: PopupMenu.PopupMenuItem;
    private _appsSection: PopupMenu.PopupMenuSection;

    /**
     * Initializes a new instance of `BackgroundAppsToggle`.
     */
    _init(): void;

    /**
     * Syncs the visibility of the toggle based on the session state and background apps count.
     */
    _syncVisibility(): void;

    /**
     * Syncs the toggle state with the background applications.
     */
    _sync(): void;

    /**
     * Handles the 'clicked' event.
     */
    vfunc_clicked(): void;
}

/**
 * System indicator for background applications.
 * This class extends `SystemIndicator`.
 */
export declare class Indicator extends SystemIndicator {
    /**
     * Initializes a new instance of `Indicator`.
     */
    _init(): void;
}
