// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/components/polkitAgent.js

import type Shell from '@girs/shell-14';

declare class AuthenticationAgent extends Shell.PolkitAuthenticationAgent {
    constructor();
    _init(): void;

    enable(): void;
    disable(): void;
}

export declare const Component: typeof AuthenticationAgent;
