// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js

import type St from '@girs/st-14';
import Clutter from '@girs/clutter-14';

import * as Signals from '../misc/signals.js';
import type { PopupMenu, PopupDummyMenu } from './popupMenu.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js#L11
 * @version 46
 */
declare namespace ButtonBox {
    interface ConstructorProps extends St.Widget.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js#L12
 * @version 46
 */
declare class ButtonBox extends St.Widget {
    constructor(params?: ButtonBox.ConstructorProps);

    /** @hidden Defined to resolve version conflicts */
    _init(params: ButtonBox.ConstructorProps): void;
    container: St.Bin;

    public vfunc_get_preferred_width(_forHeight: number): [number, number];
    public vfunc_get_preferred_height(_forWidth: number): [number, number];

    public vfunc_allocate(box: Clutter.ActorBox): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js#L95
 * @version 46
 */
export namespace Button {
    interface SignalMap {
        readonly 'menu-set': [indicator: Button];
    }

    interface ConstructorProps extends ButtonBox.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js#L97
 * @version 46
 */

//TODO: also extend Signals.EventEmitter<Button.SignalMap>
export class Button extends ButtonBox {
    menu: PopupMenu | PopupDummyMenu;

    constructor(menuAlignment: number, nameText: string, dontCreateMenu?: boolean);

    /** @hidden Defined to resolve version conflicts */
    _init(params?: Button.ConstructorProps): void;
    _init(menuAlignment: number, nameText: string, dontCreateMenu?: boolean): void;

    setSensitive(sensitive: boolean): void;
    setMenu(menu: PopupMenu | PopupDummyMenu): void;

    public vfunc_event(event: Clutter.Event): boolean;

    public vfunc_hide(): void;
}
