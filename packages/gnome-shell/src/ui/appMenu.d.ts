// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appMenu.js

import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';
import type Shell from '@girs/shell-17';

import type { PopupMenu, PopupSeparatorMenuItem, PopupMenuSection } from './popupMenu.js';
import type { getAppFavorites } from './appFavorites.js';
import type { getDefault } from '../misc/parentalControlsManager.js';

export class AppMenu extends PopupMenu {
    _app: Shell.App | null;
    _appSystem: Shell.AppSystem;
    _parentalControlsManager: ReturnType<typeof getDefault>;
    _appFavorites: ReturnType<typeof getAppFavorites>;
    _enableFavorites: boolean;
    _showSingleWindows: boolean;

    _windowsChangedId: number;
    _updateWindowsLaterId: number;

    _openWindowsHeader: PopupSeparatorMenuItem;
    _windowSection: PopupMenuSection;
    _newWindowItem: ReturnType<typeof this.addAction>;
    _actionSection: PopupMenuSection;
    _onGpuMenuItem: ReturnType<typeof this.addAction>;
    _detailsItem: ReturnType<typeof this.addAction>;
    _quitItem: ReturnType<typeof this.addAction>;

    /**
     * @param sourceActor - actor the menu is attached to
     * @param side - arrow side
     * @param params - options
     * @param params.favoritesSection - show items to add/remove favorite
     * @param params.showSingleWindow - show window section for a single window
     */
    constructor(sourceActor: Clutter.Actor, side?: St.Side, params?: { favoritesSection?: boolean; showSingleWindow: boolean });

    _onAppStateChanged(sys: any, app: any): void;
    _updateQuitItem(): void;
    _updateNewWindowItem(): void;
    _updateFavoriteItem(): void;
    _updateGpuItem(): void;
    _updateDetailsVisibility(): void;
    _animateLaunch(): void;
    _getNonDefaultLaunchGpu(): Shell.AppLaunchGpu;
    _queueUpdateWindowsSection(): void;
    _updateWindowsSection(): void;

    destroy(): void;

    /**
     * @returns true if the menu is empty
     */
    isEmpty(): boolean;

    /**
     * @param app the app the menu represents
     */
    setApp(app: Shell.App): void;
}
