// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/lightbox.js

import type Clutter from "@girs/clutter-14"
import type St from "@girs/st-14"
import type Shell from "@girs/shell-14"

export const DEFAULT_FADE_FACTOR = 0.4
export const VIGNETTE_BRIGHTNESS = 0.5
export const VIGNETTE_SHARPNESS = 0.7

export interface RadialShaderEffectProps
    extends Shell.GLSLEffect.ConstructorProperties {
    brightness?: number
    sharpness?: number
}

export class RadialShaderEffect extends Shell.GLSLEffect {
    protected _brightness: number
    protected _sharpness: number

    public brightness: number
    public sharpness: number

    constructor(props: RadialShaderEffectProps)
    public _init(props: RadialShaderEffectProps): void

    vfunc_build_pipeline(): void
}

export interface LightboxAdditionalParameters {
    inhibitEvents?: boolean
    width?: number
    height?: number
    fadeFactor?: number
    radialEffect?: boolean
}

export interface LightboxProps
    extends St.Bin.ConstructorProperties,
        LightboxAdditionalParameters {
    brightness?: number
    sharpness?: number
}

export class Lightbox extends St.Bin {
    protected _active: boolean

    public readonly active: boolean

    constructor(container: Clutter.Actor, params?: LightboxProps)
    public _init(container: Clutter.Actor, params?: LightboxProps): void

    lightOn(fadeInTime?: number): void

    lightOff(fadeOutTime?: number): void

    highlight(window: Clutter.Actor): void
}
