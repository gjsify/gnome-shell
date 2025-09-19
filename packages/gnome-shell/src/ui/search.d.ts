// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/search.js

import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';

import { AppSearchProvider } from './appDisplay.js';

export class MaxWidthBox extends St.BoxLayout {}

export class SearchResult extends St.Button {
    /** @hidden */
    _init(config?: Partial<St.Button.ConstructorProps>): void;
    _init(provider: AppSearchProvider, metaInfo: any, resultsView: SearchResultsView): void;

    activate(): void;
}

export class ListSearchResult extends SearchResult {
    /** @hidden */
    _init(config?: Partial<St.Button.ConstructorProps>): void;
    _init(provider: AppSearchProvider, metaInfo: any, resultsView: SearchResultsView): void;
}

export class GridSearchResult extends SearchResult {
    readonly focusChild: St.Widget;

    /** @hidden */
    _init(config?: Partial<St.Button.ConstructorProps>): void;
    _init(provider: AppSearchProvider, metaInfo: any, resultsView: SearchResultsView): void;

    _onDestroy(): void;
    _createResultDisplay(meta: any): void;
    _keyFocusIn(actor: St.Widget): void;
    _ensureResultActors(results: any[]): Promise<void>;

    clear(): void;
    updateSearch(providerResults: any[], terms: string[], callback: () => void): Promise<void>;
}

export abstract class SearchResultsBase extends St.BoxLayout {
    /** @hidden */
    _init(config?: Partial<St.BoxLayout.ConstructorProps>): void;
    /** @hidden */
    _init(provider: AppSearchProvider, resultsView: SearchResultsView): void;
    _init(props?: { style_class?: string; vertical?: boolean }): void;

    activateDefault(): void;
    highlightDefault(highlight: boolean): void;
    popupMenuDefault(): void;
    navigateFocus(direction: St.DirectionType): boolean;
    highlightTerms(description: string): string;
}

export class ListSearchResults extends SearchResultsBase {
    /** @hidden */
    _init(config?: Partial<St.BoxLayout.ConstructorProps>): void;
    /** @hidden */
    _init(provider: AppSearchProvider, resultsView: SearchResultsView): void;
    /** @hidden */
    _init(props?: { style_class?: string; vertical?: boolean }): void;

    _init(provider: AppSearchProvider, resultsView: SearchResultsView): void;

    _setMoreCount(count: number): void;
    _getMaxDisplayedResults(): number;
    _clearResultDisplay(): void;
    _createResultDisplay(meta: any): void;
    _addItem(display: any): void;

    getFirstResult(): any | null;
}

export class GridSearchResultsLayout extends Clutter.LayoutManager {
    spacing: number;

    /** @hidden */
    _init(config?: Partial<Clutter.LayoutManager.ConstructorProps>): void;
    _init(): void;

    columnsForWidth(width: number): number;
}

export class GridSearchResults extends SearchResultsBase {
    /** @hidden */
    _init(config?: Partial<St.BoxLayout.ConstructorProps>): void;
    /** @hidden */
    _init(props?: { style_class?: string; vertical?: boolean }): void;

    _init(provider: AppSearchProvider, resultsView: SearchResultsView): void;

    _onDestroy(): void;
    _getMaxDisplayedResults(): number;
    _clearResultDisplay(): void;
    _createResultDisplay(meta: any): void;
    _addItem(display: any): void;

    updateSearch(...args: any[]): void;
    getFirstResult(): any | null;
}

export class SearchResultsView extends St.BoxLayout {
    readonly terms: string[];
    readonly searchInProgress: boolean;

    /** @hidden */
    _init(config?: Partial<St.BoxLayout.ConstructorProps>): void;
    _init(): void;

    _reloadRemoteProviders(): void;
    _registerProvider(provider: AppSearchProvider): void;
    _unregisterProvider(provider: AppSearchProvider): void;
    _clearSearchTimeout(): void;
    _reset(): void;
    _doProviderSearch(provider: AppSearchProvider, previousResults: any[]): Promise<any[]>;
    _doSearch(): void;
    _onSearchTimeout(): void;
    _onPan(action: any): void;
    _focusChildChanged(provider: AppSearchProvider): void;
    _ensureProviderDisplay(provider: AppSearchProvider): void;
    _clearDisplay(): void;
    _maybeSetInitialSelection(): void;
    _updateSearchProgress(): void;
    _updateResults(provider: AppSearchProvider, results: any[]): void;
    _setSelected(result: any, selected: boolean): void;

    setTerms(terms: string[]): void;
    activateDefault(): void;
    highlightDefault(highlight: boolean): void;
    popupMenuDefault(): void;
    navigateFocus(direction: St.DirectionType): boolean;
    highlightTerms(description: string): string;
}

export class ProviderInfo extends St.Button {
    readonly PROVIDER_ICON_SIZE: number;

    /** @hidden */
    _init(config?: Partial<St.Button.ConstructorProps>): void;

    _init(provider: AppSearchProvider): void;

    animateLaunch(): void;
    setMoreCount(count: number): void;
}
