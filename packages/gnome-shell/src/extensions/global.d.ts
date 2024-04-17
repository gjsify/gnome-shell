import type Shell from '@girs/shell-14';
import type ClutterExtern from '@girs/clutter-14';
declare global {
    /**
     * Global shell object created by GNOME Shell on startup.
     *
     * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/8a8539ee6766058b39d0a5c0961a08f76799f4da/js/ui/environment.js#L253
     * @version 46
     */
    const global: Shell.Global;

    // Gnome shell monkey-patches format into `String` which is the recommended way to use formatting for translatable strings.
    // See https://gjs.guide/extensions/development/translations.html#marking-strings-for-translation
    interface String {
        /**
         * Format this string with the given `args`.
         *
         * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/8a8539ee6766058b39d0a5c0961a08f76799f4da/js/ui/environment.js#L355
         * @param args
         */
        format(...args: any[]): string;
    }

    interface Math {
        /**
         * Returns {@link x} clamped to the inclusive range of {@link min} and {@link max}.
         *
         * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/8a8539ee6766058b39d0a5c0961a08f76799f4da/js/ui/environment.js#L357
         * @param x The value to be clamped.
         * @param min The lower bound of the result.
         * @param max The upper bound of the result.
         */
        clamp(x: number, min: number, max: number): number;
    }

    interface EasingParams {
        // milliseconds
        duration?: number;
        // milliseconds
        delay?: number;
        mode?: ClutterExtern.AnimationMode;
        repeatCount?: number;
        autoReverse?: boolean;
        onComplete?: () => void;
        onStopped?: (isFinished: boolean) => void;
    }

    /**  Any number of extra fields for the properties to be animated (e.g. "opacity: 0").
     *
     * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L133
     *
     * Note: this list is non exhaustive, since its never typed anywhere else, each parameter is just string in e.g remove_transition, where this is used, so these here are verified manually, but there might be more
     */
    type AnimatableActorFields =
        | 'fixed_x'
        | 'fixed_y'
        | 'height'
        | 'margin_bottom'
        | 'margin_left'
        | 'margin_right'
        | 'margin_top'
        | 'min_height'
        | 'min_width'
        | 'natural_height'
        | 'natural_width'
        | 'opacity'
        | 'pivot_point_z'
        | 'rotation_angle_x'
        | 'rotation_angle_y'
        | 'rotation_angle_z'
        | 'scale_x'
        | 'scale_y'
        | 'scale_z'
        | 'translation_x'
        | 'translation_y'
        | 'translation_z'
        | 'width'
        | 'x'
        | 'y'
        | 'z_position';

    interface EasingParamsWithProperties extends EasingParams, Partial<Pick<ClutterExtern.Actor, AnimatableActorFields>> {}

    module St {
        interface Adjustment {
            /**
             * A convenience wrapper for adjustments
             *
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L292
             */
            ease<T = unknown>(target: T, params: EasingParamsWithProperties): void;
        }
    }

    module Clutter {
        interface Actor {
            /**
             * A convenience wrapper for actors
             *
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L286
             */
            ease(props: EasingParamsWithProperties): void;
        }
    }
}
