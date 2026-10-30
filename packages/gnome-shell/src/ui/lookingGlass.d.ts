import type Clutter from '@girs/clutter-51';
import type GObject from '@girs/gobject-2.0';

export namespace Inspector {
    export interface SignalSignatures extends Clutter.Actor.SignalSignatures {
        closed: () => void;
        target: (target: Clutter.Actor, x: number, y: number) => void;
    }
}

/**
 * @since 46
 */
export class Inspector extends Clutter.Actor {
    $signals: Inspector.SignalSignatures;

    // Signal handler methods
    connect<S extends Inspector.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;
    connect_after<S extends Inspector.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;

    // Generic signal handler methods
    connect(signal: string, callback: (...args: any[]) => any): number;
    connect_after(signal: string, callback: (...args: any[]) => any): number;
}
