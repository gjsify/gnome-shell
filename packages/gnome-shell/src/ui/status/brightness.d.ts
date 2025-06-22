// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/brightness.js

import Gio from '@girs/gio-2.0';

import { QuickSlider, SystemIndicator } from '../quickSettings.js';

/**
 * Proxy wrapper for BrightnessInterface.
 */
declare const BrightnessProxy: Gio.DBusProxy;

/**
 * Class representing a slider item for adjusting screen brightness.
 * Extends `QuickSlider`.
 */
export declare class BrightnessItem extends QuickSlider {
    _proxy: typeof BrightnessProxy;
    _sliderChangedId: number;

    /**
     * Initializes a new instance of `BrightnessItem`.
     */
    _init(): void;

    /**
     * Handles changes in the slider's value, updating brightness.
     */
    _sliderChanged(): void;

    /**
     * Updates the slider's value without triggering change events.
     * @param value - The new value to set for the slider.
     */
    _changeSlider(value: number): void;

    /**
     * Synchronizes the brightness with the system's current setting.
     */
    _sync(): void;
}

/**
 * System indicator for screen brightness control.
 */
export declare class Indicator extends SystemIndicator {
    /**
     * Initializes a new instance of `Indicator`.
     */
    _init(): void;
}
