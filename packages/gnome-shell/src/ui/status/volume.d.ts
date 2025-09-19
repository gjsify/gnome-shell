// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js

import Clutter from '@girs/clutter-17';
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
    _control: Gvc.MixerControl;
    _inDrag: boolean;
    _notifyVolumeChangeId: number;
    _soundSettings: Gio.Settings;
    _sliderChangedId: number;
    _stream: Gvc.MixerStream;
    _volumeCancellable: Gio.Cancellable;
    _icons: string[];
    _deviceItems: Map<number, PopupMenu.PopupImageMenuItem>;
    _deviceSection: PopupMenu.PopupMenuSection;

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

    getIcon(): string | null;

    /**
     * Connects the stream for updates.
     * @param stream The Gvc.MixerStream object.
     */
    _connectStream(stream: Gvc.MixerStream): void;

    /**
     * Adds a device to the slider.
     * @param id The device ID.
     */
    _addDevice(id: number): void;

    /**
     * Removes a device from the slider.
     * @param id The device ID.
     */
    _removeDevice(id: number): void;

    /**
     * Sets the active device.
     * @param activeId The active device ID.
     */
    _setActiveDevice(activeId: number): void;

    /**
     * Updates the volume level.
     */
    _updateVolume(): void;

    _shouldBeVisible(): boolean;

    _sync(): void;

    // Additional methods and properties
}

/**
 * OutputStreamSlider class for controlling output audio stream.
 */
export declare class OutputStreamSlider extends StreamSlider {
    _findHeadphones(sink: Gvc.MixerStream): boolean;
}

/**
 * InputStreamSlider class for controlling input audio stream.
 */
export declare class InputStreamSlider extends StreamSlider {
    _maybeShowInput(): void;
    override _shouldBeVisible(): boolean;
}

/**
 * VolumeIndicator for system audio control.
 */
export declare class VolumeIndicator extends SystemIndicator {
    _indicator: Clutter.Actor;
    _control: Gvc.MixerControl;
    _output: OutputStreamSlider;
    _input: InputStreamSlider;

    /**
     * Handle scroll events for volume adjustment.
     * @param item The StreamSlider item.
     * @param event The Clutter scroll event.
     * @returns Clutter.EVENT_STOP or Clutter.EVENT_PROPAGATE
     */
    _handleScrollEvent(item: StreamSlider, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE | typeof Clutter.EVENT_STOP;
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
