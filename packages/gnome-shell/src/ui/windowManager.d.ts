import type Clutter from 'gi://Clutter';
import type Gio from 'gi://Gio';
import type Meta from 'gi://Meta';
import type Shell from 'gi://Shell';

export class WindowManager {
    insertWorkspace(pos: number): void;

    setCustomKeybindingHandler(name: string, modes: Shell.ActionMode, handler: Meta.KeyHandlerFunc): void;

    addKeybinding(name: string, settings: Gio.Settings, flags: Meta.KeyBindingFlags, modes: Shell.ActionMode, handler: Meta.KeyHandlerFunc): number;

    removeKeybinding(name: string): void;

    allowKeybinding(name: string, modes: Shell.ActionMode): void;

    handleWorkspaceScroll(event: Clutter.Event): boolean;
}
