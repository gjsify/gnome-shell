import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';

import type { LayoutManager } from './layout.js';

export enum PopupAnimation {
    NONE = 0,
    SLIDE = 1 << 0,
    FADE = 1 << 1,
    FULL = ~0,
}

/**
 * An actor which displays a triangle "arrow" pointing to a given
 * side.  The .bin property is a container in which content can be
 * placed.  The arrow position may be controlled via
 * setArrowOrigin(). The arrow side might be temporarily flipped
 * depending on the box size and source position to keep the box
 * totally inside the monitor workarea if possible.
 *
 */
export class BoxPointer extends St.Widget {
    _arrowSide: St.Side;
    _userArrowSide: St.Side;
    _arrowOrigin: number;
    _arrowActor: St.Widget | null;
    _border: St.DrawingArea;
    _arrowAlignment: number;
    _sourceAlignment: number;
    _muteKeys: boolean;
    _muteInput: boolean;
    _sourceActor: Clutter.Actor | null;
    _sourceExtents: ReturnType<typeof Clutter.Actor.prototype.get_transformed_extents>;
    _workArea: ReturnType<typeof LayoutManager.prototype.getWorkAreaForMonitor>;

    bin: St.Bin;
    readonly arrowSide: St.Side;

    /**
     * @param arrowSide side to draw the arrow on
     * @param binProperties Properties to set on contained bin
     */
    constructor(arrowSide: St.Side, binProperties?: Partial<St.Bin.ConstructorProps>);

    /** @hidden */
    _init(params?: Partial<St.Widget.ConstructorProps>): void;

    /**
     * @param arrowSide side to draw the arrow on
     * @param binProperties Properties to set on contained bin
     */
    _init(arrowSide: St.Side, binProperties?: Partial<St.Bin.ConstructorProps>): void;

    vfunc_captured_event(event: Clutter.Event): boolean;

    vfunc_get_preferred_width(forHeight: number): [number, number];

    vfunc_get_preferred_height(forWidth: number): [number, number];

    vfunc_allocate(box: Clutter.ActorBox): void;

    open(animate: PopupAnimation, onComplete: () => void): void;

    close(animate: PopupAnimation, onComplete: () => void): void;

    setPosition(sourceActor: Clutter.Actor, arrowAlignment: number): void;

    setSourceAlignment(sourceAlignment: number): void;

    /**
     * @param origin Coordinate specifying middle of the arrow, along
     * the Y axis for St.Side.LEFT, St.Side.RIGHT from the top and X axis from
     * the left for St.Side.TOP and St.Side.BOTTOM.
     */
    setArrowOrigin(origin: number): void;

    /**
     * @param actor an actor relative to which the arrow is positioned.
     * Differently from setPosition, this will not move the boxpointer itself,
     * on the arrow
     */
    setArrowActor(actor: St.Widget): void;

    updateArrowSide(side: St.Side): void;

    getPadding(side: St.Side): number;

    getArrowHeight(): number;

    _adjustAllocationForArrow(isWidth: boolean, minSize: number, naturalSize: number): void;
    _drawBorder(area: St.DrawingArea): void;
    _reposition(allocationBox: Clutter.ActorBox): void;
    _calculateArrowSide(arrowSide: St.Side): St.Side;
    _updateFlip(allocationBox: Clutter.ActorBox): void;
}
