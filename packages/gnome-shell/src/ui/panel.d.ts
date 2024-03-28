// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panel.js

import type St from '@girs/st-14';
import type Clutter from '@girs/clutter-14';
import type Meta from '@girs/meta-14';

import type { Button } from './panelMenu.js';
import type { DateMenuButton } from './dateMenu.js';

/**
 * @version 46
 */
export class Panel extends St.Widget {
    statusArea: {
        appMenu: any;
        dateMenu: DateMenuButton;
        quickSettings: any;
    };

    boxOpacity: number;

    constructor();
    _init(): void;

    _tryDragWindow(event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _onButtonPress(actor: St.Widget, event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _onTouchEvent(actor: St.Widget, event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _toggleMenu(indicator: Button): void;

    _closeMenu(indicator: Button): void;

    toggleAppMenu(): void;

    toggleCalendar(): void;

    closeCalendar(): void;

    closeQuickSettings(): void;

    _updatePanel(): void;

    _hideIndicators(): void;

    _ensureIndicator(role: string): any;

    updateBox(elements: any[], box: any): void;

    _addToPanelBox(role: string, indicator: Button, position: number, box: any): void;

    addToStatusArea(role: string, indicator: Button, position?: number, box?: any): any;

    _onMenuSet(indicator: Button): void;

    _getDraggableWindowForPosition(stageX: number): Meta.Window | null;
}
