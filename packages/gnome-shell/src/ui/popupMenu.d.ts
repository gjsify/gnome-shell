// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-17';
import type Shell from '@girs/shell-17';
import type Clutter from '@girs/clutter-17';

import * as Signals from '../misc/signals.js';
import * as BoxPointer from './boxpointer.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L15
 * @version 49
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
 * @param side Side to which the arrow points.
 * @returns a new arrow icon
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L37
 * @version 49
 */
export function arrowIcon(side: St.Side): St.Icon;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L65
 * @version 49
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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L79
 * @version 49
 */
declare class PopupBaseMenuItem extends St.BoxLayout {
    readonly actor: PopupBaseMenuItem;
    active: boolean;
    sensitive: boolean;

    constructor(params?: Partial<PopupBaseMenuItem.ConstructorProps>);
    override _init(params?: Partial<PopupBaseMenuItem.ConstructorProps>): void;

    _getTopMenu(): St.BoxLayout;
    _setParent(parent: St.BoxLayout): void;
    override vfunc_key_press_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    override vfunc_key_focus_in(): void;
    override vfunc_key_focus_out(): void;
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
    _updateOrnamentStyle(): void;
}

/**
 * @version 49
 */
export namespace PopupMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L284
 * @version 49
 */
export class PopupMenuItem extends PopupBaseMenuItem {
    readonly label: St.Label;

    constructor(text: string, params?: Partial<PopupMenuItem.ConstructorProps>);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupMenuItem.ConstructorProps): void;
    override _init(text: string, params?: Partial<PopupMenuItem.ConstructorProps>): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L299
 * @version 49
 */
export class PopupSeparatorMenuItem extends PopupBaseMenuItem {
    readonly label: St.Label;

