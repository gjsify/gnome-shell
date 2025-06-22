// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appDisplay.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-16';
import type Clutter from '@girs/clutter-16';

import { GridSearchResult } from './search.js';

import { IconGrid, BaseIcon } from './iconGrid.js';
import { DragMotionResult } from './dnd.js';

export class AppGrid extends IconGrid {
    public indicatorsPadding: number;

    /** @hidden */
    public _init(params?: Partial<St.Viewport.ConstructorProps>): void;
    public _init(layoutParams?: Partial<IconGrid.ConstructorProps>): void;

    _updatePadding(): void;
}

export abstract class BaseAppView extends St.Widget {
    // TODO: 'view-loaded' signal
    constructor(params?: Partial<St.Widget.ConstructorProps>);
    public _init(params?: Partial<St.Widget.ConstructorProps>): void;

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

    public handleDragOver(source: any): DragMotionResult;
    public acceptDrop(source: any): boolean;
    public getItemPosition(item: any): [number, number];
    public getAllItems(): any[];
    public selectApp(id: string): void;
    public animateSwitch(animationDirection: number): void;
    public goToPage(pageNumber: number, animate: boolean): void;
    public updateDragFocus(dragFocus: any): void;
}

export class AppDisplay extends BaseAppView {
    constructor();
    public _init(): void;

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

    public getAppInfos(): any[];
    public animateSwitch(animationDirection: number): void;
    public goToPage(pageNumber: number, animate?: boolean): void;
    public addFolderDialog(dialog: any): void;
    public acceptDrop(source: any): boolean;
    public createFolder(apps: any[]): boolean;
}

export class AppSearchProvider {
    constructor();

    public getResultMetas(apps: any[]): Promise<any[]>;
    public filterResults(results: any[], maxNumber: number): any[];
    public getInitialResultSet(terms: string[], cancellable: Gio.Cancellable): Promise<any[]>;
    public getSubsearchResultSet(previousResults: any[], terms: string[], cancellable: Gio.Cancellable): any[];
    public createResultObject(resultMeta: any): AppIcon | SystemActionIcon;
}

export class AppViewItem extends St.Button {
    readonly id: string;
    readonly app: any;

    constructor(params?: Partial<St.Button.ConstructorProps>);
    public _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;

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

    public scaleIn(): void;
    public scaleAndFade(): void;
    public undoScaleAndFade(): void;
    public handleDragOver(source: any, actor: St.Widget, x: number): DragMotionResult;
    public acceptDrop(source: any, actor: St.Widget, x: number): boolean;
    public cancelActions(): void;
    public setForcedHighlight(highlight: boolean): void;
}

export namespace AppIcon {
    export interface ConstructorProps extends BaseIcon.ConstructorProps {
        isDraggable: boolean;
        expandTitleOnHover: boolean;
    }
}

export class AppIcon extends AppViewItem {
    public app: any;
    public icon: BaseIcon;

    _id: string;
    _name: string;
    _iconContainer: St.Widget;
    _folderPreviewId: number;

    constructor(app: any, iconParams?: AppIcon.ConstructorProps);

    /** @hidden */
    public _init(params?: Partial<St.Button.ConstructorProps>, isDraggable?: boolean, expandTitleOnHover?: boolean): void;
    public _init(app: any, iconParams?: Partial<AppIcon.ConstructorProps>): void;

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

    public onDragBegin(): void;
    public updateRunningStyle(): void;
    public getId(): string;
    public popupMenu(side?: St.Side): void;
    public animateLaunch(): void;
    public animateLaunchAtPos(x: number, y: number): void;
    public shellWorkspaceLaunch(params?: { workspace: number; timestamp: number }): void;
    public getDragActor(): St.Widget;
    /**
     * @returns The original actor that should align with the actor we show as the item is being dragged.
     */
    public getDragActorSource(): St.Widget;
    public shouldShowTooltip(): boolean;
    public acceptDrop(source: any, actor: St.Widget, x: number): boolean;
    public cancelActions(): void;
}

export class SystemActionIcon extends GridSearchResult {
    activate(): void;
}
