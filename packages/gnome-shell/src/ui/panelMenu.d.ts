// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js

import type St from '@girs/st-14';

import type { PopupMenu, PopupDummyMenu } from './popupMenu.js';

declare namespace ButtonBox {
    interface ConstructorProperties extends St.Widget.ConstructorProperties { }
}

/**
 * @version 46
 */
declare class ButtonBox extends St.Widget {
    constructor(params?: ButtonBox.ConstructorProperties);
    /** @hidden Defined to resolve version conflicts */
    _init(params: ButtonBox.ConstructorProperties): void;
    container: St.Bin;
}


/**
 * @version 46
 */
export class Button extends ButtonBox {
    menu: PopupMenu | PopupDummyMenu;

    constructor(menuAlignment: number, nameText: string, dontCreateMenu?: boolean);

    /** @hidden Defined to resolve version conflicts */
    _init(params?: ButtonBox.ConstructorProperties): void;
    _init(menuAlignment: number, nameText: string, dontCreateMenu?: boolean): void;
    setSensitive(sensitive: boolean): void;
    setMenu(menu: PopupMenu | PopupDummyMenu): void;
}

/**
 * SystemIndicator:
 * This class manages one system indicator, which are the icons
 * that you see at the top right. A system indicator is composed
 * of an icon and a menu section, which will be composed into the
 * aggregate menu.
 */
export class SystemIndicator extends St.BoxLayout {
    constructor();
    _init(): void;
}
