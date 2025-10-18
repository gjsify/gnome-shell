import GLib from '@girs/glib-2.0';

/**
 * Formats a Date object according to a C sprintf-style string using
 * the cached local timezone.
 *
 * @param date a Date object
 * @param format a format String for the date
 *
 * @version 49
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/dateUtils.js#L41
 */
export function formatDateWithCFormatString(date: Date, format: string): string;

/**
 * Formats a time span string representing the
 * date passed in to the current time.
 *
 * @param date the start of the time span
 *
 * @version 49
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/dateUtils.js#L54
 */
export function formatTimeSpan(date: GLib.DateTime): string;

/**
 * Formats a date time string based on style parameters
 *
 *
 * @param time a Date object
 * @param [params] style parameters for the output string
 * @param params.timeOnly whether the string should only contain the time (no date)
 * @param params.ampm whether to include the "am" or "pm" in the string
 *
 * @version 49
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/dateUtils.js#L123
 */
export function formatTime(time: GLib.DateTime | Date, params?: { timeOnly?: boolean; ampm?: boolean }): string;
