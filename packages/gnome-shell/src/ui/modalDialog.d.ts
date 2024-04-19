// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/modalDialog.js

import type St from '@girs/st-14';
import type Shell from '@girs/shell-14';
import type Clutter from '@girs/clutter-14';

import type { MonitorConstraint } from './layout.js';
import type { ButtonInfo, Dialog } from './dialog.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/modalDialog.js#L19
 * @version 46
 */
export enum State {
    OPENED = 0,
    CLOSED = 1,
    OPENING = 2,
    CLOSING = 3,
    FADED_OUT = 4,
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/modalDialog.js#L27
 * @version 46
 */
export namespace ModalDialog {
    export interface ConstructorProps extends St.Widget.ConstructorProps {
        shellReactive: boolean;
        actionMode: Shell.ActionMode;
        shouldFadeIn: boolean;
        shouldFadeOut: boolean;
        destroyOnClose: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/modalDialog.js#L37
 * @version 46
 */
export class ModalDialog extends St.Widget {
    protected _state: State;
    protected _hasModal: boolean;
    protected _actionMode: Shell.ActionMode;
    protected _shellReactive: boolean;
    protected _shouldFadeIn: boolean;
    protected _shouldFadeOut: boolean;
    protected _destroyOnClose: boolean;
    protected _backgroundBin: St.Bin;
    protected _monitorConstraint: MonitorConstraint;
    protected _initialKeyFocus: St.Widget | null;
    protected _initialKeyFocusDestroyId: number;
    protected _savedKeyFocus: St.Widget | null;

    public backgroundStack: St.Widget;
    public dialogLayout: Dialog;
    public contentLayout: Dialog['contentLayout'];
    public buttonLayout: Dialog['buttonLayout'];
    public state: State;

    constructor(params?: Partial<ModalDialog.ConstructorProps>);

    public _init(params?: Partial<ModalDialog.ConstructorProps>): void;

    protected _setState(state: State): void;
    protected _fadeOpen(onPrimary: boolean): void;
    protected _closeComplete(): void;
    /**
     * This method is like close, but fades the dialog out much slower,
     * and leaves the lightbox in place. Once in the faded out state,
     * the dialog can be brought back by an open call, or the lightbox
     * can be dismissed by a close call.
     *
     * The main point of this method is to give some indication to the user
     * that the dialog response has been acknowledged but will take a few
     * moments before being processed.
     * e.g., if a user clicked "Log Out" then the dialog should go away
     * immediately, but the lightbox should remain until the logout is
     * complete.
     */
    protected _fadeOutDialog(timestamp: number): void;

    public vfunc_key_press_event(event: Clutter.Event): boolean;
    public vfunc_captured_event(event: Clutter.Event): boolean;

    public clearButtons(): void;
    public setButtons(buttons: ButtonInfo[]): void;
    public addButton(buttonInfo: ButtonInfo): St.Button;
    public setInitialKeyFocus(actor: St.Widget): void;
    public open(): boolean;
    public close(): boolean;
    /**
     * Drop modal status without closing the dialog; this makes the
     * dialog insensitive as well, so it needs to be followed shortly
     * by either a close() or a pushModal()
     */
    public popModal(): void;
    public pushModal(): void;
}
