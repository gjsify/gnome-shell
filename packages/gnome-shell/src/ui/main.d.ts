// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/main.js

import type Gio from '@girs/gio-2.0';
import type Shell from '@girs/shell-14';
import type Clutter from '@girs/clutter-14';
import type St from '@girs/st-14';
import type Meta from '@girs/meta-14';

import { ComponentManager } from './components.js';
import { AccessDialogDBus } from './accessDialog.js';
import { AudioDeviceSelectionDBus } from './audioDeviceSelection.js';
// import * as CtrlAltTab from './ctrlAltTab.js';
// import * as EndSessionDialog from './endSessionDialog.js';
import { ExtensionManager } from './extensionSystem.js';
// import * as ExtensionSystem from './extensionSystem.js';
// import * as ExtensionDownloader from './extensionDownloader.js';
// import * as InputMethod from '../misc/inputMethod.js'
// import * as Introspect from '../misc/introspect.js'
// import * as Keyboard from './keyboard.js';
import { MessageTray } from './messageTray.js';
// import * as ModalDialog from './modalDialog.js';
// import * as OsdWindow from './osdWindow.js';
// import * as OsdMonitorLabeler from './osdMonitorLabeler.js';
// import * as Overview from './overview.js';
// import * as PadOsd from './padOsd.js';
import { Panel } from './panel.js';
// import * as Params from '../misc/params.js'
// import * as RunDialog from './runDialog.js';
// import * as WelcomeDialog from './welcomeDialog.js';
import { LayoutManager } from './layout.js';
// import * as LoginManager from '../misc/loginManager.js'
// import * as LookingGlass from './lookingGlass.js';
import { NotificationDaemon } from './notificationDaemon.js';
// import * as WindowAttentionHandler from './windowAttentionHandler.js';
// import * as Screenshot from './screenshot.js';
// import * as ScreenShield from './screenShield.js';
// import * as Scripting from './scripting.js';
// import * as SessionMode from './sessionMode.js';
// import * as ShellDBus from './shellDBus.js';
// import * as ShellMountOperation from './shellMountOperation.js';
import { WindowManager } from './windowManager.js';
// import * as Magnifier from './magnifier.js';
// import * as XdndHandler from './xdndHandler.js';
// import * as KbdA11yDialog from './kbdA11yDialog.js';
// import * as LocatePointer from './locatePointer.js';
// import * as PointerA11yTimeout from './pointerA11yTimeout.js';
// import * as ParentalControlsManager from '../misc/parentalControlsManager.js'
// import * as Config from '../misc/config.js'
// import * as Util from '../misc/util.js'

export declare const componentManager: ComponentManager;

export declare const extensionManager: ExtensionManager;

export declare const panel: Panel;

export declare const overview: any;

export declare const runDialog: any;

export declare const lookingGlass: any;

export declare const welcomeDialog: any;

export declare const wm: WindowManager;

export declare const messageTray: MessageTray;

export declare const screenShield: any;

export declare const notificationDaemon: NotificationDaemon;

export declare const windowAttentionHandler: any;

export declare const ctrlAltTabManager: any;

export declare const padOsdService: any;

export declare const osdWindowManager: any;

export declare const osdMonitorLabeler: any;

export declare const sessionMode: any;

export declare const screenshotUI: any;

export declare const shellAccessDialogDBusService: AccessDialogDBus;

export declare const shellAudioSelectionDBusService: AudioDeviceSelectionDBus;

export declare const shellDBusService: any;

export declare const shellMountOpDBusService: any;

export declare const screenSaverDBus: any;

export declare const modalCount: any;

export declare const actionMode: Shell.ActionMode.NONE;

export declare const modalActorFocusStack: any[];

export declare const uiGroup: any;

export declare const magnifier: any;

export declare const xdndHandler: any;

export declare const keyboard: any;

export declare const layoutManager: LayoutManager;

export declare const kbdA11yDialog: any;

export declare const inputMethod: any;

