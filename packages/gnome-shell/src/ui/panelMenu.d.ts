// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js

import type St from '@girs/st-14';
import Clutter from '@girs/clutter-14';

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
    constructor(params?: Partial<ButtonBox.ConstructorProps>);
    /** @hidden Defined to resolve version conflicts */
    _init(params: Partial<ButtonBox.ConstructorProps>): void;
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
    interface ConstructorProps extends ButtonBox.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js#L97
 * @version 46
 */
export class Button extends ButtonBox {
    menu: PopupMenu | PopupDummyMenu;

    constructor(menuAlignment: number, nameText: string, dontCreateMenu?: boolean);

    /** @hidden Defined to resolve version conflicts */
    _init(params?: Partial<ButtonBox.ConstructorProps>): void;
    _init(menuAlignment: number, nameText: string, dontCreateMenu?: boolean): void;

    setSensitive(sensitive: boolean): void;
    setMenu(menu: PopupMenu | PopupDummyMenu): void;

    public vfunc_event(event: Clutter.Event): boolean;

    public vfunc_hide(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'menu-set', callback: ($obj: Button) => void): number;
    connect_after(sigName: 'menu-set', callback: ($obj: Button) => void): number;
}
