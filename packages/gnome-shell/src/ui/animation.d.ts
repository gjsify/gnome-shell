// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/animation.js

import type GLib from '@girs/glib-2.0';
import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-17';

export class Animation extends St.Bin {
    constructor(file: Gio.File, width: number, height: number, speed: number);

    /** @hidden */
    _init(props?: Partial<St.Bin.ConstructorProps>): void;
    _init(file: Gio.File, width: number, height: number, speed: number): void;

    play(): void;
    stop(): void;

    _loadFile(file: Gio.File, width: number, height: number): void;
    _showFrame(frame: number): void;
    _update(): typeof GLib.SOURCE_CONTINUE;
    _syncAnimationSize(): void;
    _animationsLoaded(): void;
    _onDestroy(): void;
}

export class AnimatedIcon extends Animation {
    constructor(file: Gio.File, size: number);
    /** @hidden */
    _init(props?: Partial<St.Bin.ConstructorProps>): void;
    /** @hidden */
    _init(file: Gio.File, width: number, height: number, speed: number): void;
    _init(file: Gio.File, size: number): void;
}

export class Spinner extends AnimatedIcon {
    constructor(size: number, params: { animate: boolean; hideOnStop: boolean });
    /** @hidden */
    _init(props?: Partial<St.Bin.ConstructorProps>): void;
    /** @hidden */
    _init(file: Gio.File, width: number, height: number, speed: number): void;
    /** @hidden */
    _init(file: Gio.File, size: number): void;
    _init(size: number, params: { animate: boolean; hideOnStop: boolean }): void;

    play(): void;
    stop(): void;

    _onDestroy(): void;
}
