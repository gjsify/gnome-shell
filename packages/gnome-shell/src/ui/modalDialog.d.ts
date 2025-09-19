// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/modalDialog.js

import type St from '@girs/st-17';
import type Shell from '@girs/shell-17';
import type Clutter from '@girs/clutter-17';

import type { MonitorConstraint } from './layout.js';
import type { ButtonInfo, Dialog } from './dialog.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/modalDialog.js#L19
 * @version 47
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
 * @version 47
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
 * @version 47
 */
export class ModalDialog extends St.Widget {
    _state: State;
    _hasModal: boolean;
    _actionMode: Shell.ActionMode;
    _shellReactive: boolean;
    _shouldFadeIn: boolean;
    _shouldFadeOut: boolean;
    _destroyOnClose: boolean;
    _backgroundBin: St.Bin;
    _monitorConstraint: MonitorConstraint;
    _initialKeyFocus: St.Widget | null;
    _initialKeyFocusDestroyId: number;
    _savedKeyFocus: St.Widget | null;

    backgroundStack: St.Widget;
    dialogLayout: Dialog;
    contentLayout: Dialog['contentLayout'];
    buttonLayout: Dialog['buttonLayout'];
    readonly state: State;

    constructor(params?: Partial<ModalDialog.ConstructorProps>);

    _init(params?: Partial<ModalDialog.ConstructorProps>): void;

    _setState(state: State): void;
    _fadeOpen(onPrimary: boolean): void;
    _closeComplete(): void;
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
    _fadeOutDialog(timestamp: number): void;

    vfunc_key_press_event(event: Clutter.Event): boolean;
    vfunc_captured_event(event: Clutter.Event): boolean;

    clearButtons(): void;
    setButtons(buttons: ButtonInfo[]): void;
    addButton(buttonInfo: ButtonInfo): St.Button;
    setInitialKeyFocus(actor: St.Widget): void;
    open(): boolean;
    close(): boolean;
    /**
     * Drop modal status without closing the dialog; this makes the
     * dialog insensitive as well, so it needs to be followed shortly
     * by either a close() or a pushModal()
     */
    popModal(): void;
    pushModal(): void;
}
