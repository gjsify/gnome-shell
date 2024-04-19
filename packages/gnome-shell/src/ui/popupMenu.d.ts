// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-14';
import type Shell from '@girs/shell-14';
import type Clutter from '@girs/clutter-14';

import * as Signals from '../misc/signals.js';
import * as BoxPointer from './boxpointer.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L16
 * @version 46
 */
export enum Ornament {
    NONE = 0,
    DOT = 1,
    CHECK = 2,
    HIDDEN = 3,
    NO_DOT = 4,
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L39
 * @version 46
 */
export function arrowIcon(side: St.Side): St.Icon;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L67
 * @version 46
 */
declare namespace PopupBaseMenuItem {
    export interface ConstructorProps {
        reactive: boolean;
        activate: boolean;
        hover: boolean;
        style_class: string;
        can_focus: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L81
 * @version 46
 */
declare class PopupBaseMenuItem extends St.BoxLayout {
    readonly actor: PopupBaseMenuItem;
    active: boolean;
    sensitive: boolean;

    constructor(params?: Partial<PopupBaseMenuItem.ConstructorProps>);
    override _init(...args: any[]): void;

    activate(event: Clutter.Event): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'activate', callback: ($obj: PopupBaseMenuItem, event: Clutter.Event) => void): number;
    connect_after(sigName: 'activate', callback: ($obj: PopupBaseMenuItem, event: Clutter.Event) => void): number;

    syncSensitive(): boolean;
    getSensitive(): boolean;
    setSensitive(sensitive: boolean): void;
    setOrnament(ornament: Ornament): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L285
 * @version 46
 */
export namespace PopupMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L286
 * @version 46
 */
export class PopupMenuItem extends PopupBaseMenuItem {
    constructor(text: string, params?: Partial<PopupMenuItem.ConstructorProps>);
    override _init(text: string, params?: Partial<PopupMenuItem.ConstructorProps>): void;

    readonly label: St.Label;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L302
 * @version 46
 */
export class PopupSeparatorMenuItem extends PopupBaseMenuItem {
    constructor(text?: string);
    override _init(text?: string): void;

    readonly label: St.Label;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L332
 * @version 46
 */
export namespace Switch {
    export interface ConstructorProps extends St.Bin.ConstructorProps {
        state?: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L339
 * @version 46
 */
export class Switch extends St.Bin {
    state: boolean;
    constructor(state: boolean);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: Switch.ConstructorProps): void;
    override _init(state: boolean): void;

    setToggleState(state: boolean): void;
    toggle(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'notify::state', callback: ($obj: Switch) => void): number;
    connect_after(sigName: 'notify::state', callback: ($obj: Switch) => void): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L415
 * @version 46
 */
export namespace PopupSwitchMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L417
 * @version 46
 */
export class PopupSwitchMenuItem extends PopupBaseMenuItem {
    readonly state: boolean;

    constructor(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProps);
    override _init(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProps): void;

    setStatus(text: string): void;
    activate(event: Clutter.Event): void;
    toggle(): void;
    setToggleState(state: boolean): void;
    checkAccessibleState(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'toggled', callback: ($obj: PopupSwitchMenuItem, toggled: boolean) => void): number;
    connect_after(sigName: 'toggled', callback: ($obj: PopupSwitchMenuItem, toggled: boolean) => void): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L505
 * @version 46
 */
export namespace PopupImageMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L506
 * @version 46
 */
export class PopupImageMenuItem extends PopupBaseMenuItem {
    constructor(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProps);
    override _init(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProps): void;

    setIcon(icon: Gio.Icon | string): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L542
 * @version 46
 */
export namespace PopupMenuBase {
    interface SignalMap {}

