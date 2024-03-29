import type St from '@girs/st-14';
import type Clutter from '@girs/clutter-14';

/**
 * adjustAnimationTime:
 *
 * @param msecs - time in milliseconds
 *
 * Adjust `msecs` to account for St's enable-animations
 * and slow-down-factor settings
 */
export function adjustAnimationTime(msecs: number): number;

/**
 * Animate scrolling a scrollview until an actor is visible.
 *
 * @param scrollView - the scroll view the actor is in
 * @param actor - the actor
 */

export function ensureActorVisibleInScrollView(scrollView: St.ScrollView, actor: Clutter.Actor): void;

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
 */

export function wiggle(actor: Clutter.Actor, params: WiggleParams): void;
