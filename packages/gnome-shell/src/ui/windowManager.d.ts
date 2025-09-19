// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/windowManager.js

import type Clutter from 'gi://Clutter';
import type Gio from 'gi://Gio';
import type Meta from 'gi://Meta';
import type Shell from 'gi://Shell';
import type St from '@girs/st-17';
import type Mtk from '@girs/mtk-17';
import type { Monitor } from './layout.js';
import type { Workspace } from './workspace.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/windowManager.js#L28
 * @version 48
 */
export const SHELL_KEYBINDINGS_SCHEMA: string;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/windowManager.js#L134
 * @version 48
 */
export class WindowDimmer extends Clutter.BrightnessContrastEffect {
    _init(): void;

    _syncEnabled(dimmed: boolean): void;

    setDimmed(dimmed: boolean, animate: boolean): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/windowManager.js#L394
 * @version 48
 */
export class TilePreview extends St.Widget {
    _init(): void;

    open(window: Meta.Window, tileRect: Mtk.Rectangle, monitorIndex: number): void;

    close(): void;

    _reset(): void;

    _updateStyle(monitor: Monitor): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/windowManager.js#L508
 * @version 48
 */
export class WindowManager {
    insertWorkspace(pos: number): void;

    keepWorkspaceAlive(workspace: Workspace, duration: number): void;

    skipNextEffect(actor: Clutter.Actor): void;

    setCustomKeybindingHandler(name: string, modes: Shell.ActionMode, handler: Meta.KeyHandlerFunc): void;

    addKeybinding(name: string, settings: Gio.Settings, flags: Meta.KeyBindingFlags, modes: Shell.ActionMode, handler: Meta.KeyHandlerFunc): number;

    removeKeybinding(name: string): void;

    allowKeybinding(name: string, modes: Shell.ActionMode): void;

    actionMoveWorkspace(workspace: Workspace): void;

    actionMoveWindow(window: Meta.Window, workspace: Workspace): void;

    handleWorkspaceScroll(event: Clutter.Event): boolean;
}
