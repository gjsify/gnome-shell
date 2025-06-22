import type St from '@girs/st-16';

export class CheckBox extends St.Button {
    _box: St.Bin;
    _label: St.Label;

    constructor(label?: string);
    /** @hidden */
    public _init(params?: Partial<St.Button.ConstructorProps>): void;
    public _init(label?: string): void;

    public setLabel(label: string): void;
    public getLabelActor(): St.Label;
}
