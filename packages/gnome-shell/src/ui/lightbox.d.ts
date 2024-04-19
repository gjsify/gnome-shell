// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js

import type Clutter from '@girs/clutter-14';
import type St from '@girs/st-14';
import type Shell from '@girs/shell-14';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js#L10
 * @version 46
 */
export const DEFAULT_FADE_FACTOR = 0.4;
export const VIGNETTE_BRIGHTNESS = 0.5;
export const VIGNETTE_SHARPNESS = 0.7;

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js#L31
 * @version 46
 */
export namespace RadialShaderEffect {
    export interface ConstructorProps extends Shell.GLSLEffect.ConstructorProps {
        brightness: number;
        sharpness: number;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js#L42
 * @version 46
 */
export class RadialShaderEffect extends Shell.GLSLEffect {
    protected _brightness: number;
    protected _sharpness: number;

    public brightness: number;
    public sharpness: number;

    constructor(props: Partial<RadialShaderEffect.ConstructorProps>);
    public _init(props: Partial<RadialShaderEffect.ConstructorProps>): void;

    vfunc_build_pipeline(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js#L121
 * @version 46
 */
export interface LightboxAdditionalParameters {
    inhibitEvents?: boolean;
    fadeFactor?: number;
    radialEffect?: boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js#L91
 * @version 46
 */
export namespace Lightbox {
    export interface ConstructorProps extends St.Bin.ConstructorProps, LightboxAdditionalParameters {
        brightness: number;
        sharpness: number;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js#L96
 * @version 46
 */
export class Lightbox extends St.Bin {
    protected _active: boolean;

    public readonly active: boolean;

    /**
     * Lightbox creates a dark translucent "shade" actor to hide the
     * contents of `container`, and allows you to specify particular actors
     * in `container` to highlight by bringing them above the shade. It
     * tracks added and removed actors in `container` while the lightboxing
     * is active, and ensures that all actors are returned to their
     * original stacking order when the lightboxing is removed. (However,
     * if actors are restacked by outside code while the lightboxing is
     * active, the lightbox may later revert them back to their original
     * order.)
     *
     * By default, the shade window will have the height and width of
     * `container` and will track any changes in its size. You can override
     * this by passing an explicit width and height in `params`.
     *
     * @param {Clutter.Container} container parent Clutter.Container
     * @param {object} [params] additional parameters:
     * @param {boolean=} params.inhibitEvents: whether to inhibit events for `container`
     * @param {number=} params.width: shade actor width
     * @param {number=} params.height: shade actor height
     * @param {number=} params.fadeFactor: fading opacity factor
     * @param {boolean=} params.radialEffect: whether to enable the GLSL radial effect
     */
    constructor(container: Clutter.Actor, params?: Partial<Lightbox.ConstructorProps>);
    public _init(container: Clutter.Actor, params?: Partial<Lightbox.ConstructorProps>): void;

    lightOn(fadeInTime?: number): void;
    lightOff(fadeOutTime?: number): void;

    highlight(window: Clutter.Actor): void;

    protected _childAdded(container: Clutter.Actor, newChild: Clutter.Actor): void;
    protected _childRemoved(container: Clutter.Actor, child: Clutter.Actor): void;
    protected _onDestroy(): void;
}
