// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js

import type GObject from '@girs/gobject-2.0';
import type Gio from '@girs/gio-2.0';
import type GLib from '@girs/glib-2.0';
import type St from '@girs/st-14';
import type Clutter from '@girs/clutter-14';

/**
 * @version 46
 */
export function _fixMarkup(text: string, allowMarkup?: boolean): string;

/**
 * @version 46
 */
export class URLHighlighter extends St.Label {
    constructor(text?: string, lineWrap?: boolean, allowMarkup?: boolean);

    /** @hidden */
    public _init(params?: Partial<St.Label.ConstructorProps>): void;
    public _init(text?: string, lineWrap?: boolean, allowMarkup?: boolean): void;

    public vfunc_button_press_event(buttonEvent: Clutter.ButtonEvent): boolean;
    public vfunc_button_release_event(buttonEvent: Clutter.ButtonEvent): boolean;
    public vfunc_motion_event(motionEvent: Clutter.MotionEvent): boolean;
    public vfunc_leave_event(crossingEvent: Clutter.CrossingEvent): boolean;
    public setMarkup(text?: string, allowMarkup?: boolean): void;

    protected _highlightUrls(): void;
    protected _findUrlAtPos(event: Clutter.Event): [number, number];
}

export declare namespace Source {
    interface ObjectProperties {
        title: string;
        icon: Gio.Icon;
        iconName: string | null;
    }

    type ConstructorProps = Partial<Source.ObjectProperties> & Partial<GObject.Object.ConstructorProps>;
}

/**
 * @version 46
 */
export class Source extends GObject.Object implements Source.ObjectProperties {
    constructor(params?: Source.ConstructorProps);

    public title: string;
    public icon: Gio.Icon;

    public get iconName(): string | null;

    public set iconName(iconName: string);
}

/**
 * @version 46
 */
export class Message extends St.Button {
    constructor(source: Source);

    public title: string | null;
    public body: string | null;
    public useBodyMarkup: boolean;
    public icon: Gio.Icon | null;
    public datetime: GLib.DateTime | null;

    public expanded: boolean;

    public close(): void;

    public setActionArea(actor: Clutter.Actor): void;

    public addMediaControl(iconName: string, callback: () => void): void;

    public expand(animate?: boolean): void;

    public unexpand(animate?: boolean): void;

    public canClose(): boolean;

    public vfunc_key_press_event(keyEvent: Clutter.KeyEvent): boolean;

    protected _onDestroy(): void;
}

/**
 * @version 46
 */
export class MessageListSection extends St.BoxLayout {
    public readonly canClear: boolean;
    public readonly empty: boolean;

    public readonly allowed: boolean;

    constructor();

    public addMessage(message: Message, animate?: boolean): void;

    public addMessageAtIndex(message: Message, index: number, animate?: boolean): void;

    public moveMessage(message: Message, newIndex: number, animate?: boolean): void;

    public removeMessage(message: Message, animate?: boolean): void;

    public clear(): void;

    protected _onKeyFocusIn(messageActor: St.Widget): void;
}
