// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/camera.js

import Shell from '@girs/shell-17';
import St from '@girs/st-17';
import { SystemIndicator } from '../quickSettings.js';

/**
 * System indicator for the camera status.
 */
export declare class Indicator extends SystemIndicator {
    _indicator: St.Icon;
    _cameraMonitor: Shell.CameraMonitor;

    /**
     * Constructs a new instance of the camera indicator.
     */
    constructor();

    // Note: There's no need for additional methods or properties in this class
    // as per the provided JavaScript code. If there are more functionalities
    // in the actual implementation, they should be added here.
}
