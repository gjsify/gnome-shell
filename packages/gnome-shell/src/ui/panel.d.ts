// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panel.js

import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';
import type Meta from '@girs/meta-17';

import type { Button } from './panelMenu.js';
import type { DateMenuButton } from './dateMenu.js';
import { PopupMenuManager } from './popupMenu.js';
import type { QuickSettingsMenu, SystemIndicator } from './quickSettings.js';

import type * as AutoRotateStatus from './status/autoRotate.js';
import type * as BackgroundAppsStatus from './status/backgroundApps.js';
import type * as BacklightStatus from './status/backlight.js';
import type * as BluetoothStatus from './status/bluetooth.js';
import type * as BrightnessStatus from './status/brightness.js';
import type * as CameraStatus from './status/camera.js';
import type * as DarkModeStatus from './status/darkMode.js';
import type * as LocationStatus from './status/location.js';
import type * as NetworkStatus from './status/network.js';
import type * as NightLightStatus from './status/nightLight.js';
import type * as PowerProfileStatus from './status/powerProfiles.js';
import type * as RemoteAccessStatus from './status/remoteAccess.js';
import type * as RFKillStatus from './status/rfkill.js';
import type * as SystemStatus from './status/system.js';
import type * as ThunderboltStatus from './status/thunderbolt.js';
import type * as VolumeStatus from './status/volume.js';

/**
 * @version 48
 */
export class UnsafeModeIndicator extends SystemIndicator {
    _indicator: St.Icon;
}

/**
 * @version 48
 */
export class QuickSettings extends Button {
    override menu: QuickSettingsMenu;
    _indicators: St.BoxLayout;

    _network?: NetworkStatus.Indicator | null;
    _bluetooth?: BluetoothStatus.Indicator | null;
    _system?: SystemStatus.Indicator;
    _camera?: CameraStatus.Indicator;
    _volumeOutput?: VolumeStatus.OutputIndicator;
    _volumeInput?: VolumeStatus.InputIndicator;
    _brightness?: BrightnessStatus.Indicator;
    _remoteAccess?: RemoteAccessStatus.RemoteAccessApplet;
    _location?: LocationStatus.Indicator;
    _thunderbolt?: ThunderboltStatus.Indicator;
    _nightLight?: NightLightStatus.Indicator;
    _darkMode?: DarkModeStatus.Indicator;
    _backlight?: BacklightStatus.Indicator;
    _powerProfiles?: PowerProfileStatus.Indicator;
    _rfkill?: RFKillStatus.Indicator;
    _autoRotate?: AutoRotateStatus.Indicator;
    _unsafeMode?: UnsafeModeIndicator;
    _backgroundApps?: BackgroundAppsStatus.Indicator;

    addExternalIndicator(indicator: Button, colSpan?: number): void;

    _setupIndicators(): Promise<void>;
    _addItemsBefore(items: Clutter.Actor, sibling: Clutter.Actor, colSpan?: number): void;
}

/**
 * @version 46
 */
export class Panel extends St.Widget {
    statusArea: {
        appMenu: any;
        dateMenu: DateMenuButton;
        quickSettings: QuickSettings;
    };
    menuManager: PopupMenuManager;

    boxOpacity: number;

    constructor();
    _init(): void;

    _tryDragWindow(event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _onButtonPress(actor: St.Widget, event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _onTouchEvent(actor: St.Widget, event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _toggleMenu(indicator: Button): void;

    _closeMenu(indicator: Button): void;

    toggleAppMenu(): void;

    toggleCalendar(): void;

    closeCalendar(): void;

    closeQuickSettings(): void;

    _updatePanel(): void;

    _hideIndicators(): void;

    _ensureIndicator(role: string): any;

    updateBox(elements: any[], box: any): void;

    _addToPanelBox(role: string, indicator: Button, position: number, box: any): void;

    addToStatusArea(role: string, indicator: Button, position?: number, box?: any): any;

    _onMenuSet(indicator: Button): void;

    _getDraggableWindowForPosition(stageX: number): Meta.Window | null;
}
