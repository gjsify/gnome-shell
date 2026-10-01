// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspacesView.js

import type St from '@girs/st-51';

import { Workspace } from './workspace.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspacesView.js#L85
 * @version 50
 */
export enum FitMode {
    SINGLE = 0,
    ALL = 1,
}

/**
 * @version 46
 */
export class WorkspacesView {
    _scrollToActive(): void;
    _workspaces: Workspace[];
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/workspacesView.js#L816
 * @version 50
 */
export class WorkspacesDisplay extends St.Widget {
    _leavingOverview: boolean;
}