    constructor(text?: string);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupBaseMenuItem.ConstructorProps): void;
    override _init(text?: string): void;

    _syncVisibility(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L331
 * @version 49
 */
export namespace Switch {
    export interface ConstructorProps extends St.Widget.ConstructorProps {
        state?: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L338
 * @version 49
 */
export class Switch extends St.Widget {
    state: boolean;

    constructor(state: boolean);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: Switch.ConstructorProps): void;
    override _init(state: boolean): void;

    toggle(): void;
    _startDragging(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    override vfunc_motion_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    override vfunc_button_release_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    _touchDragging(actor: Clutter.Actor, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    _endDragging(): typeof Clutter.EVENT_PROPAGATE;
    _motionEvent(actor: Clutter.Actor, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L538
 * @version 49
 */
export namespace PopupSwitchMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {
        state: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L546
 * @version 49
 */
export class PopupSwitchMenuItem extends PopupBaseMenuItem {
    readonly label: St.Label;
    state: boolean;

    constructor(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProps);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupSwitchMenuItem.ConstructorProps): void;
    override _init(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProps): void;

    setStatus(text: string): void;
    override activate(event: Clutter.Event): void;
    toggle(): void;
    setToggleState(state: boolean): void;
    _onToggled(): void;
    _checkAccessibleState(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'toggled', callback: (item: PopupSwitchMenuItem, toggled: boolean) => void): number;
    connect_after(sigName: 'toggled', callback: (item: PopupSwitchMenuItem, toggled: boolean) => void): number;
}

/**
 * @version 49
 */
export namespace PopupImageMenuItem {
    export interface ConstructorProps extends PopupBaseMenuItem.ConstructorProps {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L648
 * @version 49
 */
export class PopupImageMenuItem extends PopupBaseMenuItem {
    readonly label: St.Label;

    constructor(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProps);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupImageMenuItem.ConstructorProps): void;
    override _init(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProps): void;

    setIcon(icon: Gio.Icon | string): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L684
 * @version 49
 */
export namespace PopupMenuBase {
    interface SignalMap {
        activate: [PopupBaseMenuItem | null];
        'active-changed': [PopupBaseMenuItem | null];
        'notify::sensitive': [];
        'open-state-changed': [boolean];
        'menu-closed': [];
        destroy: [];
    }

    // PopupMenuBase.addMenuItem explicitly checks for any of these specific types
    type MenuItemType = PopupMenuSection | PopupSubMenuMenuItem | PopupSeparatorMenuItem | PopupBaseMenuItem;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L684
 * @version 49
 */
export abstract class PopupMenuBase<S extends Signals.SignalMap<S> = PopupMenuBase.SignalMap> extends Signals.EventEmitter<S> {
    abstract readonly actor: Clutter.Actor;
    readonly sourceActor: Clutter.Actor;
    readonly focusActor: Clutter.Actor;
    readonly length: number;
    // Changed in subclasses
    isOpen: boolean;
    readonly box: St.BoxLayout;
    sensitive: boolean;
    // PopupMenuBase._getMenuItems explicitly filters for these two types
    readonly firstMenuItem: PopupBaseMenuItem | PopupMenuSection;
    readonly numMenuItems: number;

    constructor(sourceActor: Clutter.Actor, styleClass?: string);

    abstract open(animate?: BoxPointer.PopupAnimation): void;
    abstract close(animate?: BoxPointer.PopupAnimation): void;

    _getTopMenu(): PopupMenuBase<S>;
    _setParent(parent: PopupMenuBase<S> | null): void;
    getSensitive(): boolean;
    setSensitive(sensitive: boolean): void;
    _sessionUpdated(): void;
    addAction(title: string, callback: (event: Clutter.Event) => void, icon?: Gio.Icon): PopupBaseMenuItem;
    addSettingsAction(title: string, desktopFile: string): PopupBaseMenuItem;
    _setSettingsVisibility(visible: boolean): void;
    isEmpty(): boolean;
    itemActivated(animate?: BoxPointer.PopupAnimation | boolean): void;
    // _subMenuActiveChanged(submenu, submenuItem): void;
    _connectItemSignals(menuItem: PopupMenuBase.MenuItemType): void;
    _updateSeparatorVisibility(menuItem: PopupMenuBase.MenuItemType): void;
    moveMenuItem(item: PopupMenuBase.MenuItemType, position: number): void;
    addMenuItem(item: PopupMenuBase.MenuItemType, position?: number): void;
    _getMenuItems(): (PopupBaseMenuItem | PopupMenuSection)[];
    removeAll(): void;
    toggle(): void;
    destroy(): void;
}

/**
 * @version 49
 */
export namespace PopupMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1013
 * @version 49
 */
export class PopupMenu<S extends Signals.SignalMap<S> = PopupMenu.SignalMap> extends PopupMenuBase<S> {
    override readonly actor: BoxPointer.BoxPointer;
    _boxPointer: BoxPointer.BoxPointer;

    constructor(sourceActor: Clutter.Actor, arrowAlignment: number, arrowSide: St.Side);

    _setOpenedSubMenu(submenu: PopupMenuBase<S>): void;
    _onKeyPress(actor: Clutter.Actor, event: Clutter.Event): void;
    setArrowOrigin(origin: number): void;
    setSourceAlignment(alignment: number): void;
    override open(animate?: BoxPointer.PopupAnimation): void;
    override close(animate?: BoxPointer.PopupAnimation): void;
    override destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1164
 * @version 49
 */
export class PopupDummyMenu extends Signals.EventEmitter {
    readonly sourceActor: Clutter.Actor;
    readonly actor: Clutter.Actor;
    readonly sensitive: boolean;

    constructor(sourceActor: Clutter.Actor);

    getSensitive(): boolean;
    open(): void;
    close(): void;
    toggle(): void;
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1202
 * @version 49
 */
export namespace PopupSubMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1202
 * @version 49
 */
export class PopupSubMenu<S extends Signals.SignalMap<S> = PopupSubMenu.SignalMap> extends PopupMenuBase<S> {
    override readonly actor: St.ScrollView;
    readonly sensitive: boolean;

    constructor(sourceActor: Clutter.Actor, sourceArrow: Clutter.Actor);

    _needsScrollbar(): boolean;
    getSensitive(): boolean;
    // PopupSubMenu's methods technically use a boolean, but because PopupAnimation is just a number,
    // with PopupAnimation.NONE == 0, it can be used like a boolean, so at runtime it works.
    override open(animate?: BoxPointer.PopupAnimation): void;
    override close(animate?: BoxPointer.PopupAnimation): void;
    _onKeyPressEvent(actor: Clutter.Actor, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
}

/**
 * @version 49
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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1341
 * @version 49
 */
export class PopupMenuSection<S extends Signals.SignalMap<S> = PopupMenuSection.SignalMap> extends PopupMenuBase<S> {
    override readonly actor: St.BoxLayout;

    constructor();

    open(): void;
    close(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1363
 * @version 49
 */
export class PopupSubMenuMenuItem extends PopupBaseMenuItem {
    readonly icon?: St.Icon;
    readonly label: St.Label;
    readonly menu: PopupSubMenu;

    constructor(text: string, wantIcon?: boolean);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: PopupBaseMenuItem.ConstructorProps): void;
    override _init(text: string, wantIcon?: boolean): void;

    override _setParent(parent: St.BoxLayout): void;
    override syncSensitive(): boolean;
    override syncSensitive(): void;
    _subMenuOpenStateChanged(menu: PopupSubMenu, open: boolean): void;
    setSubmenuShown(open: boolean): void;
    _setOpenState(open: boolean): void;
    _getOpenState(): boolean;
    override vfunc_key_press_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    override activate(event: Clutter.Event): void;
}

/**
 * @version 49
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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/49.0/js/ui/popupMenu.js#L1470
 * @version 49
 */
export class PopupMenuManager {
    constructor(owner: Clutter.Actor, grabParams?: PopupMenuManager.ConstructorProps);

    addMenu(menu: PopupMenuBase, position?: number): void;
    removeMenu(menu: PopupMenuBase): void;
    ignoreRelease(): void;
    _onMenuOpenState(menu: PopupMenuBase, open: boolean): void;
    _changeMenu(newMenu: PopupMenuBase): void;
    _onCapturedEvent(actor: Clutter.Actor, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
    _findMenuForSource(source: Clutter.Actor): PopupMenuBase | null;
    _closeMenu(isUser: boolean, menu: PopupMenuBase): void;
}
