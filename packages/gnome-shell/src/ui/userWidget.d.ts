// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/userWidget.js

import type St from '@girs/st-51';

export class UserWidget extends St.BoxLayout {
    /**
     * Hides the avatar and leaves the user name in place.
     *
     * @version 51
     */
    hideAvatar(): void;

    /**
     * Shows the avatar again.
     *
     * @version 51
     */
    showAvatar(): void;
}
