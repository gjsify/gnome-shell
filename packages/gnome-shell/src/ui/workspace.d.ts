import type Clutter from '@girs/clutter-51';
import type St from '@girs/st-51';
import type Meta from '@girs/meta-51';
import type Shell from '@girs/shell-51';

import { WindowPreview } from './windowPreview.js';
import { OverviewAdjustment } from './overviewControls.js';
import { Monitor } from './layout.js';
import { DragMotionResult } from './dnd.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/workspace.js#L412
 * @version 50
 */
export class WorkspaceLayout extends Clutter.LayoutManager {}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/workspace.js#L942
 * @version 50
 */
export class WorkspaceBackground extends Shell.WorkspaceBackground {}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/workspace.js#L1031
 * @version 50
 */
export class Workspace extends St.Widget {
    metaWorkspace: Meta.Workspace;
    monitorIndex: number;

    _background: WorkspaceBackground;
    _container: Clutter.Actor<WorkspaceLayout>;
    _overviewAdjustment: OverviewAdjustment;
    _monitor: Monitor;
    _skipTaskbarSignals: Map<Meta.Window, number>;
    _windows: WindowPreview[];
    _layoutFrozenId: number;

    constructor(metaWorkspace: Meta.Workspace, monitorIndex: number, overviewAdjustment: OverviewAdjustment);

    _shouldLeaveOverview(): boolean;
    _lookupIndex(metaWindow: Meta.Window): number;
    containsMetaWindow(metaWindow: Meta.Window): boolean;
    isEmpty(): boolean;
    syncStacking(stackIndices: any): void;
    _doRemoveWindow(metaWin: Meta.Window): void;
    _doAddWindow(metaWin: Meta.Window): void;
    _windowAdded(metaWorkspace: Meta.Workspace, metaWin: Meta.Window): void;
    _windowRemoved(metaWorkspace: Meta.Workspace, metaWin: Meta.Window): void;
    _windowEnteredMonitor(metaDisplay: Meta.Display, monitorIndex: number, metaWin: Meta.Window): void;
    _windowLeftMonitor(metaDisplay: Meta.Display, monitorIndex: number, metaWin: Meta.Window): void;
    /** check for maximized windows on the workspace */
    hasMaximizedWindows(): boolean;
    _clearSkipTaskbarSignals(): void;
    prepareToLeaveOverview(): void;
    _onDestroy(): void;
    _doneLeavingOverview(): void;
    _doneShowingOverview(): void;
    _isMyWindow(window: Meta.Window): boolean;
    _isOverviewWindow(window: Meta.Window): boolean;
    _addWindowClone(metaWindow: Meta.Window): WindowPreview;
    _removeWindowClone(metaWin: Meta.Window): WindowPreview | null;
    _onStyleChanged(): void;
    _onCloneSelected(clone: WindowPreview, time: number): void;
    handleDragOver(source: object, _actor: Clutter.Actor, _x: number, _y: number, _time: number): DragMotionResult;
    acceptDrop(source: object, actor: Clutter.Actor, x: number, y: number, time: number): boolean;
    get stateAdjustment(): St.Adjustment;
}
