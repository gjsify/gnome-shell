// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/barLevel.js

import type St from '@girs/st-14';

export namespace BarLevel {
    export interface ConstructorProps extends St.DrawingArea.ConstructorProps {}
}

export class BarLevel extends St.DrawingArea {
    protected _maxValue: number;
    protected _value: number;
    protected _overdriveStart: number;
    protected _barLevelWidth: number;

    public value: number;
    public maximumValue: number;
    public overdriveStart: number;

    constructor(params?: Partial<BarLevel.ConstructorProps>);
    public _init(params?: Partial<BarLevel.ConstructorProps>): void;

    public vfunc_repaint(): void;

    protected _getCurrentValue(): number;
    protected _getOverdriveStart(): number;
    protected _getMinimumValue(): number;
    protected _getMaximumValue(): number;
    protected _setCurrentValue(_actor: any, value: number): void;
    protected _valueChanged(): void;
}
