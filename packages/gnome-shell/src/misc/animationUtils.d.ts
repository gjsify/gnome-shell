// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/animationUtils.js

import type St from '@girs/st-15';
import type Clutter from '@girs/clutter-15';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/animationUtils.js#L23
 * @version 47
 */
export interface AdjustAnimationTimeParams {
    /** whether to ignore the enable-animations setting */
    animationRequired: boolean;
}

/**
 * adjustAnimationTime:
 *
 * @param msecs - time in milliseconds
 * @param params - optional parameters
 *
 * Adjust `msecs` to account for St's enable-animations
 * and slow-down-factor settings
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/animationUtils.js#L22
 * @version 47
 */

export function adjustAnimationTime(msecs: number, params?: AdjustAnimationTimeParams): number;

/**
 * Animate scrolling a scrollview until an actor is visible.
 *
 * @param scrollView - the scroll view the actor is in
 * @param actor - the actor
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/animationUtils.js#L40
 * @version 47
 */

export function ensureActorVisibleInScrollView(scrollView: St.ScrollView, actor: Clutter.Actor): void;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/animationUtils.js#L90
 * @version 47
 */
export interface WiggleParams {
    /** The offset to move the actor by per-wiggle */
    offset: number;
    /** The amount of time to move the actor per-wiggle */
    duration: number;
    /** The number of times to wiggle the actor */
    wiggleCount: number;
}

/**
 * "Wiggles" a clutter actor. A "wiggle" is an animation the moves an actor
 * back and forth on the X axis a specified amount of times.
 *
 * @param actor an actor to animate
 * @param params options for the animation
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/animationUtils.js#L86
 * @version 47
 */

export function wiggle(actor: Clutter.Actor, params: WiggleParams): void;