export declare const introspectService: any;

export declare const locatePointer: any;

/**
 * pushModal:
 * @param actor: actor which will be given keyboard focus
 * @param params: optional parameters
 *
 * Ensure we are in a mode where all keyboard and mouse input goes to
 * the stage, and focus @actor. Multiple calls to this function act in
 * a stacking fashion; the effect will be undone when an equal number
 * of popModal() invocations have been made.
 *
 * Next, record the current Clutter keyboard focus on a stack. If the
 * modal stack returns to this actor, reset the focus to the actor
 * which was focused at the time pushModal() was invoked.
 *
 * @params may be used to provide the following parameters:
 *  - timestamp: used to associate the call with a specific user initiated
 *               event. If not provided then the value of
 *               global.get_current_time() is assumed.
 *
 *  - options: Meta.ModalOptions flags to indicate that the pointer is
 *             already grabbed
 *
 *  - actionMode: used to set the current Shell.ActionMode to filter
 *                global keybindings; the default of NONE will filter
 *                out all keybindings
 *
 * @returns The grab handle created
 */
export function pushModal(actor: any /* Clutter.Actor */, params?: any): any; /* Clutter.Grab */

/**
 * popModal:
 * @param grab - the grab given by pushModal()
 * @param timestamp - optional timestamp
 *
 * Reverse the effect of pushModal(). If this invocation is undoing
 * the topmost invocation, then the focus will be restored to the
 * previous focus at the time when pushModal() was invoked.
 *
 * @timestamp is optionally used to associate the call with a specific user
 * initiated event. If not provided then the value of
 * global.get_current_time() is assumed.
 */

export function popModal(grab: any /* Clutter.Grab */, timestamp?: number): void;

/**
 * activateWindow:
 * @param {Meta.Window} window: the window to activate
 * @param {number=} time: current event time
 * @param {number=} workspaceNum:  window's workspace number
 *
 * Activates @window, switching to its workspace first if necessary,
 * and switching out of the overview if it's currently active
 */
export function activateWindow(window: any /* Meta.Window */, time?: number, workspaceNum?: number): void;

/**
 * Move @window to the specified monitor and workspace.
 *
 * @param window - the window to move
 * @param monitorIndex - the requested monitor
 * @param workspaceIndex - the requested workspace
 * @param append - create workspace if it doesn't exist
 */
export function moveWindowToMonitorAndWorkspace(window: any /* Meta.Window */, monitorIndex: number, workspaceIndex: number, append: boolean): void;

/**
 * loadTheme:
 *
 * Reloads the theme CSS file
 */

export function loadTheme(): void;

/**
 * notify:
 * @param msg: A message
 * @param details: Additional information
 */

export function notify(msg: string, details?: string): void;

/**
 * notifyError:
 * @param msg: An error message
 * @param details: Additional information
 *
 * See shell_global_notify_problem().
 */

export function notifyError(msg: string, details?: string): void;

export function start(): void;

export function getStyleVariant(): string;

/**
 * Creates an adjustment that has its lower, upper, and value
 * properties set for the number of available workspaces. Consumers
 * of the returned adjustment must only change the 'value' property,
 * and only that.
 *
 * @param actor
 *
 * @returns {St.Adjustment} - an adjustment representing the
 * current workspaces layout
 */

export function createWorkspacesAdjustment(actor: Clutter.Actor): St.Adjustment;

/**
 * getThemeStylesheet:
 *
 * Get the theme CSS file that the shell will load
 *
 * @returns A #GFile that contains the theme CSS,
 *          null if using the default
 */

export function getThemeStylesheet(): Gio.File | null;

/**
 * setThemeStylesheet:
 * @param {string=} cssStylesheet: A file path that contains the theme CSS,
 *     set it to null to use the default
 *
 * Set the theme CSS file that the shell will load
 */

export function setThemeStylesheet(cssStylesheet: string): void;

export function reloadThemeResource(): void;

