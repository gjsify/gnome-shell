// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js

import type Clutter from '@girs/clutter-17';
import type Shell from '@girs/shell-17';
import type St from '@girs/st-17';

import { AppIcon } from './appDisplay.js';
import { DragEvent, DragMonitor, DragMotionResult } from './dnd.js';
import { BaseIcon } from './iconGrid.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L22
 * @version 49
 */
export class DashIcon extends AppIcon {
    constructor(app: Shell.App);

    _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;
    _init(app: Shell.App, iconParams?: Partial<AppIcon.ConstructorProps>): void;

    scaleAndFade(): void;
    undoScaleAndFade(): void;
    handleDragOver(): DragMotionResult;
    acceptDrop(): boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L49
 * @version 49
 */
export class DashItemContainer extends St.Widget {
    label: St.Label;
    child: St.Widget;
    animatingOut: boolean;

    _labelText: string;

    constructor(params?: Partial<St.Widget.ConstructorProps>);
    _init(): void;

    vfunc_get_preferred_height(forWidth: number): [number, number];
    vfunc_get_preferred_width(forHeight: number): [number, number];

    showLabel(): void;
    setLabelText(text: string): void;
    hideLabel(): void;
    setChild(actor: St.Widget): void;
    show(animate?: boolean): void;
    animateOutAndDestroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L190
 * @version 49
 */
export class ShowAppsIcon extends DashItemContainer {
    toggleButton: St.Button;
    icon: BaseIcon;

    _iconActor: St.Icon;

    constructor();
    _init(): void;

    _createIcon(size: number): St.Icon;
    _canRemoveApp(app: Shell.App): boolean;

    setDragApp(app: Shell.App): void;
    handleDragOver(source: any, actor: Clutter.Actor, x: number, y: number, time: number): DragMotionResult;
    acceptDrop(source: any, actor: Clutter.Actor, x: number, y: number, time: number): boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L275
 * @version 49
 */
declare class DragPlaceholderItem extends DashItemContainer {
    _init(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L283
 * @version 49
 */
declare class EmptyDropTargetItem extends DashItemContainer {
    _init(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L291
 * @version 49
 */
declare class DashIconsLayout extends Clutter.BoxLayout {
    _init(): void;
    vfunc_get_preferred_width(container: Clutter.Actor, forHeight: number): [number, number];
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dash.js#L308
 * @version 49
 */
export class Dash extends St.Widget {
    constructor();

    static getAppFromSource(source: any): Shell.App;

    _maxWidth: number;
    _maxHeight: number;
    iconSize: number;
    _shownInitially: boolean;
    _separator: St.Widget;
    _dragPlaceholder: DragPlaceholderItem;
    _dragPlaceholderPos: number;
    _animatingPlaceholdersCount: number;
    _showLabelTimeoutId: number;
    _resetHoverTimeoutId: number;
    _labelShowing: boolean;
    _dashContainer: St.BoxLayout;
    _box: St.Widget;
    _showAppsIcon: ShowAppsIcon;
    showAppsButton: St.Button;
    _background: St.Widget;
    _workId: string;
    _appSystem: Shell.AppSystem;
    _dragCancelled: boolean;
    _dragMonitor: DragMonitor;
    _emptyDropTarget: EmptyDropTargetItem;

    _init(): void;
    _onItemDragBegin(): void;
    _onItemDragCancelled(): void;
    _onItemDragEnd(): void;
    _endItemDrag(): void;
    _onItemDragMotion(dragEvent: DragEvent): DragMotionResult;
    _onWindowDragBegin(): void;
    _onWindowDragEnd(): void;
    _appIdListToHash(apps: Shell.App[]): Record<string, Shell.App>;
    _queueRedisplay(): void;
    _hookUpLabel(item: DashItemContainer, appIcon?: AppIcon): void;
    _createAppItem(app: Shell.App): DashItemContainer;
    _itemMenuStateChanged(item: DashItemContainer, opened: boolean): void;
    _syncLabel(item: DashItemContainer, appIcon?: AppIcon): void;
    _adjustIconSize(): void;
    _redisplay(): void;
    _clearDragPlaceholder(): void;
    _clearEmptyDropTarget(): void;

    handleDragOver(source: any, actor: Clutter.Actor, x: number, y: number, time: number): DragMotionResult;
    acceptDrop(source: any, actor: Clutter.Actor, x: number, y: number, time: number): boolean;
    setMaxSize(maxWidth: number, maxHeight: number): void;
}
