// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-16';
import type Shell from '@girs/shell-16';
import type Clutter from '@girs/clutter-16';

import * as Signals from '../misc/signals.js';
import * as BoxPointer from './boxpointer.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L15
 * @version 48
 */
export enum Ornament {
    NONE = 0,
    DOT = 1,
    CHECK = 2,
    HIDDEN = 3,
    NO_DOT = 4,
}

/**
 * arrowIcon
 *
 * @param side - Side to which the arrow points.
 * @returns a new arrow icon
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#37
 * @version 48
 */
export function arrowIcon(side: St.Side): St.Icon;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L81
 * @version 48
 */
declare namespace PopupBaseMenuItem {
    export interface ConstructorProps {
        reactive: boolean;
        activate: boolean;
        hover: boolean;
        style_class: string | null;
        can_focus: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L79
 * @version 48
 */
declare class PopupBaseMenuItem extends St.BoxLayout {
    readonly actor: PopupBaseMenuItem;
    active: boolean;
    sensitive: boolean;

    constructor(params?: Partial<PopupBaseMenuItem.ConstructorProps>);
    override _init(params?: Partial<PopupBaseMenuItem.ConstructorProps>): void;

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
 * @version 48
 */
export namespace PopupMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L284
 * @version 48
 */
export class PopupMenuItem extends PopupBaseMenuItem {
    constructor(text: string, params?: Partial<PopupMenuItem.ConstructorProps>);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupMenuItem.ConstructorProps): void;
    override _init(text: string, params?: Partial<PopupMenuItem.ConstructorProps>): void;

    readonly label: St.Label;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L300
 * @version 48
 */
export class PopupSeparatorMenuItem extends PopupBaseMenuItem {
    constructor(text?: string);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupBaseMenuItem.ConstructorProps): void;
    override _init(text?: string): void;

    readonly label: St.Label;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L330
 * @version 48
 */
export namespace Switch {
    export interface ConstructorProps extends St.Bin.ConstructorProps {
        state?: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L338
 * @version 48
 */
export class Switch extends St.Widget {
    state: boolean;

    constructor(state: boolean);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: Switch.ConstructorProps): void;
    override _init(state: boolean): void;

    toggle(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'notify::state', callback: ($obj: Switch) => void): number;
    connect_after(sigName: 'notify::state', callback: ($obj: Switch) => void): number;

    vfunc_motion_event(): typeof Clutter.EVENT_PROPAGATE;
    vfunc_button_release_event(): typeof Clutter.EVENT_PROPAGATE;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L415
 * @version 48
 */
export namespace PopupSwitchMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {
        state: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L542
 * @version 48
 */
export class PopupSwitchMenuItem extends PopupBaseMenuItem {
    readonly label: St.Label;
    state: boolean;

    constructor(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProps);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupSwitchMenuItem.ConstructorProps): void;
    override _init(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProps): void;

    setStatus(text: string): void;
    activate(event: Clutter.Event): void;
    toggle(): void;
    setToggleState(state: boolean): void;
    _checkAccessibleState(): void;

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
 * @version 48
 */
export namespace PopupImageMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L644
 * @version 48
 */
export class PopupImageMenuItem extends PopupBaseMenuItem {
    constructor(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProps);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupImageMenuItem.ConstructorProps): void;
    override _init(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProps): void;

    readonly label: St.Label;

    setIcon(icon: Gio.Icon | string): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L542
 * @version 48
 */
export namespace PopupMenuBase {
    interface SignalMap {
        'open-state-changed': [boolean];
    }

    // PopupMenuBase.addMenuItem explicitly checks for any of these specific
    // types
    type MenuItemType = PopupMenuSection | PopupSubMenuMenuItem | PopupSeparatorMenuItem | PopupBaseMenuItem;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L680
 * @version 48
 */
export abstract class PopupMenuBase<S extends Signals.SignalMap<S> = PopupMenuBase.SignalMap> extends Signals.EventEmitter<S> {
    constructor(sourceActor: St.Widget, styleClass?: string);

