// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/extensionSystem.js

import type Gio from '@girs/gio-2.0';

import * as Signals from '../misc/signals.js';
import type { ExtensionType } from '../misc/extensionUtils.js';
import type { ExtensionObject } from '../types/extension-object.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/dbusServices/extensions/extensionsService.js#L15
 * @version 49
 */
export namespace ExtensionManager {
    interface SignalMap {
        readonly 'extension-state-changed': [extension: ExtensionObject];
    }

    /**
     *
     * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/data/dbus-interfaces/org.gnome.Shell.Extensions.xml#L234
     * @version 49
     */
    interface OpenExtensionPrefsOptions {
        modal?: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/extensionSystem.js#L29
 * @version 49
 */
export class ExtensionManager<S extends Signals.SignalMap<S> = ExtensionManager.SignalMap> extends Signals.EventEmitter<S> {
    init(): void;

    get updatesSupported(): boolean;

    lookup(uuid: string): ExtensionObject;

    getUuids(): readonly string[];

    enableExtension(uuid: string): boolean;

    disableExtension(uuid: string): boolean;

    openExtensionPrefs(uuid: string, parentWindow: string, options: ExtensionManager.OpenExtensionPrefsOptions): boolean;

    notifyExtensionUpdate(uuid: string): void;

    logExtensionError(uuid: string, error: unknown): void;

    createExtensionObject(uuid: string, dir: Gio.File, type: ExtensionType): void;

    loadExtension(extension: ExtensionObject): Promise<void>;

    unloadExtension(extension: ExtensionObject): Promise<boolean>;

    reloadExtension(oldExtension: ExtensionObject): Promise<void>;
}
