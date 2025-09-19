// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js

import type GObject from '@girs/gobject-2.0';
import type Gio from '@girs/gio-2.0';
import type GLib from '@girs/glib-2.0';
import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';
import type { Notification } from './messageTray.js';
import type { MprisPlayer, MprisSource } from './mpris.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js#L33
 * @version 48
 */
export class URLHighlighter extends St.Label {
    constructor(text?: string, lineWrap?: boolean, allowMarkup?: boolean);

    /** @hidden */
    _init(params?: Partial<St.Label.ConstructorProps>): void;
    _init(text?: string, lineWrap?: boolean, allowMarkup?: boolean): void;

    vfunc_button_press_event(buttonEvent: Clutter.ButtonEvent): boolean;
    vfunc_button_release_event(buttonEvent: Clutter.ButtonEvent): boolean;
    vfunc_motion_event(motionEvent: Clutter.MotionEvent): boolean;
    vfunc_leave_event(crossingEvent: Clutter.CrossingEvent): boolean;
    setMarkup(text?: string, allowMarkup?: boolean): void;

    _highlightUrls(): void;
    _findUrlAtPos(event: Clutter.Event): [number, number];
}

declare class ScaleLayout extends Clutter.BinLayout {
    _container: Clutter.Actor | null;
    scalingEnabled: boolean;

    vfunc_set_container(container: Clutter.Actor | null): void;

    vfunc_get_preferred_width(container: Clutter.Actor, forHeight: number): [number, number];

    vfunc_get_preferred_height(container: Clutter.Actor, forWidth: number): [number, number];
}

declare class LabelExpanderLayout extends Clutter.BinLayout {
    expansion: number;
    _expandLines: number;

    constructor(params: Clutter.BinLayout.ConstructorProps);

    set expandLines(v: number);

    vfunc_get_preferred_height(container: Clutter.Actor, forWidth: number): [number, number];
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
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js#L284
 * @version 48
 */
export class Source extends GObject.Object implements Source.ObjectProperties {
    constructor(params?: Source.ConstructorProps);

    title: string;
    icon: Gio.Icon;

    get iconName(): string | null;

    set iconName(iconName: string);
}

declare class TimeLabel extends St.Label {
    datetime: Date;

    /** @hidden */
    _init(params?: Partial<St.Label.ConstructorProps>): void;
    _init(datetime: Date): void;

    vfunc_map(): void;
}

declare class MessageHeader extends St.BoxLayout {
    constructor(source: Source);
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js#L421
 * @version 48
 */
export class Message extends St.Button {
    constructor(source: Source);

    title: string | null;
    body: string | null;
    useBodyMarkup: boolean;
    icon: Gio.Icon | null;
    datetime: GLib.DateTime | null;

    expanded: boolean;

    close(): void;

    setActionArea(actor: Clutter.Actor): void;

    addMediaControl(iconName: string, callback: () => void): void;

    expand(animate?: boolean): void;

    unexpand(animate?: boolean): void;

    canClose(): boolean;

    vfunc_key_press_event(keyEvent: Clutter.KeyEvent): boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js#L691
 * @version 48
 */
export class NotificationMessage extends Message {
    /** @hidden */
    override _init(params?: Partial<St.Button.ConstructorProps>): void;
    /** @hidden */
    override _init(title: string, body: string): void;
    _init(notification: Notification): void;

    vfunc_clicked(): void;
    canClose(): boolean;

    _getIcon(): St.Icon;
    _onUpdated(n: Notification, _clear?: boolean): void;
}

declare class MediaMessage extends Message {
    _player: MprisPlayer;
    _icon: St.Icon;
    _secondaryBin: St.Bin;
    _closeButton: St.Button;
    _prevButton: St.Button;
    _playPauseButton: St.Button;
    _nextButton: St.Button;

    constructor(player: MprisPlayer);

