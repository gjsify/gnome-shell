// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js

import type Clutter from '@girs/clutter-14';
import type St from '@girs/st-14';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L113
 * @version 46
 */
export interface ButtonInfo {
    action: () => void;
    label: string;
    key?: number;
    modifiers?: Clutter.ModifierType;
    default?: boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L18
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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L158
 * @version 46
 */
export namespace MessageDialogContent {
    export interface ConstructorProps extends St.BoxLayout.ConstructorProps {
        title: string;
        description: string;
    }
}
/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L171
 * @version 46
 */
export class MessageDialogContent extends St.BoxLayout {
    public title: string;
    public description: string;

    constructor(params: Partial<MessageDialogContent.ConstructorProps>);
    public _init(params: Partial<MessageDialogContent.ConstructorProps>): void;

    protected _onDestroy(): void;
    protected _updateTitleStyle(): void | false;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L250
 * @version 46
 */
export namespace ListSection {
    export interface ConstructorProps extends St.BoxLayout.ConstructorProps {
        title: string;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L258
 * @version 46
 */
export class ListSection extends St.BoxLayout {
    protected _listScrollView: St.ScrollView;
    protected _title: St.Label;

    public list: St.BoxLayout;
    public title: string;

    constructor(params: Partial<ListSection.ConstructorProps>);
    public _init(params: Partial<ListSection.ConstructorProps>): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L294
 * @version 46
 */
export namespace ListSectionItem {
    export interface ConstructorProps extends St.BoxLayout.ConstructorProps {
        title: string;
        description: string;
        iconActor: Clutter.Actor;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L311
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
    public _init(config?: Partial<ListSectionItem.ConstructorProps>): void;
    public _init(params: { style_class?: string | null }): void;
}
