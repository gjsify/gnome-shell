// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/audioDeviceSelection.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-17';

import type { ModalDialog } from './modalDialog.js';

export enum AudioDevice {
    HEADPHONES = 1 << 0,
    HEADSET = 1 << 1,
    MICROPHONE = 1 << 2,
}

declare class AudioDeviceSelectionDialog extends ModalDialog {
    constructor(devices: number);

    /** @hidden */
    _init(params?: Partial<St.Widget.ConstructorProps>): void;
    /** @hidden */
    _init(props?: Partial<ModalDialog.ConstructorProps>): void;
    _init(devices: number): void;

    _buildLayout(): void;
    _getDeviceLabel(device: AudioDevice): string | null;
    _getDeviceIcon(device: AudioDevice): string | null;
    _addDevice(device: AudioDevice): void;
    _openSettings(): void;
}

export class AudioDeviceSelectionDBus {
    _audioSelectionDialog: AudioDeviceSelectionDialog | null;
    _dbusImpl: Gio.DBusExportedObject;

    constructor();

    _onDialogClosed(): void;
    _onDeviceSelected(dialog: AudioDeviceSelectionDialog, device: AudioDevice): void;

    OpenAsync(params: string[], invocation: Gio.DBusMethodInvocation): void;
    CloseAsync(params: any, invocation: Gio.DBusMethodInvocation): void;
}
