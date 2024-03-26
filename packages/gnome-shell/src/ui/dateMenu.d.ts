// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/dateMenu.js

import type Clutter from "@girs/clutter-14";
import type St from "@girs/st-14";

import type { EventSourceBase } from "./calendar.js";
import type { Button } from "./panelMenu.js";

export class TodayButton extends St.Button {
    setDate(date: Date): void;
}

export class EventsSection extends St.Button {
    setDate(date: Date): void;

    setEventSource(eventSource: EventSourceBase): void;
}

export class WordClocksSection extends St.Button {}

export class WeatherSection extends St.Button {}

export class MessagesIndicator extends St.Icon {}

export class FreezableBinLayout extends Clutter.BinLayout {}

export class CalendarColumnLayout extends Clutter.BoxLayout {}

export class DateMenuButton extends Button {}