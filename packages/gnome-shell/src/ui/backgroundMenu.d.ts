// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/backgroundMenu.js

import type Clutter from '@girs/clutter-14';

import type { PopupMenu } from './popupMenu.js';
import type { LayoutManager } from './layout.js';

declare class BackgroundMenu extends PopupMenu {
    constructor(layoutManager: LayoutManager);
}

export function addBackgroundMenu(actor: Clutter.Actor, layoutManager: LayoutManager): BackgroundMenu;