    /** @hidden */
    override _init(params?: Partial<St.Button.ConstructorProps>): void;
    /** @hidden */
    override _init(title: string, body: string): void;
    _init(player: MprisPlayer): void;

    vfunc_clicked(): void;

    _updateNavButton(button: St.Button, sensitive?: boolean): void;
    _update(): void;
}

declare class NotificationMessageGroup extends St.Widget {
    source: Source;
    _expanded: boolean;
    _nUrgent: number;
    _focusChild: null | Clutter.Actor;

    constructor(source: Source);

    get expanded(): boolean;

    get hasUrgent(): boolean;

    _onKeyFocusIn(actor: Clutter.Actor): void;

    get focusChild(): null | Clutter.Actor;

    expand(): Promise<void>;

    collapse(): Promise<void>;

    get expandedHeight(): number;

    _ensureCoverPosition(): void;

    _updateStackedMessagesFade(): void;

    canClose(): boolean;

    _addNotification(notification: Notification): void;

    _removeNotification(notification: Notification): void;

    vfunc_paint(paintContext: Clutter.PaintContext): void;

    vfunc_pick(pickContext: Clutter.PickContext): void;

    vfunc_map(): void;

    vfunc_get_focus_chain(): Clutter.Actor[];

    _moveMessage(message: Message, index: number): void;

    close(): void;
}

declare class MessageGroupExpanderLayout extends Clutter.LayoutManager {
    expansion: number;

    constructor(cover: Clutter.Actor, header: MessageHeader);

    getExpandedHeight(container: Clutter.Actor, forWidth: number): [number, number];

    vfunc_get_preferred_width(container: Clutter.Actor, forHeight: number): [number, number];

    vfunc_get_preferred_height(container: Clutter.Actor, forWidth: number): [number, number];

    vfunc_allocate(container: Clutter.Actor, box: Clutter.ActorBox): void;
}
declare class MessageViewLayout extends Clutter.LayoutManager {
    constructor(overlay: Clutter.Actor);

    vfunc_get_preferred_width(container: Clutter.Actor, forHeight: number): [number, number];

    vfunc_get_preferred_height(container: Clutter.Actor, forWidth: number): [number, number];

    vfunc_allocate(container: Clutter.Actor, box: Clutter.ActorBox): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageList.js#L1391
 * @version 48
 */
export class MessageView extends St.Viewport {
    messages: Message[];

    _nUrgent: number;
    _mediaSource: MprisSource;
    _overlay: Clutter.Actor;
    _expandedGroup: NotificationMessageGroup | null;

    get empty(): boolean;

    get canClear(): boolean;

    _onKeyFocusIn(messageActor: Clutter.Actor): void;

    vfunc_get_focus_chain(): Clutter.Actor[];

    _addMessageAtIndex(message: Message, index: number): void;

    _moveMessage(message: Message, index: number): void;

    _removeMessage(message: Message): void;

    clear(): void;

    // When a group is expanded the user isn't allowed to scroll outside the expanded group,
    // therefore the adjustment used by the MessageView needs to be different then the external
    // adjustment used by the scrollbar and scrollview.
    vfunc_set_adjustments(hadjustment: St.Adjustment, vadjustment: St.Adjustment): void;

    vfunc_allocate(box: Clutter.ActorBox): void;

    vfunc_style_changed(): void;

    _setupMpris(): void;

    _addPlayer(player: MprisPlayer): void;

    _removePlayer(player: MprisPlayer): void;

    _setupNotifications(): void;

    _addNotificationSource(source: Source): void;

    _removeNotificationSource(source: Source): void;

    // Try to center the expanded group in the available space
    _scrollToExpandedGroup(): void;

    get expandedGroup(): NotificationMessageGroup | null;

    _setExpandedGroup(group: NotificationMessageGroup | null): Promise<void>;

    collapse(): void;

    _highlightGroup(group: NotificationMessageGroup): void;

    _unhighlightGroup(): void;
}
