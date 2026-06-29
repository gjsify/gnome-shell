// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appDisplay.js

import type GObject from '@girs/gobject-2.0';
import type Gio from '@girs/gio-2.0';
import type Clutter from '@girs/clutter-18';
import type St from '@girs/st-18';
import type Shell from '@girs/shell-18';

import { GridSearchResult, MetaInfo } from './search.js';
import { IconGrid, BaseIcon } from './iconGrid.js';
import { _Draggable, DragEvent, DragMonitor, DragMotionResult, DropEvent } from './dnd.js';
import { ParentalControlsManager } from '../misc/parentalControlsManager.js';
import { AppFavorites } from './appFavorites.js';
import { SystemActions } from '../misc/systemActions.js';
import { PopupMenuManager } from './popupMenu.js';
import { AppMenu } from './appMenu.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L154
 * @version 50
 */
export class AppGrid extends IconGrid {
    indicatorsPadding: number;

    /** @hidden */
    _init(params?: Partial<St.Viewport.ConstructorProps>): void;
    _init(layoutParams?: Partial<IconGrid.ConstructorProps>): void;

    _updatePadding(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L191
 * @version 50
 */
export abstract class BaseAppViewGridLayout extends Clutter.BinLayout {
    _grid: AppGrid;
    _scrollView: St.ScrollView;
    _previousPageIndicator: St.Widget;
    _previousPageArrow: St.Button;
    _nextPageIndicator: St.Widget;
    _nextPageArrow: St.Button;
    _pageIndicatorsAdjustment: St.Adjustment;
    _showIndicators: boolean;
    _currentPage: number;
    _pageWidth: number;

    constructor(grid: AppGrid, scrollView: St.ScrollView, nextPageIndicator: St.Widget, nextPageArrow: St.Button, previousPageIndicator: St.Widget, previousPageArrow: St.Button);
    _init(grid: AppGrid, scrollView: St.ScrollView, nextPageIndicator: St.Widget, nextPageArrow: St.Button, previousPageIndicator: St.Widget, previousPageArrow: St.Button): void;

    _getIndicatorsWidth(box: Clutter.ActorBox): number;
    _syncPageIndicatorsVisibility(animate?: boolean): void;
    _getEndIcon(icons: Clutter.Actor[]): Clutter.Actor;
    _translatePreviousPageIcons(value: number, ltr: boolean): void;
    _translateNextPageIcons(value: number, ltr: boolean): void;
    _syncPageIndicators(): void;

    goToPage(page: number, animate?: boolean): void;
    showPageIndicators(): void;
    hidePageIndicators(): void;
}

/**
 * @version 50
 */
interface PageMoveData {
    page: number;
    position: number;
    source: any;
    destroyId: number;
    timeoutId: number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L471
 * @version 50
 */
export namespace BaseAppView {
    export interface SignalSignatures extends St.Widget.SignalSignatures {
        'view-loaded': () => void;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L476
 * @version 50
 */
export abstract class BaseAppView extends St.Widget {
    $signals: BaseAppView.SignalSignatures;

    _grid: AppGrid;
    _scrollView: St.ScrollView;
    _canScroll: boolean;
    _scrollTimeoutId: number;
    _adjustment: St.Adjustment;
    _pageIndicators: any;
    _nextPageIndicator: St.Widget;
    _prevPageIndicator: St.Widget;
    _nextPageArrow: St.Button;
    _prevPageArrow: St.Button;
    _appGridLayout: BaseAppViewGridLayout;
    _box: St.BoxLayout;
    _swipeTracker: any;
    _orientation: Clutter.Orientation;
    _items: Map<string, AppViewItem>;
    _orderedItems: AppViewItem[];
    _parentalControlsManager: ParentalControlsManager;
    _appFavorites: AppFavorites;
    _lastOvershootCoord: number;
    _delayedMoveData: PageMoveData | null;
    _dragBeginId: number;
    _dragEndId: number;
    _dragCancelledId: number;

    constructor(params?: Partial<St.Widget.ConstructorProps>);
    _init(params?: Partial<St.Widget.ConstructorProps>): void;

    _onDestroy(): void;
    _createGrid(): AppGrid;
    _onScroll(actor: St.ScrollView, event: Clutter.ScrollEvent): boolean;
    _swipeBegin(tracker: any, monitor: Clutter.EventSequence): void;
    _swipeUpdate(tracker: any, progress: number): void;
    _swipeEnd(tracker: any, duration: number, endProgress: number): void;
    _connectDnD(): void;
    _disconnectDnD(): void;
    _maybeMoveItem(dragEvent: DragEvent): void;
    _removeDelayedMove(): void;
    _resetDragPageSwitch(): void;
    _setupDragPageSwitchRepeat(direction: number): void;
    _dragMaybeSwitchPageImmediately(dragEvent: DragEvent): void;
    _maybeSetupDragPageSwitchInitialTimeout(dragEvent: DragEvent): void;
    _onDragBegin(): void;
    _onDragMotion(dragEvent: DragEvent): boolean;
    _onDragDrop(dropEvent: DropEvent): boolean;
    _onDragEnd(): void;
    _onDragCancelled(): void;
    _canAccept(source: any): boolean;
    _findBestPageToAppend(startPage?: number): number;
    _getLinearPosition(item: BaseIcon): number;
    _addItem(item: AppViewItem, page: number, position: number): void;
    _removeItem(item: AppViewItem): void;
    _getItemPosition(item: AppViewItem): [number, number];
    _redisplay(): void;
    _compareItems(a: AppViewItem, b: AppViewItem): number;
    _selectAppInternal(id: string): void;
    _getDropTarget(x: number, y: number, source: any): [number, number, number];
    _moveItem(item: AppViewItem, newPage: number, newPosition: number): void;

    handleDragOver(source: any): DragMotionResult;
    acceptDrop(source: any): boolean;
    getAllItems(): AppViewItem[];
    selectApp(id: string): void;
    animateSwitch(animationDirection: number): void;
    goToPage(pageNumber: number, animate?: boolean): void;

    // Signal handler methods
    connect<S extends BaseAppView.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;
    connect_after<S extends BaseAppView.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;

    // Generic signal handler methods
    connect(signal: string, callback: (...args: any[]) => any): number;
    connect_after(signal: string, callback: (...args: any[]) => any): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L1256
 * @version 50
 */
declare class PageManager extends GObject.Object {
    pages: { [appId: string]: { position: number } }[];

    _updatingPages: boolean;

    constructor();
    _init(): void;

    _loadPages(): void;

    getAppPosition(appId: string): [number, number];
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L1316
 * @version 50
 */
export class AppDisplay extends BaseAppView {
    _pageManager: PageManager;
    _folderIcons: FolderIcon[];
    _currentDialog: AppFolderDialog | null;
    _displayingDialog: boolean;
    _placeholder: AppIcon | null;
    _overviewHiddenId: number;
    _redisplayWorkId: string;
    _folderSettings: Gio.Settings;
    _appInfoList?: Gio.AppInfo[];

    constructor();
    _init(): void;

    _onDestroy(): void;
    _redisplay(): void;
    _savePages(): void;
    _ensureDefaultFolders(): void;
    _ensurePlaceholder(source: AppViewItem): void;
    _removePlaceholder(): void;
    _getItemPosition(item: AppViewItem): [number, number];
    _compareItems(a: AppViewItem, b: AppViewItem): number;
    _loadApps(): AppViewItem[];
    _onScroll(actor: St.ScrollView, event: Clutter.ScrollEvent): boolean;
    _onKeyPressEvent(actor: St.Widget, event: Clutter.KeyEvent): boolean;
    _maybeMoveItem(dragEvent: DragEvent): void;
    /** @hidden */
    _onDragBegin(): void;
    _onDragBegin(overview: any, source: any): void;
    _onDragMotion(dragEvent: DragEvent): boolean;
    _onDragEnd(): void;
    /** @hidden */
    _onDragCancelled(): void;
    _onDragCancelled(overview: any, source: any): void;

    getAppInfos(): Gio.AppInfo[];
    animateSwitch(animationDirection: number): void;
    goToPage(pageNumber: number, animate?: boolean): void;
    addFolderDialog(dialog: AppFolderDialog): void;
    acceptDrop(source: any): boolean;
    createFolder(apps: string[]): boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L1752
 * @version 50
 */
export class AppSearchProvider {
    id: string;
    isRemoteProvider: boolean;
    canLaunchSearch: boolean;
    maxResults: number;

    _appSys: Shell.AppSystem;
    _systemActions: SystemActions;
    _parentalControlsManager: ParentalControlsManager;

    constructor();

    getResultMetas(apps: string[]): Promise<MetaInfo[]>;
    filterResults(results: any[], maxNumber: number): any[];
    getInitialResultSet(terms: string[], cancellable: Gio.Cancellable): Promise<any[]>;
    getSubsearchResultSet(previousResults: any[], terms: string[], cancellable: Gio.Cancellable): any[];
    createResultObject(resultMeta: MetaInfo): AppIcon | SystemActionIcon;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L1847
 * @version 50
 */
export class AppViewItem extends St.Button {
    _id?: string;
    _name?: string;
    _draggable?: _Draggable | null;
    _dragMonitor?: DragMonitor | null;
    _otherIconIsHovering: boolean;
    _expandTitleOnHover: boolean;

    constructor(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean);
    _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;

    _onDestroy(): void;
    _updateMultiline(): void;
    _onHover(): void;
    _onDragBegin(): void;
    _onDragCancelled(): void;
    _onDragEnd(): void;
    _canAccept(source: any): boolean;
    _setHoveringByDnd(hovering: boolean): void;
    _onDragMotion(dragEvent: DragEvent): DragMotionResult;
    _withinLeeways(x: number): boolean;

    scaleIn(): void;
    scaleAndFade(): void;
    undoScaleAndFade(): void;
    handleDragOver(source: any, actor: St.Widget, x: number): DragMotionResult;
    acceptDrop(source: any, actor: St.Widget, x: number): boolean;
    setForcedHighlight(highlight: boolean): void;

    get id(): string;
    get name(): string;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2059
 * @version 50
 */
declare class FolderGrid extends AppGrid {
    constructor();
    _init(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2078
 * @version 50
 */
export class FolderView extends BaseAppView {
    _folder: Gio.Settings;
    _id: string;
    _parentView: BaseAppView;
    _deletingFolder: boolean;
    _apps: Shell.App[];

    constructor(folder: Gio.Settings, id: string, parentView: BaseAppView);

    /** @hidden */
    _init(params?: Partial<St.Widget.ConstructorProps>): void;
    _init(folder: Gio.Settings, id: string, parentView: BaseAppView): void;

    _createGrid(): FolderGrid;
    _getItemPosition(item: AppViewItem): [number, number];
    _compareItems(a: AppViewItem, b: AppViewItem): number;
    _loadApps(): AppIcon[];

    createFolderIcon(size: number): St.Widget;
    acceptDrop(source: any): boolean;
    addApp(app: AppIcon): void;
    removeApp(app: AppIcon): void;

    get deletingFolder(): boolean;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2272
 * @version 50
 */
export namespace FolderIcon {
    export interface SignalSignatures extends St.Button.SignalSignatures {
        'apps-changed': () => void;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2276
 * @version 50
 */
export class FolderIcon extends AppViewItem {
    $signals: FolderIcon.SignalSignatures;

    icon: BaseIcon;
    view: FolderView;

    _parentView: AppDisplay;
    _folder: Gio.Settings;
    _dialog?: AppFolderDialog;

    constructor(id: string, path: string, parentView: AppDisplay);

    /** @hidden */
    _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;
    _init(id: string, path: string, parentView: AppDisplay): void;

    _onDestroy(): void;
    _setHoveringByDnd(hovering: boolean): void;
    _onDragMotion(dragEvent: DragEvent): DragMotionResult;
    _canAccept(source: any): boolean;
    _updateName(): void;
    _sync(): void;
    _createIcon(): St.Widget;
    _ensureFolderDialog(): void;

    open(): void;
    getAppIds(): string[];
    getDragActor(): BaseIcon;
    getDragActorSource(): FolderIcon;
    acceptDrop(source: any): boolean;

    // Signal handler methods
    connect<S extends FolderIcon.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;
    connect_after<S extends FolderIcon.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;

    // Generic signal handler methods
    connect(signal: string, callback: (...args: any[]) => any): number;
    connect_after(signal: string, callback: (...args: any[]) => any): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2455
 * @version 50
 */
export namespace AppFolderDialog {
    export interface SignalSignatures extends St.Bin.SignalSignatures {
        'open-state-changed': (isOpen: boolean) => void;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2459
 * @version 50
 */
export class AppFolderDialog extends St.Bin {
    $signals: AppFolderDialog.SignalSignatures;

    _source: FolderIcon;
    _folder: Gio.Settings;
    _view: FolderView;
    _appDisplay: AppDisplay;
    _isOpen: boolean;
    _viewBox: St.BoxLayout;
    _grabHelper: any;
    _dragMonitor: DragMonitor | null;
    _sourceMappedId: number;
    _popdownTimeoutId: number;
    _needsZoomAndFade: boolean;
    _popdownCallbacks: (() => void)[];

    constructor(source: FolderIcon, folder: Gio.Settings, appDisplay: AppDisplay);
    _init(source: FolderIcon, folder: Gio.Settings, appDisplay: AppDisplay): void;

    _addFolderNameEntry(): void;
    _syncFolderName(): void;
    _switchActor(from: St.Widget, to: St.Widget): void;
    _showFolderLabel(): void;
    _showFolderEntry(): void;
    _maybeUpdateFolderName(): void;
    _zoomAndFadeIn(): void;
    _zoomAndFadeOut(): void;
    _removeDragMonitor(): void;
    _removePopdownTimeout(): void;
    _onDestroy(): void;
    _setLighterBackground(lighter: boolean): void;
    _withinDialog(x: number, y: number): boolean;
    _setupDragMonitor(): void;
    _setupPopdownTimeout(): void;

    handleDragOver(source: any, actor: St.Widget, x: number, y: number): DragMotionResult;
    acceptDrop(source: any): boolean;
    toggle(): void;
    popup(): void;
    popdown(callback: () => void): void;

    // Signal handler methods
    connect<S extends AppFolderDialog.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;
    connect_after<S extends AppFolderDialog.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;

    // Generic signal handler methods
    connect(signal: string, callback: (...args: any[]) => any): number;
    connect_after(signal: string, callback: (...args: any[]) => any): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2908
 * @version 50
 */
export namespace AppIcon {
    export interface SignalSignatures extends St.Button.SignalSignatures {
        'menu-state-changed': (isOpen: boolean) => void;
        'sync-tooltip': () => void;
    }

    export interface ConstructorProps extends BaseIcon.ConstructorProps {
        isDraggable: boolean;
        popupMenuSide: St.Side;
        expandTitleOnHover: boolean;
    }
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L2913
 * @version 50
 */
export class AppIcon extends AppViewItem {
    $signals: AppIcon.SignalSignatures;

    app: Shell.App;
    icon: BaseIcon;

    _id: string;
    _name: string;
    _popupMenuSide: St.Side;
    _iconContainer: St.Widget;
    _folderPreviewId: number;
    _dot: St.Widget;
    _menu: AppMenu | null;
    _menuManager: PopupMenuManager;

    constructor(app: Shell.App, iconParams?: Partial<AppIcon.ConstructorProps>);

    /** @hidden */
    _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;
    _init(app: Shell.App, iconParams?: Partial<AppIcon.ConstructorProps>): void;

    _onDestroy(): void;
    _createIcon(iconSize: number): St.Widget;
    _updateDotStyle(): void;
    _updateRunningStyle(): void;
    _onKeyboardPopupMenu(): void;
    _onMenuPoppedDown(): void;
    _showFolderPreview(): void;
    _hideFolderPreview(): void;
    _canAccept(source: any): boolean;
    _setHoveringByDnd(hovering: boolean): void;

    getId(): string;
    popupMenu(): boolean;
    activate(button: number): void;
    animateLaunch(): void;
    animateLaunchAtPos(x: number, y: number): void;
    getDragActor(): St.Widget;
    /**
     * @returns The original actor that should align with the actor we show as the item is being dragged.
     */
    getDragActorSource(): St.Icon;
    shouldShowTooltip(): boolean;
    acceptDrop(source: any, actor: St.Widget, x: number): boolean;

    // Signal handler methods
    connect<S extends AppIcon.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;
    connect_after<S extends AppIcon.SignalSignatures, K extends keyof S>(signal: K, callback: GObject.SignalCallback<this, S[K]>): number;

    // Generic signal handler methods
    connect(signal: string, callback: (...args: any[]) => any): number;
    connect_after(signal: string, callback: (...args: any[]) => any): number;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-50/js/ui/appDisplay.js#L3155
 * @version 50
 */
export class SystemActionIcon extends GridSearchResult {
    activate(): void;
}
