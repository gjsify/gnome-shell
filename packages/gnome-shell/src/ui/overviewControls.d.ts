// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js

import type Clutter from '@girs/clutter-51';
import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-51';
import type Meta from '@girs/meta-51';

import { AppDisplay } from './appDisplay.js';
import { FitMode, WorkspacesDisplay } from './workspacesView.js';
import { ThumbnailsBox } from './workspaceThumbnail.js';
import { SearchController } from './searchController.js';
import { Dash } from './dash.js';

/** @version 50 */
interface StateTransitionParams {
    transitioning: boolean;
    currentState: ControlsState;
    initialState: ControlsState;
    finalState: ControlsState;
    progress: number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js#L21
 * @version 50
 */
export const SMALL_WORKSPACE_RATIO: number;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js#L29
 * @version 50
 */
export const SIDE_CONTROLS_ANIMATION_TIME: number;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js#L32
 * @version 50
 */
export enum ControlsState {
    HIDDEN = 0,
    WINDOW_PICKER = 1,
    APP_GRID = 2,
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js#L39
 * @version 50
 */
declare class ControlsManagerLayout extends Clutter.LayoutManager {
    _appDisplay: AppDisplay;
    _workspacesDisplay: WorkspacesDisplay;
    _workspacesThumbnails: ThumbnailsBox;
    _stateAdjustment: OverviewAdjustment;
    _searchEntry: St.Bin;
    _searchController: SearchController;
    _dash: Dash;
    _cachedWorkspaceBoxes: Map<ControlsState, Clutter.ActorBox>;
    _postAllocationCallbacks: ((value: any) => void)[];
    _workAreaBox: Clutter.ActorBox;

    _init(searchEntry: St.Bin, appDisplay: AppDisplay, workspacesDisplay: WorkspacesDisplay, workspacesThumbnails: any, searchController: SearchController, dash: Dash, stateAdjustment: OverviewAdjustment): void;
    _updateWorkAreaBox(): void;
    _computeWorkspacesBoxForState(state: ControlsState, box: Clutter.ActorBox, searchHeight: number, dashHeight: number, thumbnailsHeight: number, spacing: number): Clutter.ActorBox;
    _getAppDisplayBoxForState(state: ControlsState, box: Clutter.ActorBox, searchHeight: number, dashHeight: number, workspacesBox: Clutter.ActorBox, spacing: number): Clutter.ActorBox;
    _runPostAllocation(): void;
    vfunc_get_preferred_width(container: Clutter.Actor, forHeight: number): [number, number];
    vfunc_get_preferred_height(container: Clutter.Actor, forWidth: number): [number, number];
    vfunc_allocate(container: Clutter.Actor, box: Clutter.ActorBox): void;
    ensureAllocation(): Promise<any>;
    getWorkspacesBoxForState(state: ControlsState): Clutter.ActorBox;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js#L268
 * @version 50
 */
export class OverviewAdjustment extends St.Adjustment {
    _init(actor: Clutter.Actor): void;
    getStateTransitionParams(): StateTransitionParams;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overviewControls.js#L313
 * @version 50
 */
export class ControlsManager extends St.Widget {
    dash: Dash;

    _ignoreShowAppsButtonToggle: boolean;
    _searchEntry: St.Entry;
    _searchEntryBin: St.Bin;
    _workspaceAdjustment: St.Adjustment;
    _stateAdjustment: OverviewAdjustment;
    _searchController: SearchController;
    _thumbnailsBox: ThumbnailsBox;
    _workspacesDisplay: WorkspacesDisplay;
    _appDisplay: AppDisplay;
    _a11ySettings: Gio.Settings;
    _lastOverlayKeyTime: number;

    _init(): void;
    _getFitModeForState(state: ControlsState): FitMode;
    _getThumbnailsBoxParams(): [number, number, number];
    _updateThumbnailsBox(animate?: boolean): void;
    _updateAppDisplayVisibility(stateTransitionParams?: StateTransitionParams): void;
    _update(): void;
    _onSearchChanged(): void;
    _onShowAppsButtonToggled(): void;
    _toggleAppsPage(): void;
    _shiftState(direction: Meta.MotionDirection): void;
    vfunc_unmap(): void;
    _onDestroy(): void;
    prepareToEnterOverview(): void;
    prepareToLeaveOverview(): void;
    animateToOverview(state: ControlsState, callback: () => void): void;
    animateFromOverview(callback: () => void): void;
    getWorkspacesBoxForState(state: ControlsState): Clutter.ActorBox;
    gestureBegin(tracker: any): void;
    gestureProgress(progress: number): void;
    gestureEnd(target: ControlsState, duration: number, onComplete: () => void): void;
    runStartupAnimation(): Promise<any>;

    get searchController(): SearchController;
    get searchEntry(): St.Entry;
    get appDisplay(): AppDisplay;
}
