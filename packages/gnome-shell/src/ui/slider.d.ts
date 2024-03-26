// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/slider.js

import Clutter from '@girs/clutter-14';
import * as BarLevel from './barLevel.js';

/**
 * Represents a slider UI component extending the BarLevel.
 * It provides a draggable slider interface for adjusting values within a range.
 */
export class Slider extends BarLevel.BarLevel {
    /**
     * Creates a new Slider instance.
     * @param value The initial value of the slider.
     */
    constructor(value: number);

    /**
     * Repaints the slider, including its handle.
     */
    vfunc_repaint(): void;

    /**
     * Handles button press events, initiating dragging.
     * @param event The Clutter button press event.
     * @returns The event propagation status.
     */
    vfunc_button_press_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Starts dragging the slider.
     * @param event The Clutter event initiating the drag.
     * @returns The event propagation status.
     */
    startDragging(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Ends dragging the slider.
     * @returns The event propagation status.
     */
    protected _endDragging(): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Handles button release events.
     * @returns The event propagation status.
     */
    vfunc_button_release_event(): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Handles touch events for the slider.
     * @param event The Clutter touch event.
     * @returns The event propagation status.
     */
    vfunc_touch_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Scrolls the slider.
     * @param event The Clutter scroll event.
     * @returns The event propagation status.
     */
    scroll(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Handles scroll events for the slider.
     * @param event The Clutter scroll event.
     * @returns The event propagation status.
     */
    vfunc_scroll_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Handles motion events during dragging.
     * @param actor The actor receiving the motion event.
     * @param event The Clutter motion event.
     * @returns The event propagation status.
     */
    protected _motionEvent(actor: Clutter.Actor, event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Handles key press events for the slider.
     * @param event The Clutter key press event.
     * @returns The event propagation status.
     */
    vfunc_key_press_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;

    /**
     * Moves the handle of the slider to a new position based on the given coordinates.
     * @param absX The absolute X coordinate.
     * @param _absY The absolute Y coordinate.
     */
    protected _moveHandle(absX: number, _absY: number): void;

    /**
     * Retrieves the minimum increment value for accessibility adjustments.
     * @returns The minimum increment value.
     */
    protected _getMinimumIncrement(): number;
}
