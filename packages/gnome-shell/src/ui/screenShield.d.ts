// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/screenShield.js

import Clutter from 'gi://Clutter';
import Gio from '@girs/gio-2.0';
import Meta from 'gi://Meta';
import St from 'gi://St';

import * as Signals from '../misc/signals.js';

import * as GnomeSession from '../misc/gnomeSession.js';
// import * as OVirt from '../gdm/oVirt.js';
import * as LoginManager from '../misc/loginManager.js';
import * as Lightbox from './lightbox.js';
import * as Main from './main.js';
import * as MessageTray from './messageTray.js';
// import * as ShellDBus from './shellDBus.js';
// import * as SmartcardManager from '../gdm/smartcardManager.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/screenShield.js#L50
 * @version 51
 */
export namespace ScreenShield {
    interface SignalMap {
        'active-changed': [];
        'locked-changed': [];
        'lock-screen-shown': [];
        'wake-up-screen': [];
    }
}

/**
 * If you are setting org.gnome.desktop.session.idle-delay directly in dconf,
 * rather than through System Settings, you also need to set
 * org.gnome.settings-daemon.plugins.power.sleep-display-ac and
 * org.gnome.settings-daemon.plugins.power.sleep-display-battery to the same value.
 * This will ensure that the screen blanks at the right time when it fades out.
 * https://bugzilla.gnome.org/show_bug.cgi?id=668703 explains the dependency.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/screenShield.js#L50
 * @version 51
 */
export class ScreenShield<S extends Signals.SignalMap<S> = ScreenShield.SignalMap> extends Signals.EventEmitter<S> {
    actor: typeof Main.layoutManager.screenShieldGroup;
    idleMonitor: Meta.IdleMonitor;

    _lockScreenState: MessageTray.State;
    _lockScreenGroup: St.Widget;
    _lockDialogGroup: St.Widget;
    _presence: Gio.DBusProxy & GnomeSession.PresenceIface;
    _screenSaverDBus: any;
    _smartcardManager: any;
    _credentialManagers: { [key: string]: any };
    _loginManager: LoginManager.LoginManagerSystemd | LoginManager.LoginManagerDummy;
    _loginSession: Gio.DBusProxy | null;
    _settings: Gio.Settings;
    _lockSettings: Gio.Settings;
    _grab: Clutter.Grab | null;
    _isGreeter: boolean;
    _isActive: boolean;
    _isLocked: boolean;
    _inUnlockAnimation: boolean;
    _inhibited: boolean;
    _activationTime: number;
    _becameActiveId: number;
    _lockTimeoutId: number;
    /**
     * The "long" lightbox is used for the longer (20 seconds) fade from session
     * to idle status.
     */
    _longLightbox: Lightbox.Lightbox;
    /**
     * The "short" lightbox is used for quickly fading to black when locking
     * manually.
     */
    _shortLightbox: Lightbox.Lightbox;
    _cursorTracker: Meta.CursorTracker;
    _motionListener: Clutter.MotionController;

    _getLoginSession(): Promise<void>;

    _setActive(active: boolean): void;

    _setLocked(locked: boolean): void;

    _activateDialog(): void;

    _maybeCancelDialog(): void;

    _becomeModal(): void;

    _syncInhibitor(): Promise<void>;

    _prepareForSleep(loginManager: LoginManager.LoginManagerSystemd | LoginManager.LoginManagerDummy, aboutToSuspend: boolean): void;

    _onStatusChanged(status: GnomeSession.PresenceStatus): void;

    _activateFade(lightbox: Lightbox.Lightbox, time: number): void;

    _onUserBecameActive(): void;

    _onLongLightbox(lightBox: Lightbox.Lightbox): void;

    _onShortLightbox(lightBox: Lightbox.Lightbox): void;

    showDialog(): void;

    _hideLockScreenComplete(): void;

    _showPointer(): void;

    _hidePointer(): void;

    _hidePointerUntilMotion(): void;

    _hideLockScreen(animate: boolean): void;

    _ensureUnlockDialog(allowCancel: boolean): boolean;

    _onUnlockFailed(): void;

    _resetLockScreen(params: { animateLockScreen: boolean; fadeToBlack: boolean }): void;

    _lockScreenShown(params: { animateFade: boolean; fadeToBlack: boolean }): void;

    _wakeUpScreen(): void;

    get locked(): boolean;

    get active(): boolean;

    get activationTime(): number;

    deactivate(animate: boolean): void;

    _continueDeactivate(animate: boolean): void;

    _completeDeactivate(): void;

    activate(animate: boolean): void;

    addCredentialManager(serviceName: string, credentialManager: any): void;

    removeCredentialManager(serviceName: string): void;

    lock(animate: boolean): void;

    /** If the previous shell crashed, and gnome-session restarted us, then re-lock */
    lockIfWasLocked(): void;
}
