import type GObject from '@girs/gobject-2.0';
import type Meta from '@girs/meta-17';

import { Dialog, MessageDialogContent } from './dialog.js';

export class CloseDialog extends GObject.Object {
    _window: Meta.Window;
    _dialog: Dialog | null;
    _tracked: boolean;
    _timeoutId: number;

    window: Meta.Window;

    constructor(window: Meta.Window);
    _init(window: Meta.Window): void;

    _createDialogContent(): MessageDialogContent;
    _updateScale(): void;
    _initDialog(): void;
    _addWindowEffect(): void;
    _removeWindowEffect(): void;
    _onWait(): void;
    _onClose(): void;
    _onFocusChanged(): void;

    vfunc_show(): void;
    vfunc_hide(): void;
    vfunc_focus(): void;
}
