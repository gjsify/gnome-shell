import type St from '@girs/st-17';

export class CheckBox extends St.Button {
    _box: St.Bin;
    _label: St.Label;

    constructor(label?: string);
    /** @hidden */
    _init(params?: Partial<St.Button.ConstructorProps>): void;
    _init(label?: string): void;

    setLabel(label: string): void;
    getLabelActor(): St.Label;
}
