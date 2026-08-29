// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/slider.js

import Clutter from '@girs/clutter-51';
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
     * Moves the value by the given number of scroll steps.
     * @param nSteps The number of steps, negative to move towards the start.
     * @returns Whether the value changed.
     */
    step(nSteps: number): boolean;

    /**
     * Handles the `scroll` signal of the smooth, horizontal scroll controller.
     * The slider adds a second, discrete controller for the vertical axis, and
     * that one has its own inline handler, so only `dx` arrives here.
     *
     * @version 51
     */
    _onScroll(controller: Clutter.ScrollController, sprite: Clutter.Sprite, source: Clutter.ScrollSource, dx: number): void;

    /**
     * Moves the handle a tenth of the range towards the left edge. The Left key
     * binding calls it.
     *
     * @version 51
     */
    _moveLeft(): void;

    /**
     * Moves the handle a tenth of the range towards the right edge. The Right
     * key binding calls it.
     *
     * @version 51
     */
    _moveRight(): void;

    /**
     * Moves the handle of the slider to a new position based on the given coordinates.
     * @param absX The absolute X coordinate.
     * @param _absY The absolute Y coordinate.
     */
    _moveHandle(absX: number, _absY: number): void;

    /**
     * Retrieves the minimum increment value for accessibility adjustments.
     * @returns The minimum increment value.
     */
    _getMinimumIncrement(): number;
}
