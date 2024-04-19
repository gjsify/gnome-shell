import type St from '@girs/st-14';

export class CheckBox extends St.Button {
    protected _box: St.Bin;
    protected _label: St.Label;

    constructor(label?: string);
    /** @hidden */
    public _init(params?: Partial<St.Button.ConstructorProps>): void;
    public _init(label?: string): void;

    public setLabel(label: string): void;
    public getLabelActor(): St.Label;
}
