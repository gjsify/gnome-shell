// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/animation.js

import type St from '@girs/st-51';

export const SPINNER_ANIMATION_TIME: number;

export class Spinner extends St.Widget {
    constructor(size: number, params?: { animate?: boolean; hideOnStop?: boolean });

    vfunc_map(): void;

    play(): void;
    stop(): void;
}
