import type Gio from '@girs/gio-2.0';

import type { Extension } from '../extensions/extension.js';
import type { ExtensionState, ExtensionType } from '../misc/extensionUtils.js';
import type { MetadataJson } from './extension-metadata.js';

/**
 *
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/extensionSystem.js#L381
 * @version 49
 */
export interface ExtensionObject {
    readonly metadata: MetadataJson;
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
