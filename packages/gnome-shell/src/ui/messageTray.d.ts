// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js

import type GObject from '@girs/gobject-2.0';
import type GLib from '@girs/glib-2.0';
import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';
import type GnomeDesktop from '@girs/gnomedesktop-4.0';
import type Shell from '@girs/shell-17';

import type { PresenceStatus } from '../misc/gnomeSession.js';
import type * as MessageList from './messageList.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L20
 * @version 49
 */
export const ANIMATION_TIME: number;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L36
 * @version 49
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
 * @version 49
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
 * @version 49
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
 * @version 49
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
 * @version 49
 */
export abstract class NotificationPolicy extends GObject.Object {
    readonly enable: boolean;
    readonly enableSound: boolean;
    readonly showBanners: boolean;
    readonly forceExpanded: boolean;
    readonly showInLockScreen: boolean;
    readonly detailsInLockScreen: boolean;

    static newForApp(app: Shell.App): NotificationPolicy;

    /**
     * Do nothing for the default policy. These methods are only useful for the
     * GSettings policy.
     */
    store(): void;

    destroy(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L213
 * @version 49
 */
export class NotificationGenericPolicy extends NotificationPolicy {
    id: string;

    _masterSettings: Gio.Settings;

    constructor();
    _init(): void;

    destroy(): void;

    _changed(settings: Gio.Settings, key: string): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L243
 * @version 49
 */
export class NotificationApplicationPolicy extends NotificationPolicy {
    id: string;

    _masterSettings: Gio.Settings;
    _canonicalId: string;
    _settings: Gio.Settings;

    constructor(id: string);
    _init(id: string): void;

    store(): void;
    destroy(): void;

    _changed(settings: Gio.Settings, key: string): void;
    _canonicalizeId(id: string): string;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L316
 * @version 49
 */
export class Sound extends GObject.Object {
    constructor(file?: Gio.File | null, themedName?: string | null);

    play(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L335
 * @version 49
 */
export class Action extends GObject.Object {
    constructor(label: string, callback: () => void);

    readonly label: string;

    activate(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L482
 * @version 49
 */
export declare namespace Source {
    export interface ConstructorProps extends MessageList.Source.ConstructorProps {
        policy: NotificationPolicy;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/messageTray.js#L499
 * @version 49
 */
export class Source extends MessageList.Source {
    constructor(params?: Partial<Source.ConstructorProps>);

    readonly notifications: readonly Notification[];

    policy: NotificationPolicy;

    readonly count: number;

    readonly unseenCount: number;

    readonly countVisible: boolean;

    countUpdated(): void;

    readonly narrowestPrivacyScope: PrivacyScope;

    addNotification(notification: Notification): void;

    destroy(reason: NotificationDestroyedReason): void;

    open(): void;

    destroyNonResidentNotifications(): void;

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
 * @version 49
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
 * @version 49
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
    addAction(label: string, callback: () => void): Action;

    removeAction(action: Action): void;

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
 * @version 48
 */
export class MessageTray extends St.Widget {
    constructor();

    idleMonitor: GnomeDesktop.IdleMonitor;

    bannerAlignment: number;

    readonly queueCount: number;

    set bannerBlocked(v: boolean);

    contains(descendant: Clutter.Actor): boolean;
    contains(source: Source): boolean;
    add(source: Source): void;
    getSources(): Source[];

    _sessionUpdated(): void;
    _onDragBegin(): void;
    _onDragEnd(): void;

    _onNotificationKeyRelease(actor: St.Widget, event: Clutter.Event): boolean;
    _expireNotification(): void;
    _addSource(source: Source): void;
    _removeSource(source: Source): void;
    _onSourceEnableChanged(policy: NotificationPolicy, source: Source): void;
    _onNotificationRemoved(source: Source, notification: Notification): void;
    _onNotificationShow(_source: Source, notification: Notification): void;
    _resetNotificationLeftTimeout(): void;
    _onNotificationHoverChanged(): void;
    _onStatusChanged(status: PresenceStatus): void;
    _onNotificationLeftTimeout(): void;

    /**
     * All of the logic for what happens when occurs here; the various
     * event handlers merely update variables such as
     * 'this._pointerInNotification', 'this._traySummoned', etc, and
     * _updateState() figures out what (if anything) needs to be done
     * at the present time.
     */
    _updateState(): void;

    _onIdleMonitorBecameActive(): void;
    _showNotification(): void;
    _updateShowingNotification(): void;
    _showNotificationCompleted(): void;
    _updateNotificationTimeout(timeout: number): void;
    _notificationTimeout(): void;
    _hideNotification(animate?: boolean): void;
    _hideNotificationCompleted(): void;
    _expandActiveNotification(): void;
    _expandBanner(autoExpanding?: boolean): void;
    _ensureBannerFocused(): void;

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
 * @version 49
 */
export function getSystemSource(): Source;
