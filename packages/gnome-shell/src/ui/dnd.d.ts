// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dnd.js

import type Clutter from '@girs/clutter-17';

import { EventEmitter } from '../misc/signals.js';

export enum DragMotionResult {
    NO_DROP = 0,
    COPY_DROP = 1,
    MOVE_DROP = 2,
    CONTINUE = 3,
}

export enum DragState {
    INIT = 0,
    DRAGGING = 1,
    CANCELLED = 2,
}

export enum DragDropResult {
    FAILURE = 0,
    SUCCESS = 1,
    CONTINUE = 2,
}

export type DragEvent = {
    x: number;
    y: number;
    dragActor: Clutter.Actor;
    source: any;
    targetActor: Clutter.Actor;
};

export type DropEvent = {
    dropActor: Clutter.Actor;
    targetActor: Clutter.Actor;
    clutterEvent: Clutter.Event;
};

export type DragMonitor = {
    dragMotion?: (event: DragEvent) => DragMotionResult;
    dragDrop?: (event: DropEvent) => DragDropResult;
};

export function addDragMonitor(monitor: DragMonitor): void;

export function removeDragMonitor(monitor: DragMonitor): void;

declare namespace _Draggable {
    export interface ConstructorProps {
        manualMode: boolean;
        timeoutThreshold: number;
        restoreOnSuccess: boolean;
        dragActorMaxSize: number;
        dragActorOpacity: number;
    }
}

declare class _Draggable extends EventEmitter {
    actor: Clutter.Actor;

    _dragState: DragState;

    constructor(actor: Clutter.Actor, params: Partial<_Draggable.ConstructorProps>);

    /**
     * fakeRelease:
     *
     * Fake a release event.
     * Must be called if you want to intercept release events on draggable
     * actors for other purposes (for example if you're using
     * PopupMenu.ignoreRelease())
     */
    fakeRelease(): void;

    /**
     * startDrag:
     * @param stageX: X coordinate of event
     * @param stageY: Y coordinate of event
     * @param time: Event timestamp
     * @param sequence: Event sequence
     * @param device: device that originated the event
     *
     * Directly initiate a drag and drop operation from the given actor.
     * This function is useful to call if you've specified manualMode
     * for the draggable.
     */
    startDrag(stageX: number, stageY: number, time: number, sequence?: Clutter.EventSequence, device?: Clutter.InputDevice): void;

    _onButtonPress(actor: Clutter.Actor, event: Clutter.Event): boolean;
    _onTouchEvent(actor: Clutter.Actor, event: Clutter.Event): boolean;
    _grabDevice(actor: Clutter.Actor, pointer: Clutter.InputDevice, touchSequence: Clutter.EventSequence): boolean;
    _ungrabDevice(): void;
    _grabActor(device: Clutter.InputDevice, touchSequence: Clutter.EventSequence): void;
    _ungrabActor(): void;
    _grabEvents(device: Clutter.InputDevice, touchSequence: Clutter.EventSequence): void;
    _ungrabEvents(): void;
    _eventIsRelease(event: Clutter.Event): boolean;
    _onEvent(actor: Clutter.Actor, event: Clutter.Event): boolean;
    _updateActorPosition(origScale: number, origDragOffsetX: number, origDragOffsetY: number, transX: number, transY: number): void;
    _maybeStartDrag(event: Clutter.Event): void;
    _pickTargetActor(): Clutter.Actor;
    _updateDragHover(): void;
    _queueUpdateDragHover(): void;
    _updateDragPosition(event: Clutter.Event): void;
    _dragActorDropped(event: Clutter.Event): void;
    _getRestoreLocation(): [number, number, number];
    _cancelDrag(eventTime: number): void;
    _restoreDragActor(eventTime: number): void;
    _animateDragEnd(eventTime: number, params: { opacity: number; mode: Clutter.AnimationMode; onComplete: () => void }): void;
    _finishAnimation(): void;
    _onAnimationComplete(dragActor: Clutter.Actor, eventTime: number): void;
    _dragComplete(): void;
}

/**
 * makeDraggable:
 * @param actor: Source actor
 * @param params: Additional parameters
 * @returns a new Draggable
 *
 * Create an object which controls drag and drop for the given actor.
 *
 * If %manualMode is %true in @params, do not automatically start
 * drag and drop on click
 *
 * If %dragActorMaxSize is present in @params, the drag actor will
 * be scaled down to be no larger than that size in pixels.
 *
 * If %dragActorOpacity is present in @params, the drag actor will
 * will be set to have that opacity during the drag.
 *
 * Note that when the drag actor is the source actor and the drop
 * succeeds, the actor scale and opacity aren't reset; if the drop
 * target wants to reuse the actor, it's up to the drop target to
 * reset these values.
 */
export function makeDraggable(actor: Clutter.Actor, params: any): _Draggable;
