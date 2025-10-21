import type Gio from '@girs/gio-2.0';
import type Clutter from '@girs/clutter-17';

/**  Contract interface between GNOME Shell and Shell extensions that implement
 * a search provider.
 * 
 * This interface defines the required methods and properties that must be 
 * implemented by any Shell extension to provide custom search functionality
 * integrated with GNOME Shell's search system.
 *  */
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
 *  */
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
