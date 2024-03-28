// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js

import type Clutter from '@girs/clutter-14';
import type St from '@girs/st-14';

export interface ButtonInfo {
    action: () => void;
    label: string;
    key?: number;
    modifiers?: Clutter.ModifierType;
    default?: boolean;
}

/**
 * @version 46
 */
export class Dialog extends St.Widget {
    protected _parentActor: St.Widget;
    protected _dialog: St.BoxLayout;
    protected _initialKeyFocus: St.Widget;

    public contentLayout: St.BoxLayout;
    public buttonLayout: St.Widget;
    public readonly initialKeyFocus: St.Widget;

    public _init(parentActor: St.Widget, styleClass?: string | null): void;
    public makeInactive(): void;
    public vfunc_event(event: Clutter.Event): boolean;
    public addButton(buttonInfo: ButtonInfo): St.Button;
    public clearButtons(): void;

    protected _createDialog(): void;
    protected _onDestroy(): void;
    protected _setInitialKeyFocus(actor: St.Widget): void;
}

/**
 * @version 46
 */
export namespace MessageDialogContent {
    export interface ConstructorProperties extends St.BoxLayout.ConstructorProperties {
        title?: string;
        description?: string;
    }
}
/**
 * @version 46
 */
export class MessageDialogContent extends St.BoxLayout {
    public title: string;
    public description: string;

    constructor(params: MessageDialogContent.ConstructorProperties);
    public _init(params: MessageDialogContent.ConstructorProperties): void;

    protected _onDestroy(): void;
    protected _updateTitleStyle(): void | false;
}

export interface ListSectionProps extends St.BoxLayout.ConstructorProperties {
    title?: string;
}

/**
 * @version 46
 */
export class ListSection extends St.BoxLayout {
    protected _listScrollView: St.ScrollView;
    protected _title: St.Label;

    public list: St.BoxLayout;
    public title: string;
    public label_actor: St.Label;

    constructor(params: ListSectionProps);
    public _init(params: ListSectionProps): void;
}

export interface ListSectionItemProps extends St.BoxLayout.ConstructorProperties {
    title?: string;
    description?: string;
    // note: iconActor hasn't: GObject.ParamFlags.CONSTRUCT, but might work anyways?
}

/**
 * @version 46
 */
export class ListSectionItem extends St.BoxLayout {
    protected _iconActorBin: St.Bin;
    protected _title: St.Label;

    public title: string;
    public description: string;
    public iconActor: St.Widget;

    constructor(params: { style_class?: string | null });
    /** @hidden Defined to resolve version conflicts */
    public _init(config?: ListSectionItemProps): void;
    public _init(params: { style_class?: string | null }): void;
}
