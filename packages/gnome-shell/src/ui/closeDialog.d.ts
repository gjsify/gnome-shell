import type GObject from '@girs/gobject-2.0';
import type Meta from '@girs/meta-14';

import { Dialog, MessageDialogContent } from './dialog.js';

export class CloseDialog extends GObject.Object {
    protected _window: Meta.Window;
    protected _dialog: Dialog | null;
    protected _tracked: boolean;
    protected _timeoutId: number;

    public window: Meta.Window;

    public constructor(window: Meta.Window);
    public _init(window: Meta.Window): void;

    protected _createDialogContent(): MessageDialogContent;
    protected _updateScale(): void;
    protected _initDialog(): void;
    protected _addWindowEffect(): void;
    protected _removeWindowEffect(): void;
    protected _onWait(): void;
    protected _onClose(): void;
    protected _onFocusChanged(): void;

    public vfunc_show(): void;
    public vfunc_hide(): void;
    public vfunc_focus(): void;
}
