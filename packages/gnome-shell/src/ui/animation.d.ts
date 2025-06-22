// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/animation.js

import type GLib from '@girs/glib-2.0';
import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-16';

export class Animation extends St.Bin {
    constructor(file: Gio.File, width: number, height: number, speed: number);

    /** @hidden */
    public _init(props?: Partial<St.Bin.ConstructorProps>): void;
    public _init(file: Gio.File, width: number, height: number, speed: number): void;

    public play(): void;
    public stop(): void;

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
    public _init(props?: Partial<St.Bin.ConstructorProps>): void;
    /** @hidden */
    public _init(file: Gio.File, width: number, height: number, speed: number): void;
    public _init(file: Gio.File, size: number): void;
}

export class Spinner extends AnimatedIcon {
    constructor(size: number, params: { animate: boolean; hideOnStop: boolean });
    /** @hidden */
    public _init(props?: Partial<St.Bin.ConstructorProps>): void;
    /** @hidden */
    public _init(file: Gio.File, width: number, height: number, speed: number): void;
    /** @hidden */
    public _init(file: Gio.File, size: number): void;
    public _init(size: number, params: { animate: boolean; hideOnStop: boolean }): void;

    public play(): void;
    public stop(): void;

    _onDestroy(): void;
}
