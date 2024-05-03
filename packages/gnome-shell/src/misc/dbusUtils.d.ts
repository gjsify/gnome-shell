// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/dbusUtils.js

/**
 * Load an interface xml file
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/dbusUtils.js#L26
 * @version 46
 *
 * @param {string} iface the interface name
 * @returns {string | null} the XML string or null if it is not found
 */
export function loadInterfaceXML(iface: string): string | null;

/**
 * Load a subinterface xml file
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/dbusUtils.js#L47
 * @version 46
 *
 * @param {string} iface the interface name
 * @param {string} ifaceFile the interface filename
 * @returns {string | null} the XML string or null if it is not found
 */
export function loadSubInterfaceXML(iface: string, ifaceFile: string): string | null;
