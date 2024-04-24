// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/components/automountManager.js

declare class AutomountManager {
    constructor();

    enable(): void;
    disable(): void;
}

export declare const Component: typeof AutomountManager;
