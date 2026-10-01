// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panel.js

import type St from '@girs/st-51';
import type Clutter from '@girs/clutter-51';
import type Meta from '@girs/meta-51';

import type { Button, ButtonBox } from './panelMenu.js';
import type { PopupMenuManager } from './popupMenu.js';
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

import type { DateMenuButton } from './dateMenu.js';
import type { ATIndicator } from './status/accessibility.js';
import type { InputSourceIndicator } from './status/keyboard.js';
import type { DwellClickIndicator } from './status/dwellClick.js';
import type { ScreenRecordingIndicator, ScreenSharingIndicator } from './status/remoteAccess.js';

/**
 * @version 48
 */
export class UnsafeModeIndicator extends SystemIndicator {
    _indicator: St.Icon;
}

/**
 * @version 50
 */
export class ActivitiesButton extends Button {}

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

    addExternalIndicator(indicator: SystemIndicator, colSpan?: number): void;

    _setupIndicators(): Promise<void>;
    _addItemsBefore(items: Clutter.Actor, sibling: Clutter.Actor, colSpan?: number): void;
}

/**
 * @version 50
 */
interface PanelItems {
    activities?: ActivitiesButton;
    quickSettings?: QuickSettings;
    dateMenu?: DateMenuButton;
    a11y?: ATIndicator;
    keyboard?: InputSourceIndicator;
    dwellClick?: DwellClickIndicator;
    screenRecording?: ScreenRecordingIndicator;
    screenSharing?: ScreenSharingIndicator;
}

/**
 * @version 50
 */
export class Panel extends St.Widget {
    statusArea: PanelItems & { [role: string]: unknown };
    menuManager: PopupMenuManager;

    boxOpacity: number;

    constructor();
    _init(): void;

    _onWindowDragGestureRecognize(): void;

    _toggleMenu(indicator: Button): void;

    _closeMenu(indicator: Button): void;

    toggleCalendar(): void;

    toggleQuickSettings(): void;

    closeCalendar(): void;

    closeQuickSettings(): void;

    _updatePanel(): void;

    _hideIndicators(): void;

    _ensureIndicator(role: keyof PanelItems): ButtonBox | null;

    _updateBox(elements: (keyof PanelItems)[], box: St.BoxLayout): void;

    _addToPanelBox(role: string, indicator: Button, position: number, box: St.BoxLayout): void;

    addToStatusArea<T extends Button>(role: string, indicator: T, position?: number, box?: 'left' | 'center' | 'right'): T;

    _onMenuSet(indicator: Button): void;

    _getDraggableWindowForPosition(stageX: number): Meta.Window | null;
}
