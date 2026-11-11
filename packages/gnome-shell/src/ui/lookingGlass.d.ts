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

    connect<K extends keyof Inspector.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Inspector.SignalSignatures[K]>): number;
    connect_after<K extends keyof Inspector.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Inspector.SignalSignatures[K]>): number;
    emit<K extends keyof Inspector.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Inspector.SignalSignatures[K]>): void;
}
