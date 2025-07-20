// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dateMenu.js

import { CalendarMessageList } from './calendar.js';
import type { Button } from './panelMenu.js';

/**
 * @version 46
 */
export class DateMenuButton extends Button {
    _messageList: CalendarMessageList;
}
