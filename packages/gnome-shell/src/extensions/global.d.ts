import type Shell from '@girs/shell-17';
import type Clutter from '@girs/clutter-17';
import type Gio from '@girs/gio-2.0';
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
         *
         * @version 46
         */
        clamp(x: number, min: number, max: number): number;
    }
}

declare module '@girs/gobject-2.0/gobject-2.0' {
    export namespace GObject {
        interface Object {
            /**
             * Connect one or more signals, and associate the handlers
             * with a tracked object.
             *
             * All handlers for a particular object can be disconnected
             * by calling disconnectObject(). If object is a {Clutter.widget},
             * this is done automatically when the widget is destroyed.
             *
             * @param args - a sequence of signal-name/handler pairs
             * with an optional flags value, followed by an object to track
             *
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L245
             * @version 49
             */
            connectObject(...args: any[]): void;

            /**
             * Connect one or more signals, and associate the handlers
             * with a tracked object.
             *
             * All handlers for a particular object can be disconnected
             * by calling disconnectObject(). If object is a {Clutter.widget},
             * this is done automatically when the widget is destroyed.
             *
             * @param args - a sequence of signal-name/handler pairs
             * with an optional flags value, followed by an object to track
             *
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L248
             * @version 49
             */
            connect_object(...args: any[]): void;

            /**
             * Disconnect all signals that were connected for
             * the specified tracked object
             *
             * @param obj - the tracked object
             *
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L251
             * @version 49
             */
            disconnectObject(obj: object): void;

            /**
             * Disconnect all signals that were connected for
             * the specified tracked object
             *
             * @param obj - the tracked object
             *
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L254
             * @version 49
             */
            disconnect_object(obj: object): void;
        }
    }
}

/**
 * @version 46
 */
interface EasingParams {
    // milliseconds
    duration?: number;
    // milliseconds
    delay?: number;
    mode?: Clutter.AnimationMode;
    repeatCount?: number;
    autoReverse?: boolean;
    onComplete?: () => void;
    onStopped?: (isFinished: boolean) => void;
}

/**  Any number of extra fields for the properties to be animated (e.g. "opacity: 0").
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L133
 *
 * @version 46
 * Note: this list is non exhaustive, since its never typed anywhere else, each parameter is just string in e.g remove_transition, where this is used, so these here are verified manually, but there might be more
 */
type AnimatableActorFields =
    | 'fixedX'
    | 'fixedY'
    | 'height'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginTop'
    | 'minHeight'
    | 'minWidth'
    | 'naturalHeight'
    | 'naturalWidth'
    | 'opacity'
    | 'pivotPointZ'
    | 'rotationAngleX'
    | 'rotationAngleY'
    | 'rotationAngleZ'
    | 'scaleX'
    | 'scaleY'
    | 'scaleZ'
    | 'translationX'
    | 'translationY'
    | 'translationZ'
    | 'width'
    | 'x'
    | 'y'
    | 'zPosition';

interface EasingParamsWithProperties extends EasingParams, Partial<Pick<Clutter.Actor, AnimatableActorFields>> {}

declare module '@girs/st-17/st-17' {
    export namespace St {
        interface Adjustment {
            /**
             * A convenience wrapper for adjustments
             *
             * @version 46
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L292
             */
            ease<T = unknown>(target: T, params: EasingParamsWithProperties): void;
        }
    }
}

declare module '@girs/clutter-17/clutter-17' {
    export namespace Clutter {
        interface Actor {
            /**
             * A convenience wrapper for actors
             *
             * @version 46
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L286
             */
            ease(props: EasingParamsWithProperties): void;

            /**
             * A convenience wrapper for {@link Clutter.PropertyTransition}
             *
             * @param propName The name of the property or any of the following:
             * - @layout.property
             * - @actions.name.property
             * - @constraints.name.property
             * - @content.property
             * - @effects.name.property
             * @param target The target value
             * @param props Easing properties
             *
             * @version 49
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L289
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L71
             */
            ease_property<T = unknown>(propName: string, target: T, props: EasingParams): void;
        }
    }
}

