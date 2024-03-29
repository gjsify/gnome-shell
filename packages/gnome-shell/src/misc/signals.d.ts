// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signals.js
// Credits https://github.com/swsnr/gnome-shell-extension-picture-of-the-day/blob/main/%40types/gnome-shell/misc/signals.d.ts
// TODO Move this SignalMethods to ts-fir-gir / @girs/gjs

type SignalMap<K> = {
    [Signal in keyof K]: unknown[];
};

/**
 * You can use the `Signals.addSignalMethods` method to apply the `Signals` convenience methods to an `Object`.
 * Generally, this is called on an object prototype, but may also be called on an object instance.
 * You can use this Interface for this object or prototype to make the methods in typescript known
 * @example
 * ```ts
 * const Signals = imports.signals;
 *
 * // Define an interface with the same name of your class to make the methods known
 * interface Events extends Signals.Methods {}
 *
 * class Events {}
 * Signals.addSignalMethods(Events.prototype);
 *
 * const events = new Events();
 *
 * // Typescript will not complain here
 * events.emit("test-signal", "test argument");
 * ```
 */
export interface SignalMethods<S extends SignalMap<S> = any> {
    /**
     * Connects a callback to a signal for an object. Pass the returned ID to
     * `disconnect()` to remove the handler.
     *
     * If `callback` returns `true`, emission will stop and no other handlers will be
     * invoked.
     *
     * > Warning: Unlike GObject signals, `this` within a signal callback will always
     * > refer to the global object (ie. `globalThis`).
     *
     * @param sigName A signal name
     * @param callback A callback function
     * @returns A handler ID
     */
    connect<Name extends keyof S>(sigName: Name, callback: (self: this, ...args: S[Name]) => boolean | undefined): number;
    /**
     * Emits a signal for an object. Emission stops if a signal handler returns `true`.
     *
     * Unlike GObject signals, it is not necessary to declare signals or define their
     * signature. Simply call `emit()` with whatever signal name you wish, with
     * whatever arguments you wish.
     * @param sigName A signal name
     * @param args Any number of arguments, of any type
     */
    emit<Name extends keyof S>(sigName: Name, ...args: S[Name]): void;
    /**
     * Disconnects a handler for a signal.
     * @param id The ID of the handler to be disconnected
     */
    disconnect(id: number): void;
    /**
     * Disconnects all signal handlers for an object.
     */
    disconnectAll(): void;
    /**
     * Checks if a handler ID is connected.
     * @param id The ID of the handler to be disconnected
     * @returns `true` if connected, or `false` if not
     */
    signalHandlerIsConnected(id: number): boolean;
}

export interface EventEmitter<S extends SignalMap<S> = any> extends SignalMethods<S> {}

/**
 * @version 46
 */
export class EventEmitter<S extends SignalMap<S> = any> {
    connectObject(...args: any[]): number; // TODO: return type is return type of imports.misc.signalTracker.connectObject

    disconnectObject(...args: any[]): number; // TODO: return type is return type of imports.misc.signalTracker.disconnectObject

    connect_object(...args: any[]): ReturnType<typeof this.connectObject>;

    disconnect_object(...args: any[]): ReturnType<typeof this.disconnectObject>;
}
