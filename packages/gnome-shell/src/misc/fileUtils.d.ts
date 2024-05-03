// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/fileUtils.js

import type Gio from '@girs/gio-2.0';

export interface SubdirInfo {
    dir: Gio.File;
    info: Gio.FileInfo;
}

/**
 * Collects all subdirectories named `subdir` within the system data directories and (optionally) the user's data directory
 *
 * @param {string} subdir - the subdirectory to search within the data directories
 * @param {boolean} includeUserDir - whether the user's data directory should also be searched in addition to the system data directories
 * @returns {IterableIterator<SubdirInfo>} - a generator which yields file info for subdirectories named `subdir` within data directories
 */
export function collectFromDatadirs(subdir: string, includeUserDir: boolean): IterableIterator<SubdirInfo>;

/**
 * Recursively delete a directory and its contents
 *
 * @param {Gio.File} dir - the file object for the directory to delete
 * @param {boolean} deleteParent - whether to delete the parent directory
 */
export function recursivelyDeleteDir(dir: Gio.File, deleteParent: boolean): void;

/**
 * Recursively move a directory and its contents
 *
 * @param {Gio.File} srcDir - the file object for the directory to move
 * @param {Gio.File} destDir - the file object for the destination directory
 */
export function recursivelyMoveDir(srcDir: Gio.File, destDir: Gio.File): void;

/**
 * Load an interface xml file
 * 
 * @param {string} iface the interface name
 * @returns {string | null} the XML string or null if it is not found
 */
export function loadInterfaceXML(iface: string): string | null;

/**
 * Load a subinterface xml file
 * 
 * @param {string} iface the interface name
 * @param {string} ifaceFile the interface filename
 * @returns {string | null} the XML string or null if it is not found
 */
export function loadSubInterfaceXML(iface: string, ifaceFile: string): string | null;
