// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js

import type GObject from '@girs/gobject-2.0';
import type Gio from '@girs/gio-2.0';
import type Clutter from '@girs/clutter-17';
import type St from '@girs/st-17';
import type Meta from '@girs/meta-17';
import type Mtk from '@girs/mtk-17';
import type Shell from '@girs/shell-17';

import { EventEmitter } from '../misc/signals.js';

import type { DragMotionResult } from './dnd.js';
import type { SystemBackground } from './background.js';
import type { Ripples } from './ripples.js';
import type { BackgroundManager } from './background.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L159
 * @version 48
 */
export interface Geometry {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L41
 * @version 48
 */

export namespace MonitorConstraint {
    export interface ConstructorProps extends Clutter.Constraint.ConstructorProps {
        primary: boolean;
        index: number;
        workArea: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L56
 * @version 48
 */
export class MonitorConstraint extends Clutter.Constraint {
    _primary: boolean;
    _index: number;
    _workArea: boolean;

    primary: boolean;
    index: number;
    workArea: boolean;

    constructor(props: Partial<MonitorConstraint.ConstructorProps>);

    /** @hidden */
    _init(props: Partial<MonitorConstraint.ConstructorProps>): void;
    _init(): void;

    vfunc_set_actor(actor: Clutter.Actor): void;
    vfunc_update_allocation(actor: Clutter.Actor, actorBox: Clutter.ActorBox): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L158
 * @version 48
 */
declare class Monitor {
    index: number;
    geometryScale: number;
    x: number;
    y: number;
    width: number;
    height: number;
    readonly inFullscreen: boolean;

    constructor(index: number, geometry: Geometry, geometryScale: number);
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L174
 * @version 48
 */
declare class UiActor extends St.Widget {
    constructor(props?: Partial<St.Widget.ConstructorProps>);
    _init(props?: Partial<St.Widget.ConstructorProps>): void;

    vfunc_get_preferred_width(_forHeight: number): [number, number];
    vfunc_get_preferred_height(_forWidth: number): [number, number];
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L1454
 * @version 48
 */
declare class ScreenTransition extends Clutter.Actor {
    constructor();

    /** @hidden */
    _init(params?: Partial<Clutter.Actor.ConstructorProps>): void;
    _init(): void;

    vfunc_hide(): void;
    run(): void;
}

/**
 * This class manages a "hot corner" that can toggle switching to
 * overview.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L1141
 * @version 48
 */
declare class HotCorner extends Clutter.Actor {
    _entered: boolean;
    _monitor: Monitor;
    _x: number;
    _y: number;
    _pressureBarrier: PressureBarrier;
    _ripples: Ripples;

    constructor(layoutManager: LayoutManager, monitor: Monitor, x: number, y: number);

    _init(props?: Partial<Clutter.Actor.ConstructorProps>): void;
    _init(layoutManager: LayoutManager, monitor: Monitor, x: number, y: number): void;

    setBarrierSize(size: number): void;
    handleDragOver(source: any, actor: any, x: number, y: number, time: number): DragMotionResult;
    vfunc_leave_event(event: Clutter.Event): boolean;

    _setupFallbackCornerIfNeeded(layoutManager: LayoutManager): void;
    _onDestroy(): void;
    _toggleOverview(): void;
    _onCornerEntered(): void;
    _onCornerLeft(actor: Clutter.Actor, event: Clutter.Event): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L186
 * @version 48
 */
export interface TrackedActors {
    trackFullscreen: boolean;
    affectsStruts: boolean;
    affectsInputRegion: boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L192
 * @version 48
 */
export class LayoutManager extends GObject.Object {
    _rtl: boolean;
    _keyboardIndex: number;
    _rightPanelBarrier: Meta.Barrier | null;
    _inOverview: boolean;
    _updateRegionIdle: number;
    _trackedActors: TrackedActors[];
    _keyboardHeightNotifyId: number;
    _backgroundGroup: Meta.BackgroundGroup;
    _interfaceSettings: Gio.Settings;
    _pendingLoadBackground: boolean;
    _systemBackground: SystemBackground;

    readonly _startingUp: boolean;
    monitors: Monitor[];
    primaryMonitor: Monitor | null;
    primaryIndex: number;
    hotCorners: HotCorner[];
    uiGroup: UiActor;
    overviewGroup: St.Widget;
    screenShieldGroup: St.Widget;
    panelBox: St.BoxLayout;
    modalDialogGroup: St.Widget;
    keyboardBox: St.BoxLayout;
    screenshotUIGroup: St.Widget;
    dummyCursor: St.Widget;
    screenTransition: ScreenTransition;
    readonly currentMonitor: Monitor | undefined;
    readonly keyboardMonitor: Monitor | undefined;
    readonly focusIndex: number;
    readonly focusMonitor: Monitor | undefined;
    keyboardIndex: number;

    constructor();
    _init(): void;

    init(): void;
    showOverview(): void;
    hideOverview(): void;

    /**
     * setDummyCursorGeometry:
     *
     * The cursor dummy is a standard widget commonly used for popup
     * menus and box pointers to track, as the box pointer API only
     * tracks actors. If you want to pop up a menu based on where the
     * user clicked, or where the text cursor is, the cursor dummy
     * is what you should use. Given that the menu should not track
     * the actual mouse pointer as it moves, you need to call this
     * function before you show the menu to ensure it is at the right
     * position and has the right size.
     * @param x
     * @param y
     * @param width
     * @param height
     */
    setDummyCursorGeometry(x: number, y: number, width: number, height: number): void;

