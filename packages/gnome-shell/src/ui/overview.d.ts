// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overview.js

import type Clutter from '@girs/clutter-51';
import type St from '@girs/st-51';

import { DragEvent, DragMonitor, DragMotionResult } from './dnd.js';
import { ControlsState, ControlsManager } from './overviewControls.js';
import { SearchController } from './searchController.js';
import { EventEmitter } from '../misc/signals.js';
import { Dash } from './dash.js';

/**
 * Time for initial animation going into Overview mode;
 * this is defined here to make it available in imports.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overview.js#L12
 * @version 50
 */
export const ANIMATION_TIME: number;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overview.js#L27
 * @version 50
 */
declare class OverviewActor extends St.BoxLayout {
    _controls: ControlsManager;

    _init(): void;

    prepareToEnterOverview(): void;
    prepareToLeaveOverview(): void;
    animateToOverview(state: ControlsState, callback: () => void): void;
    animateFromOverview(callback: () => void): void;
    runStartupAnimation(): Promise<void>;

    get dash(): Dash;
    get searchController(): SearchController;
    get searchEntry(): St.Entry;
    get controls(): ControlsManager;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overview.js#L80
 * @version 50
 */
declare enum OverviewShownState {
    HIDDEN = 'HIDDEN',
    HIDING = 'HIDING',
    SHOWING = 'SHOWING',
    SHOWN = 'SHOWN',
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overview.js#L108
 * @version 50
 */
export class Overview extends EventEmitter {
    isDummy: boolean;

    _overview: OverviewActor;
    _activationTime: number;
    /** animating to overview, in overview, animating out */
    _visible: boolean;
    /** show() and not hide() */
    _shown: boolean;
    /** have a modal grab */
    _modal: boolean;
    _animationInProgress: boolean;
    _visibleTarget: boolean;
    _shownState: OverviewShownState;
    _coverPane: Clutter.Actor;
    _dragMonitor: DragMonitor;
    _windowSwitchTimeoutId: number;
    _windowSwitchTimestamp: number;
    _lastActiveWorkspaceIndex: number;
    _lastHoveredWindow: any | null;
    _initCalled: boolean;
    _swipeTracker: any;
    _inXdndDrag: boolean | undefined;
    _inItemDrag: boolean | undefined;
    _inWindowDrag: boolean | undefined;
    _grab: Clutter.Grab | false | undefined;

    constructor();

    get dash(): Dash;
    /**
     * @deprecated use dash.iconSize instead
     * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/overview.js#L124
     */
    get dashIconSize(): number;
    get animationInProgress(): boolean;
    get visible(): boolean;
    get visibleTarget(): boolean;
    get closing(): boolean;

    _createOverview(): void;
    _sessionUpdated(): void;
    /**
     * The members we construct that are implemented in JS might
     * want to access the overview as Main.overview to connect
     * signal handlers and so forth. So we create them after
     * construction in this init() method.
     */
    init(): void;
    _changeShownState(state: OverviewShownState): void;
    _onDragBegin(): void;
    _onDragEnd(): void;
    _resetWindowSwitchTimeout(): void;
    _onDragMotion(dragEvent: DragEvent): DragMotionResult;
    _onScrollEvent(actor: Clutter.Actor, event: Clutter.Event): boolean;
    _relayout(): void;
    _onRestacked(): void;
    _gestureBegin(tracker: any): void;
    _gestureUpdate(tracker: any, progress: number): void;
    _gestureEnd(tracker: any, duration: number, endProgress: number): void;
    beginItemDrag(source: any): void;
    cancelledItemDrag(source: any): void;
    endItemDrag(source: any): void;
    beginWindowDrag(window: any): void;
    cancelledWindowDrag(window: any): void;
    endWindowDrag(window: any): void;
    focusSearch(): void;
    /**
     * Checks if the Activities button is currently sensitive to
     * clicks. The first call to this function within the
     * OVERVIEW_ACTIVATION_TIMEOUT time of the hot corner being
     * triggered will return false. This avoids opening and closing
     * the overview if the user both triggered the hot corner and
     * clicked the Activities button.
     */
    shouldToggleByCornerOrButton(): boolean;
    _syncGrab(): boolean;
    /**
     * Animates the overview visible and grabs mouse and keyboard input
     */
    show(state?: ControlsState): void;
    _animateVisible(state: ControlsState): void;
    _showDone(): void;
    /**
     * Reverses the effect of show()
     */
    hide(): void;
    _animateNotVisible(): void;
    _hideDone(): void;
    toggle(): void;
    showApps(): void;
    selectApp(id: string): void;
    runStartupAnimation(): Promise<void>;
    getShowAppsButton(): St.Button;

    get searchController(): SearchController;
    get searchEntry(): St.Entry;
}
