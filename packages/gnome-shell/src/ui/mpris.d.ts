// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/mpris.js

import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-16';

import type { EventEmitter } from '../misc/signals.js';
import type { NotificationMessageGroup } from './messageList.js';

declare class MprisPlayer extends EventEmitter {
    readonly status: string;
    readonly trackArtists: string;
    readonly trackTitle: string;
    readonly trackCoverUrl: string;
    readonly canGoNext: boolean;
    readonly canGoPrevious: boolean;

    constructor(busName: string);

    playPause(): void;
    next(): void;
    previous(): void;
    raise(): void;

    _close(): void;
    _onMprisProxyReady(): void;
    _onPlayerProxyReady(): void;
    _updateState(): void;
}

export class MprisSource extends NotificationMessageGroup {
    _players: Map<string, MprisPlayer>;
    _proxy: Gio.DBusProxy;

    public readonly allowed: boolean;

    /** @hidden */
    public _init(params?: Partial<St.BoxLayout.ConstructorProps>): void;
    public _init(): void;

    _addPlayer(busName: string): void;
    _onProxyReady(): Promise<void>;
    _onNameOwnerChanged(proxy: Gio.DBusProxy, sender: string, names: string[]): void;
}
