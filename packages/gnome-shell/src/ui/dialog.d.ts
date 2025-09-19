// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js

import type Clutter from '@girs/clutter-17';
import type St from '@girs/st-17';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L113
 * @version 48
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
 * @version 48
 */
export class Dialog extends St.Widget {
    _parentActor: St.Widget;
    _dialog: St.BoxLayout;
    _initialKeyFocus: St.Widget;

    contentLayout: St.BoxLayout;
    buttonLayout: St.Widget;
    readonly initialKeyFocus: St.Widget;

    _init(parentActor: St.Widget, styleClass?: string | null): void;
    makeInactive(): void;
    vfunc_event(event: Clutter.Event): boolean;
    addButton(buttonInfo: ButtonInfo): St.Button;
    clearButtons(): void;

    _createDialog(): void;
    _onDestroy(): void;
    _setInitialKeyFocus(actor: St.Widget): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L158
 * @version 48
 */
export namespace MessageDialogContent {
    export interface ConstructorProps extends St.BoxLayout.ConstructorProps {
        title: string;
        description: string;
    }
}
/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L171
 * @version 48
 */
export class MessageDialogContent extends St.BoxLayout {
    title: string;
    description: string;

    constructor(params: Partial<MessageDialogContent.ConstructorProps>);
    _init(params: Partial<MessageDialogContent.ConstructorProps>): void;

    _onDestroy(): void;
    _updateTitleStyle(): void | false;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L250
 * @version 48
 */
export namespace ListSection {
    export interface ConstructorProps extends St.BoxLayout.ConstructorProps {
        title: string;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L258
 * @version 48
 */
export class ListSection extends St.BoxLayout {
    _listScrollView: St.ScrollView;
    _title: St.Label;

    list: St.BoxLayout;
    title: string;

    constructor(params: Partial<ListSection.ConstructorProps>);
    _init(params: Partial<ListSection.ConstructorProps>): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dialog.js#L294
 * @version 48
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
 * @version 48
 */
export class ListSectionItem extends St.BoxLayout {
    _iconActorBin: St.Bin;
    _title: St.Label;

    title: string;
    description: string;
    iconActor: St.Widget;

    constructor(params: { style_class?: string | null });

    /** @hidden Defined to resolve version conflicts */
    _init(config?: Partial<ListSectionItem.ConstructorProps>): void;
    _init(params: { style_class?: string | null }): void;
}