    /**
     * Adds `actor` to the chrome, and (unless `affectsInputRegion` in
     * `params` is `false`) extends the input region to include it.
     * Changes in `actor`'s size, position, and visibility will
     * automatically result in appropriate changes to the input
     * region.
     *
     * If `affectsStruts` in `params` is `true` (and `actor` is along a
     * screen edge), then `actor`'s size and position will also affect
     * the window manager struts. Changes to `actor`'s visibility will
     * NOT affect whether or not the strut is present, however.
     *
     * If `trackFullscreen` in `params` is `true`, the actor's visibility
     * will be bound to the presence of fullscreen windows on the same
     * monitor (it will be hidden whenever a fullscreen window is visible,
     * and shown otherwise)
     * @param actor An actor to add to the chrome
     * @param params Additional params
     */
    addChrome(actor: Clutter.Actor, params?: Partial<TrackedActors>): void;

    /**
     * Like {@link addChrome()}, but adds `actor` above all windows, including popups.
     * @param actor An actor to add to the chrome
     * @param params Additional params
     */
    addTopChrome(actor: Clutter.Actor, params?: Partial<TrackedActors>): void;

    /**
     * Tells the chrome to track `actor`. This can be used to extend the
     * struts or input region to cover specific children.
     *
     * `params` can have any of the same values as in {@link addChrome()},
     * though some possibilities don't make sense. By default, `actor` has
     * the same params as its chrome ancestor.
     *
     * @param actor a descendant of the chrome to begin tracking
     * @param params parameters describing how to track `actor`
     */
    trackChrome(actor: Clutter.Actor, params?: Partial<TrackedActors>): void;

    /**
     * Undoes the effect of {@link trackChrome()}
     * `params` is `false`) removes it from the input region.
     * @param actor An actor previously tracked via {@link trackChrome()}
     */
    untrackChrome(actor: Clutter.Actor): void;

    /**
     * Removes `actor` from the chrome
     * @param actor An actor previously added via {@link addChrome()}
     */
    removeChrome(actor: Clutter.Actor): void;

    getWorkAreaForMonitor(monitorIndex: number): Mtk.Rectangle;

    /**
     * This call guarantees that we return some monitor to simplify usage of it
     * In practice all tracked actors should be visible on some monitor anyway
     * @param actor
     */
    findIndexForActor(actor: Clutter.Actor): number;

    findMonitorForActor(actor: Clutter.Actor): Monitor | undefined;

    modalEnded(): void;

    _sessionUpdated(): void;
    _updateMonitors(): void;
    _updateHotCorners(): void;
    _addBackgroundMenu(bgManager: BackgroundManager): void;
    _createBackgroundManager(monitorIndex: number): BackgroundManager;
    _showSecondaryBackgrounds(): void;
    _waitLoaded(bgManager: BackgroundManager): void;
    _updateBackgrounds(): Promise<void>;
    _updateKeyboardBox(): void;
    _updateBoxes(): void;
    _panelBoxChanged(): void;
    _updatePanelBarrier(): void;
    _monitorsChanged(): void;
    _isAboveOrBelowPrimary(monitor: Monitor): boolean;
    _loadBackground(): void;
    /**
     * Startup Animations
     *
     * We have two different animations, depending on whether we're a greeter
     * or a normal session.
     *
     * In the greeter, we want to animate the panel from the top, and smoothly
     * fade the login dialog on top of whatever plymouth left on screen which
     * we get as a still frame background before drawing anything else.
     *
     * Here we just have the code to animate the panel, and fade up the background.
     * The login dialog animation is handled by modalDialog.js
     *
     * When starting a normal user session, we want to grow it out of the middle
     * of the screen.
     */
    _prepareStartupAnimation(): Promise<void>;
    _startupAnimation(): Promise<void>;
    _startupAnimationGreeter(): Promise<void>;
    _startupAnimationSession(): Promise<void>;
    _startupAnimationComplete(): void;
    _findActor(actor: Clutter.Actor): number;
    _trackActor(actor: Clutter.Actor, params?: Partial<TrackedActors>): void;
    _untrackActor(actor: Clutter.Actor): void;
    _updateActorVisibility(actorData: any): void;
    _updateVisibility(): void;
    _queueUpdateRegions(): void;
    _updateFullscreen(): void;
    _windowsRestacked(): void;
    _updateRegions(): boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/layout.js#L1309
 * @version 48
 */
declare class PressureBarrier extends EventEmitter {
    _threshold: number;
    _timeout: number;
    _actionMode: Shell.ActionMode;
    _barriers: any[];
    _eventFilter: any | null;
    _isTriggered: boolean;
    _barrierEvents: any[];
    _currentPressure: number;
    _lastTime: number;

    constructor(threshold: number, timeout: number, actionMode: Shell.ActionMode);

    addBarrier(barrier: Meta.Barrier): void;
    removeBarrier(barrier: Meta.Barrier): void;
    destroy(): void;
    setEventFilter(filter: any): void;

    _disconnectBarrier(barrier: Meta.Barrier): void;
    _reset(): void;
    _isHorizontal(barrier: Meta.Barrier): boolean;
    _getDistanceAcrossBarrier(barrier: Meta.Barrier, event: any): number;
    _getDistanceAlongBarrier(barrier: Meta.Barrier, event: any): number;
    _trimBarrierEvents(): void;
    _onBarrierLeft(barrier: Meta.Barrier, event: any): void;
    _trigger(): void;
    _onBarrierHit(barrier: Meta.Barrier, event: any): void;
}