/**
 * loadTheme:
 *
 * Reloads the theme CSS file
 */
export function loadTheme(): void;

/**
 * @param msg A message
 * @param details Additional information
 */
export function notify(msg: string, details: string): void;

/**
 * See shell_global_notify_problem().
 *
 * @param msg An error message
 * @param details Additional information
 */
export function notifyError(msg: string, details: string): void;

/**
 * Ensure we are in a mode where all keyboard and mouse input goes to
 * the stage, and focus @actor. Multiple calls to this function act in
 * a stacking fashion; the effect will be undone when an equal number
 * of popModal() invocations have been made.
 *
 * Next, record the current Clutter keyboard focus on a stack. If the
 * modal stack returns to this actor, reset the focus to the actor
 * which was focused at the time pushModal() was invoked.
 *
 * `params` may be used to provide the following parameters:
 *  - timestamp: used to associate the call with a specific user initiated
 *               event. If not provided then the value of
 *               global.get_current_time() is assumed.
 *
 *  - options: Meta.ModalOptions flags to indicate that the pointer is
 *             already grabbed
 *
 *  - actionMode: used to set the current Shell.ActionMode to filter
 *                global keybindings; the default of NONE will filter
 *                out all keybindings
 *
 * @param actor Actor which will be given keyboard focus
 * @param params Optional parameters
 * @returns The grab handle created
 */
export function pushModal(actor: Clutter.Actor, params?: any): Clutter.Grab;

/**
 * Reverse the effect of pushModal(). If this invocation is undoing
 * the topmost invocation, then the focus will be restored to the
 * previous focus at the time when pushModal() was invoked.
 *
 * `timestamp` is optionally used to associate the call with a specific user
 * initiated event. If not provided then the value of
 * global.get_current_time() is assumed.
 *
 * @param grab - the grab given by pushModal()
 * @param timestamp - optional timestamp
 */
export function popModal(grab: Clutter.Grab, timestamp?: number): void;

/**
 * Creates the looking glass panel
 *
 * @returns
 */
export function createLookingGlass(): any; // TODO: Replace any with LookingGlass;

/**
 * Opens the run dialog
 */
export function openRunDialog(): void;

export function openWelcomeDialog(): void;

/**
 * activateWindow:
 *
 * @param window the window to activate
 * @param time current event time
 * @param workspaceNum  window's workspace number
 *
 * Activates @window, switching to its workspace first if necessary,
 * and switching out of the overview if it's currently active
 */
export function activateWindow(window: Meta.Window, time?: number, workspaceNum?: number): void;

/**
 * Move @window to the specified monitor and workspace.
 *
 * @param {Meta.Window} window - the window to move
 * @param {number} monitorIndex - the requested monitor
 * @param {number} workspaceIndex - the requested workspace
 * @param {bool} append - create workspace if it doesn't exist
 */
export function moveWindowToMonitorAndWorkspace(window: Meta.Window, monitorIndex: number, workspaceIndex: number, append?: boolean): void;

/**
 * This function sets up a callback to be invoked when either the
 * given actor is mapped, or after some period of time when the machine
 * is idle. This is useful if your actor isn't always visible on the
 * screen (for example, all actors in the overview), and you don't want
 * to consume resources updating if the actor isn't actually going to be
 * displaying to the user.
 *
 * Note that queueDeferredWork is called by default immediately on
 * initialization as well, under the assumption that new actors
 * will need it.
 *
 * @param actor - an actor
 * @param callback - Function to invoke to perform work
 *
 * @returns - A string work identifier
 */
export function initializeDeferredWork(actor: Clutter.Actor, callback: (...args: any[]) => any): string;

/**
 * queueDeferredWork:
 *
 * @param {string} workId work identifier
 *
 * Ensure that the work identified by @workId will be
 * run on map or timeout. You should call this function
 * for example when data being displayed by the actor has
 * changed.
 */
export function queueDeferredWork(workId: string): void;
