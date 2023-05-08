import "@girs/gjs";

export * from './types/index.js';

import * as DbusUtils from './misc/dbusUtils.js';
import * as ExtensionUtils from './misc/extensionUtils.js';
import * as FileUtils from './misc/fileUtils.js';
import * as GnomeSession from './misc/gnomeSession.js';
import * as ParentalControlsManager from './misc/parentalControlsManager.js';
import * as Signals from './misc/signals.js';

// TODO: https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js/misc
export declare const misc: {
    dbusUtils: typeof DbusUtils;
    extensionUtils: typeof ExtensionUtils;
    fileUtils: typeof FileUtils;
    gnomeSession: typeof GnomeSession;
    history: any;
    ibusManager: any;
    inputMethod: any;
    introspect: any;
    jsParse: any;
    keyboardManager: any;
    loginManager: any;
    modemManager: any;
    objectManager: any;
    params: any;
    parentalControlsManager: typeof ParentalControlsManager;
    permissionStore: any;
    signalTracker: any;
    signals: typeof Signals;
    smartcardManager: any;
    systemActions: any;
    util: any;
    weather: any;
}
import * as Components from './ui/components/index.js';
import * as AccessDialog from './ui/accessDialog.js';
import * as AltTab from './ui/altTab.js';
import * as Animation from './ui/animation.js';
import * as AppDisplay from './ui/appDisplay.js';
import * as AppFavorites from './ui/appFavorites.js';
import * as AppMenu from './ui/appMenu.js';
import * as AudioDeviceSelection from './ui/audioDeviceSelection.js';
import * as Background from './ui/background.js';
import * as BackgroundMenu from './ui/backgroundMenu.js';
import * as BarLevel from './ui/barLevel.js';
import * as Boxpointer from './ui/boxpointer.js';
import * as Calendar from './ui/calendar.js';
import * as CheckBox from './ui/checkBox.js';
import * as CloseDialog from './ui/closeDialog.js';
import * as Dialog from './ui/dialog.js';
import * as DnD from './ui/dnd.js';
import * as IconGrid from './ui/iconGrid.js';
import * as Layout from './ui/layout.js';
import * as Main from './ui/main.js';
import * as MessageList from './ui/messageList.js';
import * as MessageTray from './ui/messageTray.js';
import * as ModalDialog from './ui/modalDialog.js';
import * as Mpris from './ui/mpris.js';
import * as NotificationDaemon from './ui/notificationDaemon.js';
import * as Panel from './ui/panel.js';
import * as PanelMenu from './ui/panelMenu.js';
import * as PopupMenu from './ui/popupMenu.js';
import * as Ripples from './ui/ripples.js';
import * as Search from './ui/search.js';
import * as SwitcherPopup from './ui/switcherPopup.js';
import * as UserWidget from './ui/userWidget.js';

// TODO: https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js/ui
export declare const ui: {
    components: typeof Components,
    status: any,
    accessDialog: typeof AccessDialog,
    altTab: typeof AltTab,
    animation: typeof Animation,
    appDisplay: typeof AppDisplay,
    appFavorites: typeof AppFavorites,
    appMenu: typeof AppMenu,
    audioDeviceSelection: typeof AudioDeviceSelection,
    background: typeof Background,
    backgroundMenu: typeof BackgroundMenu,
    barLevel: typeof BarLevel,
    boxpointer: typeof Boxpointer,
    calendar: typeof Calendar,
    checkBox: typeof CheckBox,
    closeDialog: typeof CloseDialog,
    ctrlAltTab: any,
    dash: any,
    dateMenu: any,
    dialog: typeof Dialog,
    dnd: typeof DnD,
    edgeDragAction: any,
    endSessionDialog: any,
    environment: any,
    extensionDownloader: any,
    extensionSystem: any,
    focusCaretTracker: any,
    grabHelper: any,
    ibusCandidatePopup: any,
    iconGrid: typeof IconGrid,
    inhibitShortcutsDialog: any,
    init: any,
    kbdA11yDialog: any,
    keyboard: any,
    layout: typeof Layout,
    lightbox: any,
    locatePointer: any,
    lookingGlass: any,
    magnifier: any,
    main: typeof Main,
    messageList: typeof MessageList,
    messageTray: typeof MessageTray,
    modalDialog: typeof ModalDialog,
    mpris: typeof Mpris,
    notificationDaemon: typeof NotificationDaemon,
    osdMonitorLabeler: any,
    osdWindow: any,
    overview: any,
    overviewControls: any,
    padOsd: any,
    pageIndicators: any,
    panel: typeof Panel,
    panelMenu: typeof PanelMenu,
    pointerA11yTimeout: any,
    pointerWatcher: any,
    popupMenu: typeof PopupMenu,
    quickSettings: any,
    remoteSearch: any,
    ripples: typeof Ripples,
    runDialog: any,
    screenShield: any,
    screenshot: any,
    scripting: any,
    search: typeof Search,
    searchController: any,
    sessionMode: any,
    shellDBus: any,
    shellEntry: any,
    shellMountOperation: any,
    slider: any,
    swipeTracker: any,
    switchMonitor: any,
    switcherPopup: typeof SwitcherPopup,
    unlockDialog: any,
    userWidget: typeof UserWidget,
    welcomeDialog: any,
    windowAttentionHandler: any,
    windowManager: any,
    windowMenu: any,
    windowPreview: any,
    workspace: any,
    workspaceAnimation: any,
    workspaceSwitcherPopup: any,
    workspaceThumbnail: any,
    workspacesView: any,
    xdndHandler: any,
}

declare const GnomeShell: {
    misc: typeof misc,
    ui: typeof ui,
}

export default GnomeShell