    abstract actor: St.Widget;
    readonly sourceActor: St.Widget;
    readonly focusActor: St.Widget;
    readonly length: number;
    readonly isOpen: boolean;
    readonly box: St.BoxLayout;
    sensitive: boolean;
    // PopupMenuBase._getMenuItems explicitly filters for these two types
    readonly firstMenuItem: PopupBaseMenuItem | PopupMenuSection;
    readonly numMenuItems: number;

    abstract open(animate?: BoxPointer.PopupAnimation): void;
    abstract close(animate?: BoxPointer.PopupAnimation): void;

    getSensitive(): boolean;
    setSensitive(sensitive: boolean): void;
    addAction(title: string, callback: () => void, icon?: Gio.Icon): void;
    addSettingsAction(title: string, desktopFile: string): void;
    isEmpty(): boolean;
    itemActivated(animate: boolean): void;
    moveMenuItem(item: PopupMenuBase.MenuItemType, position: number): void;
    addMenuItem(item: PopupMenuBase.MenuItemType, position?: number): void;
    _getMenuItems(): (PopupBaseMenuItem | PopupMenuSection)[];
    removeAll(): void;
    toggle(): void;
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L871
 * @version 48
 */
export namespace PopupMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1009
 * @version 48
 */
export class PopupMenu<S extends Signals.SignalMap<S> = PopupMenu.SignalMap> extends PopupMenuBase<S> {
    constructor(sourceActor: St.Widget, arrowAlignment: number, arrowSide: St.Side);

    override actor: BoxPointer.BoxPointer;
    _boxPointer: BoxPointer.BoxPointer;

    setArrowOrigin(origin: number): void;
    setSourceAlignment(alignment: number): void;
    override open(animate?: BoxPointer.PopupAnimation): void;
    override close(animate?: BoxPointer.PopupAnimation): void;
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1153
 * @version 48
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
 * @version 48
 */
export namespace PopupSubMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1191
 * @version 48
 */
export class PopupSubMenu<S extends Signals.SignalMap<S> = PopupSubMenu.SignalMap> extends PopupMenuBase<S> {
    readonly actor: St.ScrollView;

    constructor(sourceActor: St.Widget, sourceArrow: St.Widget);

    readonly sensitive: boolean;

    getSensitive(): boolean;

    // PopupSubMenu's methods technically use a boolean, but because PopupAnimation is just a number,
    // with PopupAnimation.NONE == 0, it can be used like a boolean, so at runtime it works.
    override open(animate?: BoxPointer.PopupAnimation): void;
    override close(animate?: BoxPointer.PopupAnimation): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1192
 * @version 48
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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1330
 * @version 48
 */
export class PopupMenuSection<S extends Signals.SignalMap<S> = PopupMenuSection.SignalMap> extends PopupMenuBase<S> {
    constructor();

    readonly actor: St.BoxLayout;

    open(): void;
    close(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1353
 * @version 48
 */
export class PopupSubMenuMenuItem extends PopupBaseMenuItem {
    readonly icon?: St.Icon;
    readonly label: St.Label;
    readonly menu: PopupSubMenu;

    constructor(text: string, wantIcon?: boolean);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupBaseMenuItem.ConstructorProps): void;
    override _init(text: string, wantIcon?: boolean): void;

    syncSensitive(): boolean;
    setSubmenuShown(open: boolean): void;
    activate(event: Clutter.Event): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1321
 * @version 48
 */
export namespace PopupMenuManager {
    export interface ConstructorProps {
        actionMode?: Shell.ActionMode;
    }
}

/**
 * Basic implementation of a menu manager.
 * Call addMenu to add menus
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js#L1459
 * @version 48
 */
export class PopupMenuManager {
    constructor(owner: Clutter.Actor, grabParams?: PopupMenuManager.ConstructorProps);

    addMenu(menu: PopupMenuBase, position?: number): void;
    removeMenu(menu: PopupMenuBase): void;
    ignoreRelease(): void;
}
