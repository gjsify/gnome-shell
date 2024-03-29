// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appFavorites.js

import type Shell from '@girs/shell-14';

import { EventEmitter } from '../misc/signals.js';

declare class AppFavorites extends EventEmitter {
    protected _favorites: Map<string, Shell.App>;

    constructor();

    protected _onFavsChanged(): void;
    protected _getIds(): string[];
    protected _addFavorite(appId: string, pos: number): void;
    protected _removeFavorite(appId: string): void;

    public reload(): void;
    public getFavoriteMap(): Map<string, Shell.App>;
    public getFavorites(): Shell.App[];
    public isFavorite(appId: string): boolean;
    public addFavoriteAtPos(appId: string, pos: number): void;
    public addFavorite(appId: string): void;
    public moveFavoriteToPos(appId: string, pos: number): void;
    public removeFavorite(appId: string): void;
}

export function getAppFavorites(): AppFavorites;
