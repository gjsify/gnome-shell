// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-14';
import type Shell from '@girs/shell-14';
import type Clutter from '@girs/clutter-14';
import type Meta from '@girs/meta-14';

import * as Signals from '../misc/signals.js';
import * as BoxPointer from './boxpointer.js';

/**
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
 * @version 46
 */
export function arrowIcon(side: St.Side): St.Icon;

declare namespace PopupBaseMenuItem {
    export interface ConstructorProperties {
        reactive?: boolean;
        activate?: boolean;
        hover?: boolean;
        style_class?: string;
        can_focus?: boolean;
    }
}

/**
 * @version 46
 */
declare class PopupBaseMenuItem extends St.BoxLayout {
    readonly actor: PopupBaseMenuItem;
    active: boolean;
    sensitive: boolean;

    constructor(params?: PopupBaseMenuItem.ConstructorProperties);
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

export namespace PopupMenuItem {
    export interface ConstructorProperties extends PopupBaseMenuItem.ConstructorProperties {}
}

/**
 * @version 46
 */
export class PopupMenuItem extends PopupBaseMenuItem {
    constructor(text: string, params?: PopupMenuItem.ConstructorProperties);
    override _init(text: string, params?: PopupMenuItem.ConstructorProperties): void;

    readonly label: St.Label;
}

/**
 * @version 46
 */
export class PopupSeparatorMenuItem extends PopupBaseMenuItem {
    constructor(text?: string);
    override _init(text?: string): void;

    readonly label: St.Label;
}

/**
 * @version 46
 */
export class Switch extends St.Bin {
    state: boolean;
    constructor(state: boolean);
    /** @hidden Defined only to resolve type conflicts */
    override _init(config?: St.Bin.ConstructorProperties): void;
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

export namespace PopupSwitchMenuItem {
    export interface ConstructorProperties extends PopupBaseMenuItem.ConstructorProperties {}
}

/**
 * @version 46
 */
export class PopupSwitchMenuItem extends PopupBaseMenuItem {
    readonly state: boolean;

    constructor(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProperties);
    override _init(text: string, active: boolean, params?: PopupSwitchMenuItem.ConstructorProperties): void;

    setStatus(text: string): void;
    activate(event: Clutter.Event): void;
    toggle(): void;
    setToggleState(state: boolean): void;
    checkAccessibleState(): void;
}

export namespace PopupImageMenuItem {
    export interface ConstructorProperties extends PopupBaseMenuItem.ConstructorProperties {}
}

/**
 * @version 46
 */
export class PopupImageMenuItem extends PopupBaseMenuItem {
    constructor(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProperties);
    override _init(text: string, icon: Gio.Icon | string, params?: PopupImageMenuItem.ConstructorProperties): void;

    setIcon(icon: Gio.Icon | string): void;
}

export namespace PopupMenuBase {
    interface SignalMap {}

    // PopupMenuBase.addMenuItem explicitly checks for any of these specific
    // types
    type MenuItemType = PopupMenuSection | PopupSubMenuMenuItem | PopupSeparatorMenuItem | PopupBaseMenuItem;
}

/**
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

export namespace PopupMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
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
 * @version 46
 */
export class PopupDummyMenu extends Signals.EventEmitter {
    constructor(sourceActor: St.Widget);

    readonly sensitive: boolean;

    getSensitive(): boolean;
    open(): void;
    close(): void;
    toggle(): void;
    destroy(): void;
}

export namespace PopupSubMenu {
    interface SignalMap extends PopupMenuBase.SignalMap {}
}

/**
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
 * @version 46
 */
export class PopupMenuSection<S extends Signals.SignalMap<S> = PopupMenuSection.SignalMap> extends PopupMenuBase<S> {
    constructor();

    open(): void;
    close(): void;
}

/**
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

export namespace PopupMenuManager {
    export interface ConstructorProperties {
        actionMode?: Shell.ActionMode;
    }
}

/**
 * @version 46
 */
export class PopupMenuManager {
    constructor(owner: any, grabParams?: PopupMenuManager.ConstructorProperties);

    addMenu(menu: PopupMenuBase, position: number): void;
    removeMenu(menu: PopupMenuBase): void;
    ignoreRelease(): void;
}
