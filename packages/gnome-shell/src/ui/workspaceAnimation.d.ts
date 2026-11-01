import type Meta from '@girs/meta-51';
import type Clutter from '@girs/clutter-51';
import type St from '@girs/st-51';

/**
 * @since 46
 */
export class WorkspaceAnimationController {
    _movingWindow: Meta.Window;
    _switchData: {
        monitors: MonitorGroup[];
    };
    _swipeTracker: any;
    _prepareWorkspaceSwitch(workspaceIndices: Array<number>): void;
    _finishWorkspaceSwitch(switchData: typeof this._switchData): void;
}

/**
 * @since 46
 */
export class WorkspaceGroup extends Clutter.Actor {
    _windowRecords: Array<{
        windowActor: Meta.WindowActor;
        clone: Clutter.Clone;
    }>;
    _createWindows(): void;
    _removeWindows(): void;
    _syncStacking(): void;
    _shouldShowWindow(win: Meta.Window): boolean;
}

/**
 * @since 46
 */
export class MonitorGroup extends St.Widget {
    _workspaceGroups: WorkspaceGroup[];
}
