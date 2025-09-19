// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appDisplay.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';

import { GridSearchResult } from './search.js';

import { IconGrid, BaseIcon } from './iconGrid.js';
import { DragMotionResult } from './dnd.js';

export class AppGrid extends IconGrid {
    indicatorsPadding: number;

    /** @hidden */
    _init(params?: Partial<St.Viewport.ConstructorProps>): void;
    _init(layoutParams?: Partial<IconGrid.ConstructorProps>): void;

    _updatePadding(): void;
}

export abstract class BaseAppView extends St.Widget {
    // TODO: 'view-loaded' signal
    constructor(params?: Partial<St.Widget.ConstructorProps>);
    _init(params?: Partial<St.Widget.ConstructorProps>): void;

    _onDestroy(): void;
    _createGrid(): AppGrid;
    _onScroll(actor: St.Widget, event: Clutter.ScrollEvent): boolean;
    _swipeBegin(tracker: any, monitor: Clutter.EventSequence): void;
    _swipeUpdate(tracker: any, progress: number): void;
    _swipeEnd(tracker: any, duration: number, endProgress: number): void;
    _connectDnD(): void;
    _disconnectDnD(): void;
    _maybeMoveItem(dragEvent: Clutter.Event): void;
    _removeDelayedMove(): void;
    _resetDragPageSwitch(): void;
    _setupDragPageSwitchRepeat(direction: number): void;
    _dragMaybeSwitchPageImmediately(dragEvent: Clutter.Event): void;
    _maybeSetupDragPageSwitchInitialTimeout(dragEvent: Clutter.Event): void;
    _onDragBegin(): void;
    _onDragMotion(dragEvent: Clutter.Event): boolean;
    _onDragDrop(dropEvent: Clutter.Event): boolean;
    _onDragEnd(): void;
    _onDragCancelled(): void;
    _canAccept(source: any): boolean;
    _findBestPageToAppend(startPage?: number): number;
    _getLinearPosition(page: number, position: number): number;
    _addItem(item: any, page: number, position: number): void;
    _removeItem(item: any): void;
    _redisplay(): void;
    _compareItems(a: any, b: any): number;
    _selectAppInternal(id: string): void;
    _getDropTarget(x: number, y: number, source: any): [number, number, number];
    _moveItem(item: any, newPage: number, newPosition: number): void;

    handleDragOver(source: any): DragMotionResult;
    acceptDrop(source: any): boolean;
    getItemPosition(item: any): [number, number];
    getAllItems(): any[];
    selectApp(id: string): void;
    animateSwitch(animationDirection: number): void;
    goToPage(pageNumber: number, animate: boolean): void;
    updateDragFocus(dragFocus: any): void;
}

export class AppDisplay extends BaseAppView {
    constructor();
    _init(): void;

    _onDestroy(): void;
    _redisplay(): void;
    _savePages(): void;
    _ensureDefaultFolders(): void;
    _ensurePlaceholder(source: any): void;
    _removePlaceholder(): void;
    _getItemPosition(item: any): [number, number];
    _compareItems(a: any, b: any): number;
    _loadApps(): void;
    _onScroll(actor: St.Widget, event: Clutter.ScrollEvent): boolean;
    _onKeyPressEvent(actor: St.Widget, event: Clutter.KeyEvent): boolean;
    _maybeMoveItem(dragEvent: Clutter.Event): void;
    /** @hidden */
    _onDragBegin(): void;
    _onDragBegin(overview: any, source: any): void;
    _onDragMotion(dragEvent: Clutter.Event): boolean;
    _onDragEnd(): void;
    /** @hidden */
    _onDragCancelled(): void;
    _onDragCancelled(overview: any, source: any): void;

    getAppInfos(): any[];
    animateSwitch(animationDirection: number): void;
    goToPage(pageNumber: number, animate?: boolean): void;
    addFolderDialog(dialog: any): void;
    acceptDrop(source: any): boolean;
    createFolder(apps: any[]): boolean;
}

export class AppSearchProvider {
    constructor();

    getResultMetas(apps: any[]): Promise<any[]>;
    filterResults(results: any[], maxNumber: number): any[];
    getInitialResultSet(terms: string[], cancellable: Gio.Cancellable): Promise<any[]>;
    getSubsearchResultSet(previousResults: any[], terms: string[], cancellable: Gio.Cancellable): any[];
    createResultObject(resultMeta: any): AppIcon | SystemActionIcon;
}

export class AppViewItem extends St.Button {
    readonly id: string;
    readonly app: any;

    constructor(params?: Partial<St.Button.ConstructorProps>);
    _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;

    _onDestroy(): void;
    _updateMultiline(): void;
    _onHover(): void;
    _onDragBegin(): void;
    _onDragCancelled(): void;
    _onDragEnd(): void;
    _canAccept(source: any): boolean;
    _setHoveringByDnd(hovering: boolean): void;
    _onDragMotion(dragEvent: Clutter.Event): boolean;
    _withinLeeways(x: number): boolean;

    scaleIn(): void;
    scaleAndFade(): void;
    undoScaleAndFade(): void;
    handleDragOver(source: any, actor: St.Widget, x: number): DragMotionResult;
    acceptDrop(source: any, actor: St.Widget, x: number): boolean;
    cancelActions(): void;
    setForcedHighlight(highlight: boolean): void;
}

export namespace AppIcon {
    export interface ConstructorProps extends BaseIcon.ConstructorProps {
        isDraggable: boolean;
        expandTitleOnHover: boolean;
    }
}

export class AppIcon extends AppViewItem {
    app: any;
    icon: BaseIcon;

    _id: string;
    _name: string;
    _iconContainer: St.Widget;
    _folderPreviewId: number;

    constructor(app: any, iconParams?: AppIcon.ConstructorProps);

    /** @hidden */
    _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;
    _init(app: any, iconParams?: Partial<AppIcon.ConstructorProps>): void;

    _onDestroy(): void;
    _createIcon(iconSize: number): St.Widget;
    _removeMenuTimeout(): void;
    _setPopupTimeout(): void;
    _onKeyboardPopupMenu(): void;
    _onMenuPoppedDown(): void;
    _onMenuPoppedDown(button: St.Button): void;
    _showFolderPreview(): void;
    _hideFolderPreview(): void;
    _canAccept(source: any): boolean;
    _setHoveringByDnd(hovering: boolean): void;

    onDragBegin(): void;
    updateRunningStyle(): void;
    getId(): string;
    popupMenu(side?: St.Side): void;
    animateLaunch(): void;
    animateLaunchAtPos(x: number, y: number): void;
    shellWorkspaceLaunch(params?: { workspace: number; timestamp: number }): void;
    getDragActor(): St.Widget;
    /**
     * @returns The original actor that should align with the actor we show as the item is being dragged.
     */
    getDragActorSource(): St.Widget;
    shouldShowTooltip(): boolean;
    acceptDrop(source: any, actor: St.Widget, x: number): boolean;
    cancelActions(): void;
}

export class SystemActionIcon extends GridSearchResult {
    activate(): void;
}
