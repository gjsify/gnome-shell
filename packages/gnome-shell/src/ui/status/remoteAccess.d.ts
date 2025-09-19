/**
 * Type definitions for the Remote Access feature in GNOME's UI status.
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/remoteAccess.js
 */

import Clutter from '@girs/clutter-17';
import St from '@girs/st-17';
import * as PanelMenu from '../panelMenu.js';
import { SystemIndicator } from '../quickSettings.js';

/**
 * Minimum amount of time the shared indicator is visible (in microseconds).
 */
declare const MIN_SHARED_INDICATOR_VISIBLE_TIME_US: number;

/**
 * Class representing the Remote Access Applet.
 */
export declare class RemoteAccessApplet extends SystemIndicator {
    _handles: Set<any>;
    _indicator: any;

    /**
     * Initialize a new Remote Access Applet.
     */
    _init(): void;

    /**
     * Determine if recording is in progress.
     */
    _isRecording(): boolean;

    /**
     * Synchronize the applet's visibility.
     */
    _sync(): void;

    /**
     * Handle the stop event for a recording handle.
     */
    _onStopped(handle: any): void;

    /**
     * Handle a new recording handle.
     */
    _onNewHandle(handle: any): void;
}

/**
 * Class representing the Screen Recording Indicator.
 */
export declare class ScreenRecordingIndicator extends PanelMenu.ButtonBox {
    _box: St.BoxLayout;
    _label: St.Label;
    _icon: St.Icon;
    _timeoutId: number;
    _secondsPassed: number;

    /**
     * Initialize a new Screen Recording Indicator.
     */
    _init(): void;

    /**
     * Override the default event handling.
     */
    vfunc_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Update the label displaying recording time.
     */
    _updateLabel(): void;

    /**
     * Handle changes in screencast progress.
     */
    _onScreencastInProgressChanged(): void;
}

/**
 * Class representing the Screen Sharing Indicator.
 */
export declare class ScreenSharingIndicator extends PanelMenu.ButtonBox {
    _box: St.BoxLayout;
    _controller: any;
    _handles: Set<any>;
    _hideIndicatorId?: number;
    _visibleTimeUs?: number;

    /**
     * Initialize a new Screen Sharing Indicator.
     */
    _init(): void;

    /**
     * Handle a new screen sharing handle.
     */
    _onNewHandle(handle: any): void;

    /**
     * Override the default event handling.
     */
    vfunc_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Stop all ongoing screen sharing sessions.
     */
    _stopSharing(): void;

    /**
     * Hide the screen sharing indicator.
     */
    _hideIndicator(): boolean;

    /**
     * Synchronize the visibility of the indicator.
     */
    _sync(): void;
}
