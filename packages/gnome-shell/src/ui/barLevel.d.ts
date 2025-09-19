// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/barLevel.js

import type St from '@girs/st-17';

export namespace BarLevel {
    export interface ConstructorProps extends St.DrawingArea.ConstructorProps {}
}

export class BarLevel extends St.DrawingArea {
    _maxValue: number;
    _value: number;
    _overdriveStart: number;
    _barLevelWidth: number;

    value: number;
    maximumValue: number;
    overdriveStart: number;

    constructor(params?: Partial<BarLevel.ConstructorProps>);
    _init(params?: Partial<BarLevel.ConstructorProps>): void;

    vfunc_repaint(): void;

    _getCurrentValue(): number;
    _getOverdriveStart(): number;
    _getMinimumValue(): number;
    _getMaximumValue(): number;
    _setCurrentValue(_actor: any, value: number): void;
    _valueChanged(): void;
}
