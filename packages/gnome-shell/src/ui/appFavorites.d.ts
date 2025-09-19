// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appFavorites.js

import type Shell from '@girs/shell-17';

import { EventEmitter } from '../misc/signals.js';

declare class AppFavorites extends EventEmitter {
    _favorites: Map<string, Shell.App>;

    constructor();

    _onFavsChanged(): void;
    _getIds(): string[];
    _addFavorite(appId: string, pos: number): void;
    _removeFavorite(appId: string): void;

    reload(): void;
    getFavoriteMap(): Map<string, Shell.App>;
    getFavorites(): Shell.App[];
    isFavorite(appId: string): boolean;
    addFavoriteAtPos(appId: string, pos: number): void;
    addFavorite(appId: string): void;
    moveFavoriteToPos(appId: string, pos: number): void;
    removeFavorite(appId: string): void;
}

export function getAppFavorites(): AppFavorites;
