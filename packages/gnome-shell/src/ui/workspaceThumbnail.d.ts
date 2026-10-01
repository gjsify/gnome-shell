// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspaceThumbnail.js

import type Clutter from '@girs/clutter-51';
import type St from '@girs/st-51';
import type Meta from '@girs/meta-51';

import { DragMotionResult } from './dnd.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspaceThumbnail.js#L59
 * @version 50
 */
export class WindowClone extends Clutter.Actor {}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspaceThumbnail.js#L213
 * @version 50
 */
export enum ThumbnailState {
    NEW = 0,
    EXPANDING = 1,
    EXPANDED = 2,
    ANIMATING_IN = 3,
    NORMAL = 4,
    REMOVING = 5,
    ANIMATING_OUT = 6,
    ANIMATED_OUT = 7,
    COLLAPSING = 8,
    DESTROYED = 9,
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspaceThumbnail.js#L237
 * @version 50
 */
export class WorkspaceThumbnail extends St.Widget {
    metaWorkspace: Meta.Workspace;
    monitorIndex: number;
    state: ThumbnailState;

    _removed: boolean;
    _viewport: Clutter.Actor;
    _contents: Clutter.Actor;
    _windows: WindowClone[];
    _allWindows: Meta.Window[];
    _slidePosition: number;
    _collapseFraction: number;

    constructor(metaWorkspace: Meta.Workspace, monitorIndex: number);

    setPorthole(x: number, y: number, width: number, height: number): void;
    _lookupIndex(metaWindow: Meta.Window): number;
    syncStacking(stackIndices: any): void;
    set slidePosition(slidePosition: number);
    get slidePosition(): number;
    set collapseFraction(collapseFraction: number);
    get collapseFraction(): number;
    _doRemoveWindow(metaWin: Meta.Window): void;
    _doAddWindow(metaWin: Meta.Window): void;
    _windowAdded(metaWorkspace: Meta.Workspace, metaWin: Meta.Window): void;
    _windowRemoved(metaWorkspace: Meta.Workspace, metaWin: Meta.Window): void;
    _windowEnteredMonitor(metaDisplay: Meta.Display, monitorIndex: number, metaWin: Meta.Window): void;
    _windowLeftMonitor(metaDisplay: Meta.Display, monitorIndex: number, metaWin: Meta.Window): void;
    _updateMinimized(metaWin: Meta.Window): void;
    workspaceRemoved(): void;
    _onDestroy(): void;
    /** Tests if @actor belongs to this workspace and monitor */
    _isMyWindow(actor: Meta.WindowActor): boolean;
    /** Tests if @win should be shown in the Overview */
    _isOverviewWindow(win: Meta.WindowActor): boolean;
    /** Create a clone of a (non-desktop) window and add it to the window list */
    _addWindowClone(win: Meta.WindowActor): WindowClone;
    _removeWindowClone(metaWin: Meta.Window): WindowClone | null;
    activate(time: number): void;
    handleDragOverInternal(source: object, actor: Clutter.Actor, time: number): DragMotionResult;
    acceptDropInternal(source: object, actor: Clutter.Actor, time: number): boolean;
    setScale(scaleX: number, scaleY: number): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspaceThumbnail.js#L590
 * @version 50
 */
export class ThumbnailsBox extends St.Widget {}
