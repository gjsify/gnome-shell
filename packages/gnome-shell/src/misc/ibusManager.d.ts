import * as Signals from './signals.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/ibusManager.js#L45
 * @version 49
 */
export function getIBusManager(): IBusManager;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/ibusManager.js#L51
 * @version 49
 */
export namespace IBusManager {
    interface SignalMap {
        'set-cursor-location': [{ x: number; y: number; width: number; height: number }];
        'focus-in': [];
        'focus-out': [];
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/ibusManager.js#L51
 * @version 49
 */
declare class IBusManager<S extends Signals.SignalMap<S> = IBusManager.SignalMap> extends Signals.EventEmitter<S> {}
