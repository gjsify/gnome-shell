// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/keyboard.js

import Clutter from '@girs/clutter-14';
import St from '@girs/st-14';

import * as PanelMenu from '../panelMenu.js';
import * as PopupMenu from '../popupMenu.js';
import * as SwitcherPopup from '../switcherPopup.js';
import * as Signals from '../../misc/signals.js';

// Constants for input source types
export const INPUT_SOURCE_TYPE_XKB = 'xkb';
export const INPUT_SOURCE_TYPE_IBUS = 'ibus';

/**
 * Class representing a layout menu item.
 */
export declare class LayoutMenuItem extends PopupMenu.PopupBaseMenuItem {
    label: St.Label;
    indicator: St.Label;

    /**
     * Initializes a new instance of `LayoutMenuItem`.
     */
    override _init(displayName: string, shortName: string): void;
}

/**
 * Class representing an input source.
 */
export declare class InputSource extends Signals.EventEmitter {
    type: string;
    id: string;
    displayName: string;
    private _shortName: string;
    index: number;
    properties: any; // Replace with appropriate type
    xkbId: string;

    /**
     * Initializes a new instance of `InputSource`.
     */
    constructor(type: string, id: string, displayName: string, shortName: string, index: number);

    /**
     * Gets the short name of the input source.
     */
    get shortName(): string;

    /**
     * Sets the short name of the input source.
     */
    set shortName(v: string);

    /**
     * Activates the input source.
     */
    activate(interactive: boolean): void;

    /**
     * Generates the XKB ID.
     */
    private _getXkbId(): string;
}

/**
 * Class representing a popup for input sources.
 */
export declare class InputSourcePopup extends SwitcherPopup.SwitcherPopup {
    private _action: any; // Replace with appropriate type
    private _actionBackward: any; // Replace with appropriate type
    private _switcherList: InputSourceSwitcher;

    /** @hidden Only defined to resolve type conflict */
    _init(props: St.Widget.ConstructorProps): void;
    _init(items: any[]): void;

    /**
     * Initializes a new instance of `InputSourcePopup`.
     */
    _init(items: any[], action: any, actionBackward: any): void; // Replace 'any' with proper types

    /**
     * Handles key press events.
     */
    _keyPressHandler(keysym: Clutter.KeyEvent, action: any): typeof Clutter.EVENT_PROPAGATE; // Replace 'any' with proper types

    /**
     * Finishes the input source selection.
     */
    _finish(): void;
}

/**
 * Class representing a switcher for input sources.
 */
export declare class InputSourceSwitcher extends SwitcherPopup.SwitcherList {
    _init(config?: St.Widget.ConstructorProps): void;
    _init(squareItems: any[]): void;

    /**
     * Initializes a new instance of `InputSourceSwitcher`.
     */
    _init(items: any[]): void; // Replace 'any' with proper types

    /**
     * Adds an icon to the switcher.
     */
    _addIcon(item: any): void; // Replace 'any' with proper types
}

// Other classes (InputSourceSettings, InputSourceSystemSettings, InputSourceSessionSettings, InputSourceManager)
// and the `getInputSourceManager` function should be declared similarly.

/**
 * Class representing a container for input source indicators.
 */
export declare class InputSourceIndicatorContainer extends St.Widget {
    /**
     * Overridden method to get preferred width.
     */
    vfunc_get_preferred_width(forHeight: number): [number, number];

    /**
     * Overridden method to get preferred height.
     */
    vfunc_get_preferred_height(forWidth: number): [number, number];

    /**
     * Overridden method to allocate space.
     */
    vfunc_allocate(box: Clutter.ActorBox): void;
}

/**
 * Class representing an input source indicator.
 */
export declare class InputSourceIndicator extends PanelMenu.Button {
    private _menuItems: { [key: string]: LayoutMenuItem };
    private _indicatorLabels: { [key: string]: St.Label };
    private _container: InputSourceIndicatorContainer;
    private _propSeparator: PopupMenu.PopupSeparatorMenuItem;
    private _propSection: PopupMenu.PopupMenuSection;
    private _showLayoutItem: any; // Replace with appropriate type
    private _inputSourceManager: any; // Replace with appropriate type

    /**
     * Initializes a new instance of `InputSourceIndicator`.
     */
    _init(): void;

    /**
     * Handles the destruction of the indicator.
     */
    _onDestroy(): void;

    /**
     * Updates the session state.
     */
    _sessionUpdated(): void;

    /**
     * Handles changes in input sources.
     */
    _sourcesChanged(): void;

    /**
     * Handles changes in the current input source.
     */
    _currentSourceChanged(manager: any, oldSource: any): void; // Replace 'any' with proper types

    /**
     * Builds the property section.
     */
    _buildPropSection(properties: any): void; // Replace 'any' with proper types

    /**
     * Builds a submenu for properties.
     */
    _buildPropSubMenu(menu: PopupMenu.PopupMenuSection, props: any): void; // Replace 'any' with proper types

    /**
     * Shows the keyboard layout.
     */
    _showLayout(): void;
}
