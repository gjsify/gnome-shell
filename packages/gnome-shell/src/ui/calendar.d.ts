// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/calendar.js

import type GObject from '@girs/gobject-2.0';
import type Gio from '@girs/gio-2.0';
import type St from '@girs/st-17';
import type Clutter from '@girs/clutter-17';

import type { Switch } from './popupMenu.js';
import type { MessageView } from './messageList.js';

declare function sameYear(dateA: Date, dateB: Date): boolean;

declare function sameMonth(dateA: Date, dateB: Date): boolean;

declare function sameDay(dateA: Date, dateB: Date): boolean;

declare function _isWorkDay(date: Date): boolean;

declare function _getBeginningOfDay(date: Date): Date;

declare function _getEndOfDay(date: Date): Date;

declare function _getCalendarDayAbbreviation(dayNumber: number): string;

/**
 * Abstraction for an appointment/event in a calendar
 */
declare class CalendarEvent {
    id: string;
    date: Date;
    end: Date;
    summary: string;

    constructor(id: string, date: Date, end: Date, summary: string);
}

/**
 * Interface for appointments/events - e.g. the contents of a calendar
 */
declare abstract class EventSourceBase extends GObject.Object {
    abstract readonly isLoading: boolean;
    abstract readonly hasCalendars: boolean;

    destroy(): void;
    abstract requestRange(begin: Date, end: Date): void;
    abstract getEvents(begin: Date, end: Date): CalendarEvent[];
    abstract hasEvents(day: Date): boolean;
}

declare class EmptyEventSource extends EventSourceBase {
    readonly isLoading: boolean;
    readonly hasCalendars: boolean;

    requestRange(begin: Date, end: Date): void;
    getEvents(begin: Date, end: Date): CalendarEvent[];
    hasEvents(day: Date): boolean;
}

declare const CalendarServerIface: GObject.Interface;

declare const CalendarServerInfo: Gio.DBusNodeInfo;

declare function CalendarServer(): Gio.DBusProxy;

declare function _datesEqual(dateA: Date, dateB: Date): boolean;

/**
 * Checks whether an event overlaps a given interval
 *
 * @param e0 Beginning of the event
 * @param e1 End of the event
 * @param i0 Beginning of the interval
 * @param i1 End of the interval
 * @returns Whether there was an overlap
 */
declare function _eventOverlapsInterval(e0: Date, e1: Date, i0: Date, i1: Date): boolean;

declare class DBusEventSource extends EventSourceBase {
    _events: Map<string, CalendarEvent>;
    _isLoading: boolean;
    _initialized: boolean;
    _dbusProxy: Gio.DBusProxy;

    readonly isLoading: boolean;
    readonly hasCalendars: boolean;

    constructor();
    _init(): void;

    requestRange(begin: Date, end: Date): void;
    getEvents(begin: Date, end: Date): CalendarEvent[];
    hasEvents(day: Date): boolean;
    destroy(): void;
    requestRange(begin: Date, end: Date): void;
    getEvents(begin: Date, end: Date): CalendarEvent[];
    hasEvents(day: Date): boolean;

    _initProxy(): Promise<void>;
    _resetCache(): void;
    _removeMatching(uidPrefix: string): boolean;
    _onNameAppeared(): void;
    _onNameVanished(): void;
    _onEventsAddedOrUpdated(dbusProxy: Gio.DBusProxy, nameOwner: string, argArray: any[][]): void;
    _onEventsRemoved(dbusProxy: Gio.DBusProxy, nameOwner: string, argArray: any[][]): void;
    _onClientDisappeared(dbusProxy: Gio.DBusProxy, nameOwner: string, argArray: string[]): void;
    _loadEvents(forceReload: boolean): void;
    _getFilteredEvents(begin: Date, end: Date): Generator<CalendarEvent, void, unknown>;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/calendar.js#L406
 * @version 48
 */
export class Calendar extends St.Widget {
    _weekStart: number;
    _settings: Gio.Settings;
    _useWeekdate: boolean;

    /**
     * Translators: The header displaying just the month name
     * standalone, when this is a month of the current year.
     * "%OB" is the new format specifier introduced in glibc 2.27,
     * in most cases you should not change it.
     */
    _headerFormatWithoutYear: string;

    /**
     * Translators: The header displaying the month name and the year
     * number, when this is a month of a different year.  You can
     * reorder the format specifiers or add other modifications
     * according to the requirements of your language.
     * "%OB" is the new format specifier introduced in glibc 2.27,
     * in most cases you should not use the old "%B" here unless you
     * absolutely know what you are doing.
     */
    _headerFormat: string;

    _selectedDate: Date;

    _shouldDateGrabFocus: boolean;

    constructor();
    /** @hidden */
    _init(params?: Partial<St.Widget.ConstructorProps>): void;
    _init(): void;

    setEventSource(eventSource: EventSourceBase): void;

    /**
     * Sets the calendar to show a specific date
     * @param date The date to show
     */
    setDate(date: Date): void;

    updateTimeZone(): void;

    vfunc_scroll_event(event: Clutter.ScrollEvent): boolean;

    _buildHeader(): void;
    _onPrevMonthButtonClicked(): void;
    _onNextMonthButtonClicked(): void;
    _onSettingsChange(): void;
    _rebuildCalendar(): void;
    _update(): void;
}

declare class Placeholder extends St.BoxLayout {
    _date: Date;
    _icon: St.Icon;
    _label: St.Label;

    /** @hidden */
    override _init(params?: Partial<St.BoxLayout.ConstructorProps>): void;
    _init(): void;
}

declare class DoNotDisturbSwitch extends Switch {
    _settings: Gio.Settings;

    constructor();
    /** @hidden */
    override _init(config?: Partial<St.Bin.ConstructorProps>): void;
    /** @hidden */
    override _init(state: boolean): void;
    _init(): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/calendar.js#L799
 * @version 48
 */

export class CalendarMessageList extends St.Widget {
    _placeholder: Placeholder;
    _scrollView: St.ScrollView;
    _dndSwitch: DoNotDisturbSwitch;
    _dndButton: St.Button;
    _clearButton: St.Button;
    _messageView: MessageView;

    // visible: boolean;

    /** @hidden */
    override _init(config?: Partial<St.Widget.ConstructorProps>): void;
    _init(): void;

    maybeCollapseMessageGroupForEvent(event: Clutter.Event): boolean;
}
