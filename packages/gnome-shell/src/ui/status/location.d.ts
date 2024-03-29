// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/location.js

import GObject from '@girs/gobject-2.0';
import St from '@girs/st-14';

import * as ModalDialog from '../modalDialog.js';
import * as PermissionStore from '../../misc/permissionStore.js';
import { SystemIndicator } from '../quickSettings.js';

/**
 * Enum for representing accuracy levels of geolocation services.
 */
export enum GeoclueAccuracyLevel {
    NONE = 0,
    COUNTRY = 1,
    CITY = 4,
    NEIGHBORHOOD = 5,
    STREET = 6,
    EXACT = 8,
}

/**
 * Converts a GeoclueAccuracyLevel enum value to its string representation.
 * @param accuracyLevel - The accuracy level to convert.
 */
export declare function accuracyLevelToString(accuracyLevel: GeoclueAccuracyLevel): string;

/**
 * Class representing a Geoclue agent to interact with location services.
 */
export declare class GeoclueAgent extends GObject.Object {
    // Indicates whether location services are enabled.
    enabled: boolean;
    // Indicates whether location services are currently in use.
    readonly inUse: boolean;
    // The maximum accuracy level that can be requested.
    readonly maxAccuracyLevel: GeoclueAccuracyLevel;

    // Authorizes an app asynchronously to access location services.
    AuthorizeAppAsync(params: any, invocation: any): Promise<void>;
    // Gets the maximum accuracy level.
    get MaxAccuracyLevel(): GeoclueAccuracyLevel;
    // Methods for internal management of Geoclue connections and properties.
}

/**
 * Indicator for location services in the system status area.
 */
export declare class Indicator extends SystemIndicator {
    private _agent: GeoclueAgent;
    private _indicator: St.Icon;

    constructor();
}

/**
 * Manages authorization of apps requesting location access.
 */
export declare class AppAuthorizer {
    constructor(desktopId: string, reqAccuracyLevel: GeoclueAccuracyLevel, permStoreProxy: PermissionStore.PermissionStoreProxy, maxAccuracyLevel: GeoclueAccuracyLevel);

    // Authorizes the app for location access.
    authorize(): Promise<GeoclueAccuracyLevel>;
    // Prompts user for authorization.
    private _userAuthorizeApp(): Promise<void>;
    // Completes the authorization process.
    private _completeAuth(): GeoclueAccuracyLevel;
    // Saves the authorization decision to the permission store.
    private _saveToPermissionStore(): Promise<void>;
}

/**
 * Dialog for obtaining user consent for geolocation access.
 */
export declare class GeolocationDialog extends ModalDialog.ModalDialog {
    constructor(name: string, reason: string, reqAccuracyLevel: GeoclueAccuracyLevel);

    // Handles the 'Grant Access' action.
    private _onGrantClicked(): void;
    // Handles the 'Deny Access' action.
    private _onDenyClicked(): void;
}

/**
 * Retrieves the singleton instance of the Geoclue agent.
 */
export function getGeoclueAgent(): GeoclueAgent;