    // PopupMenuBase.addMenuItem explicitly checks for any of these specific
    // types
    type MenuItemType = PopupMenuSection | PopupSubMenuMenuItem | PopupSeparatorMenuItem | PopupBaseMenuItem;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L542
 * @version 46
 */
export class PopupMenuBase<S extends Signals.SignalMap<S> = PopupMenuBase.SignalMap> extends Signals.EventEmitter<S> {
    protected constructor(sourceActor: St.Widget, styleClass?: string);
    readonly sourceActor: St.Widget;
    readonly focusActor: St.Widget;
    readonly length: number;
    readonly isOpen: boolean;
    readonly box: St.BoxLayout;
    sensitive: boolean;
    // PopupMenuBase._getMenuItems explicitly filters for these two types
    readonly firstMenuItem: PopupBaseMenuItem | PopupMenuSection;
    readonly numMenuItems: number;

    getSensitive(): boolean;
    setSensitive(sensitive: boolean): void;
    addAction(title: string, callback: () => void, icon?: Gio.Icon): void;
    addSettingsAction(title: string, desktopFile: string): void;
    isEmpty(): boolean;
    itemActivated(animate: boolean): void;
    moveMenuItem(item: PopupMenuBase.MenuItemType, position: number): void;
    addMenuItem(item: PopupMenuBase.MenuItemType, position?: number): void;
    removeAll(): void;
    toggle(): void;
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L871
 * @version 46
 */
export namespace PopupMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L871
 * @version 46
 */
export class PopupMenu<S extends Signals.SignalMap<S> = PopupMenu.SignalMap> extends PopupMenuBase<S> {
    constructor(sourceActor: St.Widget, arrowAlignment: number, arrowSide: St.Side);
    readonly actor: BoxPointer.BoxPointer;

    setArrowOrigin(origin: number): void;
    setSourceAlignment(alignment: number): void;
    open(animate: boolean): void;
    close(animate: boolean): void;
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1015
 * @version 46
 */
export class PopupDummyMenu extends Signals.EventEmitter {
    constructor(sourceActor: St.Widget);

    readonly actor: St.Widget;
    readonly sensitive: boolean;

    getSensitive(): boolean;
    open(): void;
    close(): void;
    toggle(): void;
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1053
 * @version 46
 */
export namespace PopupSubMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1053
 * @version 46
 */
export class PopupSubMenu<S extends Signals.SignalMap<S> = PopupSubMenu.SignalMap> extends PopupMenuBase<S> {
    actor: St.ScrollView;

    constructor(sourceActor: St.Widget, sourceArrow: St.Widget);

    readonly sensitive: boolean;

    getSensitive(): boolean;
    open(animate: boolean): void;
    close(animate: boolean): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1192
 * @version 46
 */
export namespace PopupMenuSection {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * PopupMenuSection:
 *
 * A section of a PopupMenu which is handled like a submenu
 * (you can add and remove items, you can destroy it, you
 * can add it to another menu), but is completely transparent
 * to the user
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1192
 * @version 46
 */
export class PopupMenuSection<S extends Signals.SignalMap<S> = PopupMenuSection.SignalMap> extends PopupMenuBase<S> {
    constructor();

    readonly actor: St.BoxLayout;

    open(): void;
    close(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1215
 * @version 46
 */
export class PopupSubMenuMenuItem extends PopupBaseMenuItem {
    readonly menu: PopupSubMenu;

    readonly label: St.Label;

    constructor(text: string, wantIcon?: boolean);
    override _init(text: string, wantIcon?: boolean): void;

    syncSensitive(): boolean;
    setSubmenuShown(open: boolean): void;
    activate(event: Clutter.Event): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1321
 * @version 46
 */
export namespace PopupMenuManager {
    export interface ConstructorProps {
        actionMode?: Shell.ActionMode;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1321
 * @version 46
 */
export class PopupMenuManager {
    constructor(owner: Clutter.Actor, grabParams?: PopupMenuManager.ConstructorProps);

    addMenu(menu: PopupMenuBase, position: number): void;
    removeMenu(menu: PopupMenuBase): void;
    ignoreRelease(): void;
}