// #region SearchProvider2-Interface

/**  Contract interface between GNOME Shell and Shell extensions that implement
 * a search provider.
 * 
 * This interface defines the required methods and properties that must be 
 * implemented by any Shell extension to provide custom search functionality
 * integrated with GNOME Shell's search system.
 * 
 * [See Search Provider Implementation Example for more information](https://github.com/LumenGNU/ManSearchProvider) */
export interface SearchProvider2 {

    /** Unique string identifier of the search provider in the system. */
    readonly id: string;

    /** The search provider's `GAppInfo`. */
    readonly appInfo: Gio.AppInfo | null;

    /** Controls the visibility of the "Show more results" action. */
    readonly canLaunchSearch: boolean;

    /** Handles Shell's request for an initial search and returns 
     * string identifiers of the found results.
     * 
     * **NOTE**: The implementation **must** abort the search upon signal from the 
     * `cancellable` object.
     * 
     * @param terms Array of search terms
     * @param cancellable Object for cancelling the operation
     * @returns Promise that resolves to an array of result identifiers */
    getInitialResultSet(terms: string[], cancellable: Gio.Cancellable): Promise<string[]>;

    /** Handles Shell's request to refine search results when new 
     * search terms are added.
     * 
     * Returns a subset of the original result set or the result of a new 
     * search.
     * 
     * **NOTE**: The implementation **must** abort the search upon signal from the 
     * `cancellable` object.
     * 
     * @param previousIdentifiers Result identifiers from the previous search
     * @param terms Array of new search terms
     * @param cancellable Object for cancelling the operation
     * @returns Promise that resolves to an array of result identifiers */
    getSubsearchResultSet(previousIdentifiers: string[], terms: string[], cancellable: Gio.Cancellable): Promise<string[]>;

    /** Handles Shell's request to reduce the number of displayed results
     * for the current search.
     * 
     * @param identifiers Complete list of current result identifiers
     * @param maxResults Desired maximum number of results to display
     * @returns Truncated array of result identifiers */
    filterResults(identifiers: string[], maxResults: number): string[];

    /** Handles Shell's request to retrieve result metadata for display 
     * in the UI.
     * 
     * **NOTE**: The implementation **must** abort processing upon signal from the 
     * `cancellable` object.
     * 
     * @param identifiers List of identifiers
     * @param cancellable Object for cancelling the operation
     * @returns Promise that resolves to an array of metadata for each 
     *   result from `identifiers` */
    getResultMetas(identifiers: string[], cancellable: Gio.Cancellable): Promise<ResultMeta[]>;

    /** Handles Shell's request to retrieve a custom widget for 
     * displaying the result.
     * 
     * @param meta Result metadata
     * @returns Custom widget or `null` for default rendering */
    createResultObject(meta: ResultMeta): Clutter.Actor | null;

    /** Handles Shell's request to activate a search result.
     *
     * @param identifier Identifier of the activated result
     * @param terms Search terms that led to this result */
    activateResult(identifier: string, terms: string[]): void;

    /** Handles Shell's request to activate the "Show more results" action for 
     * current search terms.
     * 
     * @param terms Current search terms */
    launchSearch(terms: string[]): void;
}


/** Search result metadata.
 * 
 * Used by Shell to display search results.
 * 
 * [See Search Provider Implementation Example for more information](https://github.com/LumenGNU/ManSearchProvider) */
export interface ResultMeta {

    /** Unique identifier of the result */
    id: string;

    /** Name for the result (title) */
    name: string;

    /** Description of the result (optional). */
    description?: string;

    /** Text to place in the clipboard when the result is activated (optional). */
    clipboardText?: string;

    /** Callback function that returns an icon for the result at the specified size. */
    createIcon: (size: number) => Clutter.Actor;

}

// #endregion
