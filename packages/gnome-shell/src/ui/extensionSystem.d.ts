// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/extensionSystem.js

import type Gio from '@girs/gio-2.0';

import * as Signals from '../misc/signals.js';
import type { ExtensionState, ExtensionType } from '../misc/extensionUtils.js';
import type { Extension } from '../extensions/extension.js';

// This is different from the one in extension.js because it encodes the raw
// metadata loaded directly from metadata.json
interface ExtensionMetadata extends Record<string, any> {
    // GNOME Shell checks these properties
    readonly uuid: string;
    readonly name: string;
    readonly description: string;
    readonly 'shell-version': readonly string[];
}

export interface ExtensionObject {
    readonly metadata: ExtensionMetadata;
    readonly uuid: string;
    readonly type: ExtensionType;
    readonly dir: Gio.File;
    readonly path: string | null;
    readonly error: string;
    readonly hasPrefs: boolean;
    readonly hasUpdate: boolean;
    readonly canChange: boolean;
    readonly sessionModes: readonly string[];
    readonly state?: ExtensionState;
    readonly stateObj?: Extension;
}

export namespace ExtensionManager {
    interface SignalMap {
        readonly 'extension-state-changed': [extension: ExtensionObject];
    }

    // See "OpenExtensionPrefs" in https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/data/dbus-interfaces/org.gnome.Shell.Extensions.xml
    interface OpenExtensionPrefsOptions {
        modal?: boolean;
    }
}

/**
 * @version 46
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
