// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js

import type GObject from '@girs/gobject-2.0';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L15
 * @version 50
 */
export class TransientSignalHolder extends GObject.Object {
    constructor(owner?: object);
    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L96
 * @version 50
 */
interface SignalData {
    /** a list of handler IDs */
    ownerSignals: number[];
    /** destroy handler ID of tracked object */
    destroyId: number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L83
 * @version 50
 */
declare class SignalTracker {
    _owner: object;
    _map: Map<object, SignalData>;

    constructor(owner: object);

    /**
     * @private
     * @param {object} obj - a tracked object
     * @returns {SignalData} - signal data for object
     */
    _getSignalData(obj: object): SignalData;

    /**
     * @private
     * @param {GObject.Object} obj - tracked widget
     */
    _trackDestroy(obj: GObject.Object): void;

    _disconnectSignalForProto(proto: any, obj: object, id: number): void;

    _getObjectProto(obj: object): any;

    _disconnectSignal(obj: object, id: number): void;

    _removeTracker(): void;

    /**
     * @param {object} obj - tracked object
     * @param {...number} handlerIds - tracked handler IDs
     */
    track(obj: object, ...handlerIds: number[]): void;

    /**
     * @param {object} obj - tracked object instance
     */
    untrack(obj: object): void;

    clear(): void;

    destroy(): void;
}

/**
 * Connect one or more signals, and associate the handlers
 * with a tracked object.
 *
 * All handlers for a particular object can be disconnected
 * by calling disconnectObject(). If object is a {Clutter.widget},
 * this is done automatically when the widget is destroyed.
 *
 * @param {object} thisObj - the emitter object
 * @param {...any} args - a sequence of signal-name/handler pairs
 * with an optional flags value, followed by an object to track
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L209
 * @version 50
 */
export function connectObject(thisObj: object, ...args: any): void;

/**
 * Disconnect all signals that were connected for
 * the specified tracked object
 *
 * @param {object} thisObj - the emitter object
 * @param {object} obj - the tracked object
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L256
 * @version 50
 */
export function disconnectObject(thisObj: object, obj: object): void;

/**
 * Register a GObject type as having a 'destroy' signal
 * that should disconnect all handlers
 *
 * @param {GObject.Type} gtype - a GObject type
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L266
 * @version 50
 */
export function registerDestroyableType(gtype: GObject.GTypeInput): void;

/**
 * A debug function that can be used to inspect signal trackers at run time
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signalTracker.js#L281
 * @version 50
 */
export function debugGetSignalTrackers(): Map<object, SignalTracker>;
