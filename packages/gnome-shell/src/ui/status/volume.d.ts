// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js

import Clutter from '@girs/clutter-14';
import Gio from '@girs/gio-2.0';
import Gvc from '@girs/gvc-1.0';
import * as PopupMenu from '../popupMenu.js';
import { QuickSlider, SystemIndicator } from '../quickSettings.js';

declare const ALLOW_AMPLIFIED_VOLUME_KEY = 'allow-volume-above-100-percent';
declare const UNMUTE_DEFAULT_VOLUME = 0.25;

/**
 * Get the mixer control singleton.
 * @returns {Gvc.MixerControl} The mixer control singleton.
 */
export declare function getMixerControl(): Gvc.MixerControl;

/**
 * StreamSlider class for controlling audio stream.
 */
export declare class StreamSlider extends QuickSlider {
    protected _control: Gvc.MixerControl;
    protected _inDrag: boolean;
    protected _notifyVolumeChangeId: number;
    protected _soundSettings: Gio.Settings;
    protected _sliderChangedId: number;
    protected _stream: Gvc.MixerStream;
    protected _volumeCancellable: Gio.Cancellable;
    protected _icons: string[];
    protected _deviceItems: Map<number, PopupMenu.PopupImageMenuItem>;
    protected _deviceSection: PopupMenu.PopupMenuSection;

    /**
     * Initialize the StreamSlider.
     * @param control The Gvc.MixerControl object.
     */
    constructor(control: Gvc.MixerControl);

    /**
     * Sets the stream for the slider.
     * @param stream The Gvc.MixerStream object.
     */
    set stream(stream: Gvc.MixerStream);

    /**
     * Connects the stream for updates.
     * @param stream The Gvc.MixerStream object.
     */
    protected _connectStream(stream: Gvc.MixerStream): void;

    /**
     * Adds a device to the slider.
     * @param id The device ID.
     */
    protected _addDevice(id: number): void;

    /**
     * Removes a device from the slider.
     * @param id The device ID.
     */
    protected _removeDevice(id: number): void;

    /**
     * Sets the active device.
     * @param activeId The active device ID.
     */
    protected _setActiveDevice(activeId: number): void;

    /**
     * Updates the volume level.
     */
    protected _updateVolume(): void;

    // Additional methods and properties
}

/**
 * OutputStreamSlider class for controlling output audio stream.
 */
export declare class OutputStreamSlider extends StreamSlider {
    // Implementation-specific methods and properties
}

/**
 * InputStreamSlider class for controlling input audio stream.
 */
export declare class InputStreamSlider extends StreamSlider {
    // Implementation-specific methods and properties
}

/**
 * VolumeIndicator for system audio control.
 */
export declare class VolumeIndicator extends SystemIndicator {
    protected _indicator: Clutter.Actor;
    protected _control: Gvc.MixerControl;
    protected _output: OutputStreamSlider;
    protected _input: InputStreamSlider;

    /**
     * Handle scroll events for volume adjustment.
     * @param item The StreamSlider item.
     * @param event The Clutter scroll event.
     * @returns Clutter.EVENT_STOP or Clutter.EVENT_PROPAGATE
     */
    protected _handleScrollEvent(item: StreamSlider, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE | typeof Clutter.EVENT_STOP;
}

/**
 * OutputIndicator for system output volume control.
 */
export declare class OutputIndicator extends VolumeIndicator {
    // Implementation-specific methods and properties
}

/**
 * InputIndicator for system input volume control.
 */
export declare class InputIndicator extends VolumeIndicator {
    // Implementation-specific methods and properties
}
