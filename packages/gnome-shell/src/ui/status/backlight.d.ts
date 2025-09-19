import St from '@girs/st-17';
import Gio from '@girs/gio-2.0';

import { QuickMenuToggle, SystemIndicator } from '../quickSettings.js';
import * as PopupMenu from '../popupMenu.js';
import { Slider } from '../slider.js';

declare const BrightnessProxy: Gio.DBusProxy;

/**
 * Class for a slider item in the menu for adjusting brightness.
 * This class extends `PopupMenu.PopupBaseMenuItem`.
 */
export declare class SliderItem extends PopupMenu.PopupBaseMenuItem {
    _slider: Slider;
    _sliderChangedId: number;

    /**
     * Constructs a SliderItem.
     */
    constructor();

    /**
     * Gets the value of the slider.
     */
    get value(): number;

    /**
     * Sets the value of the slider.
     */
    set value(value: number);
}

/**
 * Class for a discrete item with levels for brightness adjustment.
 * This class extends `St.BoxLayout`.
 */
export declare class DiscreteItem extends St.BoxLayout {
    _levelButtons: Map<string, St.BoxLayout>;

    /**
     * Constructs a DiscreteItem.
     */
    constructor();

    /**
     * Converts value to corresponding level.
     */
    _valueToLevel(value: number): string;

    /**
     * Converts level to corresponding value.
     */
    _levelToValue(level: string): number;

    /**
     * Adds a level button to the item.
     */
    _addLevelButton(key: string, label: string, iconName: string): void;

    /**
     * Synchronizes available levels based on `nLevels`.
     */
    _syncLevels(): void;

    /**
     * Synchronizes the checked state based on value.
     */
    _syncChecked(): void;
}

/**
 * Toggle class for keyboard brightness settings.
 * This class extends `QuickMenuToggle`.
 */
export declare class KeyboardBrightnessToggle extends QuickMenuToggle {
    _proxy: typeof BrightnessProxy;
    _sliderItem: SliderItem;
    _discreteItem: DiscreteItem;

    /**
     * Initializes a new instance of `KeyboardBrightnessToggle`.
     */
    _init(): void;

    /**
     * Synchronizes the toggle state with the brightness settings.
     */
    _sync(): void;
}

/**
 * System indicator for keyboard brightness settings.
 * This class extends `SystemIndicator`.
 */
export declare class Indicator extends SystemIndicator {
    /**
     * Initializes a new instance of `Indicator`.
     */
    _init(): void;
}
