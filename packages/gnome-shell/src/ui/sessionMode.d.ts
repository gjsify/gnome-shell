// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/sessionMode.js

import St from 'gi://St';
import * as Signals from '../misc/signals.js';

declare type Modes = {
    restrictive: {
        parentMode: null;
        stylesheetName: 'gnome-shell.css';
        colorScheme: 'prefer-dark';
        themeResourceName: 'gnome-shell-theme.gresource';
        hasOverview: false;
        showCalendarEvents: false;
        showWelcomeDialog: false;
        allowSettings: false;
        allowScreencast: false;
        enabledExtensions: [];
        hasRunDialog: false;
        hasWorkspaces: false;
        hasWindows: false;
        hasNotifications: false;
        hasWmMenus: false;
        isLocked: false;
        isGreeter: false;
        isPrimary: false;
        unlockDialog: null;
        components: [];
        panel: {
            left: [];
            center: [];
            right: [];
        };
        panelStyle: null;
    };

    gdm: {
        hasNotifications: true;
        isGreeter: true;
        isPrimary: true;
        unlockDialog: St.Widget;
        components: ['networkAgent', 'polkitAgent'] | ['polkitAgent'];
        panel: {
            left: [];
            center: ['dateMenu'];
            right: ['dwellClick', 'keyboard', 'quickSettings'];
        };
        panelStyle: 'login-screen';
    };

    'unlock-dialog': {
        isLocked: true;
        unlockDialog: undefined;
        components: ['networkAgent', 'polkitAgent'] | ['polkitAgent'];
        panel: {
            left: [];
            center: [];
            right: ['dwellClick', 'a11y', 'keyboard', 'quickSettings'];
        };
        panelStyle: 'unlock-screen';
    };

    user: {
        hasOverview: true;
        showCalendarEvents: true;
        showWelcomeDialog: true;
        allowSettings: true;
        allowScreencast: true;
        hasRunDialog: true;
        hasWorkspaces: true;
        hasWindows: true;
        hasWmMenus: true;
        hasNotifications: true;
        isLocked: false;
        isPrimary: true;
        unlockDialog: St.Widget;
        components: ['polkitAgent', 'keyring', 'autorunManager', 'automountManager', 'networkAgent'?];
        panel: {
            left: ['activities'];
            center: ['dateMenu'];
            right: ['screenRecording', 'screenSharing', 'dwellClick', 'a11y', 'keyboard', 'quickSettings'];
        };
    };
};

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/sessionMode.js#L139
 * @version 51
 */
export function listModes(): void;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/sessionMode.js#L154
 * @version 51
 */
export namespace SessionMode {
    interface SignalMap {
        updated: [];
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/sessionMode.js#L154
 * @version 51
 */
export class SessionMode<Mode extends string = keyof Modes, S extends Signals.SignalMap<S> = SessionMode.SignalMap> extends Signals.EventEmitter<S> {
    _modeStack: Mode[];

    pushMode(mode: Mode): void;

    popMode(mode: Mode): void;

    switchMode(to: Mode): void;

    get currentMode(): Mode;

    // Merges the fields of currentMode into this.
    _sync(): void;
}

type ModeFields = Modes[keyof Modes];
type SessionModeFields = {
    [K in keyof ModeFields]: ModeFields[K];
};

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/sessionMode.js#L154
 * @version 51
 */
export interface SessionMode extends SessionModeFields {}
