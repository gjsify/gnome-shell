// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/audioDeviceSelection.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-14';

import type { ModalDialog } from './modalDialog.js';

export enum AudioDevice {
    HEADPHONES = 1 << 0,
    HEADSET = 1 << 1,
    MICROPHONE = 1 << 2,
}

declare class AudioDeviceSelectionDialog extends ModalDialog {
    constructor(devices: number);

    /** @hidden */
    public _init(params?: Partial<St.Widget.ConstructorProps>): void;
    /** @hidden */
    public _init(props?: Partial<ModalDialog.ConstructorProps>): void;
    public _init(devices: number): void;

    protected _buildLayout(): void;
    protected _getDeviceLabel(device: AudioDevice): string | null;
    protected _getDeviceIcon(device: AudioDevice): string | null;
    protected _addDevice(device: AudioDevice): void;
    protected _openSettings(): void;
}

export class AudioDeviceSelectionDBus {
    protected _audioSelectionDialog: AudioDeviceSelectionDialog | null;
    protected _dbusImpl: Gio.DBusExportedObject;

    constructor();

    protected _onDialogClosed(): void;
    protected _onDeviceSelected(dialog: AudioDeviceSelectionDialog, device: AudioDevice): void;

    OpenAsync(params: string[], invocation: Gio.DBusMethodInvocation): void;
    CloseAsync(params: any, invocation: Gio.DBusMethodInvocation): void;
}
