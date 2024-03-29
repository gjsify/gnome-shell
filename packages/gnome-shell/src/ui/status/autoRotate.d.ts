// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/autoRotate.js

import Gio from '@girs/gio-2.0';
import * as SystemActions from '../../misc/systemActions.js';
import { QuickToggle, SystemIndicator } from '../quickSettings.js';

/**
 * Class representing a toggle for rotation settings.
 * This class extends `QuickToggle`.
 */
export declare class RotationToggle extends QuickToggle {
    private _systemActions: SystemActions.SystemActions;
    private _settings: Gio.Settings;

    /**
     * Initializes a new instance of `RotationToggle`.
     * It sets up the system actions and binds properties for rotation settings.
     */
    _init(): void;
}

/**
 * Class representing a system indicator.
 * This class extends `SystemIndicator`.
 */
export declare class Indicator extends SystemIndicator {
    /**
     * Initializes a new instance of `Indicator`.
     * It adds a `RotationToggle` to the `quickSettingsItems`.
     */
    _init(): void;
}
