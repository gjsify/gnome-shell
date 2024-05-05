// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js

import type GObject from '@girs/gobject-2.0';
import type GLib from '@girs/glib-2.0';
import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-14';
import type Clutter from '@girs/clutter-14';
import type GnomeDesktop from '@girs/gnomedesktop-4.0';
import type Shell from '@girs/shell-14';

import type { PresenceStatus } from '../misc/gnomeSession.js';
import type * as MessageList from './messageList.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L20
 * @version 46
 */
export const ANIMATION_TIME: number;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L36
 * @version 46
 */
export enum State {
    HIDDEN = 0,
    SHOWING = 1,
    SHOWN = 2,
    HIDING = 3,
}

/**
 * These reasons are useful when we destroy the notifications received through
 * the notification daemon. We use EXPIRED for notifications that we dismiss
 * and the user did not interact with, DISMISSED for all other notifications
 * that were destroyed as a result of a user action, SOURCE_CLOSED for the
 * notifications that were requested to be destroyed by the associated source,
 * and REPLACED for notifications that were destroyed as a consequence of a
 * newer version having replaced them.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L51
 * @version 46
 */
export enum NotificationDestroyedReason {
    EXPIRED = 1,
    DISMISSED = 2,
    SOURCE_CLOSED = 3,
    REPLACED = 4,
}

/**
 * Message tray has its custom Urgency enumeration. LOW, NORMAL and CRITICAL
 * urgency values map to the corresponding values for the notifications received
 * through the notification daemon. HIGH urgency value is used for chats received
 * through the Telepathy client.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L62
 * @version 46
 */
export enum Urgency {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
    CRITICAL = 3,
}

/**
 * The privacy of the details of a notification. USER is for notifications which
 * contain private information to the originating user account (for example,
 * details of an e-mail they’ve received). SYSTEM is for notifications which
 * contain information private to the physical system (for example, battery
 * status) and hence the same for every user. This affects whether the content
 * of a notification is shown on the lock screen.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L76
 * @version 46
 */
export enum PrivacyScope {
    USER = 0,
    SYSTEM = 1,
}

/**
 * An object that holds all bits of configurable policy related to a notification
 * source, such as whether to play sound or honour the critical bit.
 *
 * A notification without a policy object will inherit the default one.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L160
 * @version 46
 */
export abstract class NotificationPolicy extends GObject.Object {
    readonly enable: boolean;
    readonly enableSound: boolean;
    readonly showBanners: boolean;
    readonly forceExpanded: boolean;
    readonly showInLockScreen: boolean;
    readonly detailsInLockScreen: boolean;

    public static newForApp(app: Shell.App): NotificationPolicy;

    /**
     * Do nothing for the default policy. These methods are only useful for the
     * GSettings policy.
     */
    store(): void;

    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L213
 * @version 46
 */
export class NotificationGenericPolicy extends NotificationPolicy {
    public id: string;

    protected _masterSettings: Gio.Settings;

    constructor();
    public _init(): void;

    public destroy(): void;

    protected _changed(settings: Gio.Settings, key: string): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L243
 * @version 46
 */
export class NotificationApplicationPolicy extends NotificationPolicy {
    public id: string;

    protected _masterSettings: Gio.Settings;
    protected _canonicalId: string;
    protected _settings: Gio.Settings;

    constructor(id: string);
    public _init(id: string): void;

    public store(): void;
    public destroy(): void;

    protected _changed(settings: Gio.Settings, key: string): void;
    protected _canonicalizeId(id: string): string;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L316
 * @version 46
 */
export class Sound extends GObject.Object {
    constructor(file: Gio.File | null | undefined, themedName?: string);

