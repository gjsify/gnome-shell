// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/components/keyring.js

import type Gcr from '@girs/gcr-4';

declare class KeyringPrompter extends Gcr.SystemPrompter {
    constructor();
    _init(): void;

    enable(): void;
    disable(): void;
}

export declare const Component: typeof KeyringPrompter;
