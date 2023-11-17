/**
 * Network.js - Handles network related functionalities in GNOME Shell
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/network.js
 */

import * as PopupMenu from '../popupMenu.js';
import { SystemIndicator } from '../quickSettings.js';

// Constants
declare const WIFI_SCAN_FREQUENCY: number;
declare const MAX_VISIBLE_NETWORKS: number;

// Types
type PortalHelperResult = 'CANCELLED' | 'COMPLETED' | 'RECHECK';

// Function declarations
declare function signalToIcon(value: number): string;
declare function ssidToLabel(ssid: any): string; // Replace 'any' with the correct type
declare function launchSettingsPanel(panel: string, ...args: string[]): void;

// Class declarations

/**
 * ItemSorter class definition
 */
declare class ItemSorter {
    // Constructor
    constructor(options?: {
        sortFunc?: (a: any, b: any) => number; // Replace 'any' with the correct type
        trackMru?: boolean;
    });

    // Methods
    items(): IterableIterator<any>; // Replace 'any' with the correct type
    itemsByMru(): IterableIterator<any>; // Replace 'any' with the correct type
    upsert(item: any): number; // Replace 'any' with the correct type
    delete(item: any): void; // Replace 'any' with the correct type
}

/**
 * NMMenuItem class definition
 */
declare class NMMenuItem extends PopupMenu.PopupBaseMenuItem {
    // Properties
    state: any; // Replace 'any' with the correct type
    is_active: boolean;
    timestamp: number;

    // Methods
    activate(): void;
    _activeConnectionStateChanged(): void;
    _setActiveConnection(activeConnection: any): void; // Replace 'any' with the correct type
    _sync(): void;
}

// ... Additional class and function definitions ...

/**
 * Indicator class definition
 */
export declare class Indicator extends SystemIndicator {
    // Constructor
    constructor();

    // Methods
    _getClient(): Promise<void>;
    _onActivationFailed(): void;
    _syncMainConnection(): void;
    _mainConnectionStateChanged(): void;
    _flushConnectivityQueue(): void;
    _closeConnectivityCheck(path: string): void;
    _portalHelperDone(parameters: any[]): Promise<void>; // Replace 'any' with the correct type
    _syncConnectivity(): Promise<void>;
    _updateIcon(): void;
}

// ... Additional types and definitions as required ...