    public play(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L335
 * @version 46
 */
export class Action extends GObject.Object {
    constructor(label: string, callback: () => void);

    public readonly label: string;

    public activate(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L482
 * @version 46
 */
export declare namespace Source {
    export interface ConstructorProps extends MessageList.Source.ConstructorProps {
        policy: NotificationPolicy;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L499
 * @version 46
 */
export class Source extends MessageList.Source {
    constructor(params?: Partial<Source.ConstructorProps>);

    public readonly notifications: readonly Notification[];

    public policy: NotificationPolicy;

    public readonly count: number;

    public readonly unseenCount: number;

    public readonly countVisible: number;

    public countUpdated(): void;

    public readonly narrowestPrivacyScope: PrivacyScope;

    public addNotification(notification: Notification): void;

    public destroy(reason: NotificationDestroyedReason): void;

    public open(): void;

    public destroyNonResidentNotifications(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'destroy', callback: ($obj: Source, reason: NotificationDestroyedReason) => void): number;
    connect_after(sigName: 'destroy', callback: ($obj: Source, reason: NotificationDestroyedReason) => void): number;

    connect(sigName: 'notification-added', callback: ($obj: Source, notification: Notification) => void): number;
    connect_after(sigName: 'notification-added', callback: ($obj: Source, notification: Notification) => void): number;

    connect(sigName: 'notification-removed', callback: ($obj: Source, notification: Notification) => void): number;
    connect_after(sigName: 'notification-removed', callback: ($obj: Source, notification: Notification) => void): number;

    connect(sigName: 'notification-request-banner', callback: ($obj: Source, notification: Notification) => void): number;
    connect_after(sigName: 'notification-request-banner', callback: ($obj: Source, notification: Notification) => void): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L604
 * @version 46
 */
export declare namespace Notification {
    export interface ObjectProperties {
        source: Source | null;
        title: string | null;
        body: string | null;
        useBodyMarkup: boolean;
        gicon: Gio.Icon | null;
        iconName: string | null;
        sound: Sound | null;
        datetime: GLib.DateTime | null;
        privacyScope: PrivacyScope;
        urgency: Urgency;
        acknowledged: boolean;
        resident: boolean;
        forFeedback: boolean;
        isTransient: boolean;
    }

    export type ConstructorProps = Partial<ObjectProperties> & Partial<GObject.Object.ConstructorProps>;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L352
 * @version 46
 */
export class Notification extends GObject.Object implements Notification.ObjectProperties {
    constructor(params?: Notification.ConstructorProps);

    readonly actions: Action[];

    source: Source | null;
    title: string | null;
    body: string | null;
    useBodyMarkup: boolean;
    gicon: Gio.Icon | null;
    sound: Sound | null;
    datetime: GLib.DateTime;
    acknowledged: boolean;
    resident: boolean;
    forFeedback: boolean;
    isTransient: boolean;

    get iconName(): string | null;
    set iconName(iconName: string);

    privacyScope: PrivacyScope;

    urgency: Urgency;

    /**
     *
     * @param label the label for the action's button
     * @param callback the callback for the action
     */
    addAction(label: string, callback: () => void): void;

    clearActions(): void;

    playSound(): void;

    activate(): void;

    destroy(reason?: NotificationDestroyedReason): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'action-added', callback: ($obj: Notification, action: Action) => void): number;
    connect_after(sigName: 'action-added', callback: ($obj: Notification, action: Action) => void): number;

    connect(sigName: 'action-removed', callback: ($obj: Notification, action: Action) => void): number;
    connect_after(sigName: 'action-removed', callback: ($obj: Notification, action: Action) => void): number;

    connect(sigName: 'activated', callback: ($obj: Notification) => void): number;
    connect_after(sigName: 'activated', callback: ($obj: Notification) => void): number;

    connect(sigName: 'destroy', callback: ($obj: Notification, reason: NotificationDestroyedReason) => void): number;
    connect_after(sigName: 'destroy', callback: ($obj: Notification, reason: NotificationDestroyedReason) => void): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L676
 * @version 46
 */
export class MessageTray extends St.Widget {
    constructor();

    public idleMonitor: GnomeDesktop.IdleMonitor;

    public bannerAlignment: number;

    public readonly queueCount: number;

    public bannerBlocked: boolean;

    public contains(descendant: Clutter.Actor): boolean;
    public contains(source: Source): boolean;
    public add(source: Source): void;
    public getSources(): Source[];

    protected _sessionUpdated(): void;
    protected _onDragBegin(): void;
    protected _onDragEnd(): void;

    protected _onNotificationKeyRelease(actor: St.Widget, event: Clutter.Event): boolean;
    protected _expireNotification(): void;
    protected _addSource(source: Source): void;
    protected _removeSource(source: Source): void;
    protected _onSourceEnableChanged(policy: NotificationPolicy, source: Source): void;
    protected _onNotificationRemoved(source: Source, notification: Notification): void;
    protected _onNotificationShow(_source: Source, notification: Notification): void;
    protected _resetNotificationLeftTimeout(): void;
    protected _onNotificationHoverChanged(): void;
    protected _onStatusChanged(status: PresenceStatus): void;
    protected _onNotificationLeftTimeout(): void;

    /**
     * All of the logic for what happens when occurs here; the various
     * event handlers merely update variables such as
     * 'this._pointerInNotification', 'this._traySummoned', etc, and
     * _updateState() figures out what (if anything) needs to be done
     * at the present time.
     */
    protected _updateState(): void;

    protected _onIdleMonitorBecameActive(): void;
    protected _showNotification(): void;
    protected _updateShowingNotification(): void;
    protected _showNotificationCompleted(): void;
    protected _updateNotificationTimeout(timeout: number): void;
    protected _notificationTimeout(): void;
    protected _hideNotification(animate?: boolean): void;
    protected _hideNotificationCompleted(): void;
    protected _expandActiveNotification(): void;
    protected _expandBanner(autoExpanding?: boolean): void;
    protected _ensureBannerFocused(): void;

    // General signal handler methods
    connect(sigName: string, callback: (...args: any[]) => void): number;
    connect_after(sigName: string, callback: (...args: any[]) => void): number;
    emit(sigName: string, ...args: any[]): void;
    disconnect(id: number): void;

    // Specific signal handler methods
    connect(sigName: 'queue-changed', callback: ($obj: MessageTray) => void): number;
    connect_after(sigName: 'queue-changed', callback: ($obj: MessageTray) => void): number;

    connect(sigName: 'source-added', callback: ($obj: MessageTray, source: Source) => void): number;
    connect_after(sigName: 'source-added', callback: ($obj: MessageTray, source: Source) => void): number;

    connect(sigName: 'source-removed', callback: ($obj: MessageTray, source: Source) => void): number;
    connect_after(sigName: 'source-removed', callback: ($obj: MessageTray, source: Source) => void): number;
}

/**
 * The {Source} that should be used to send system notifications.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L1290
 * @version 46
 */
export function getSystemSource(): Source;
