import { misc, ui } from '../../..';

const { St, GObject } = imports.gi;

const ExtensionUtils = misc.extensionUtils;
const Main = ui.main;
const PanelMenuButton = ui.panelMenu.Button;
const { PopupMenuItem } = ui.popupMenu;

const _ = ExtensionUtils.gettext;
const GETTEXT_DOMAIN = 'my-indicator-extension';

class TIndicator extends PanelMenuButton {
    constructor() {
        super(0.0, _('My Shiny Indicator'));
    }
    _init() {
        super._init(0.0, _('My Shiny Indicator'));

        this.add_child(new St.Icon({
            icon_name: 'face-smile-symbolic',
            style_class: 'system-status-icon',
        }));

        let item = new PopupMenuItem(_('Show Notification'));
        item.connect('activate', () => {
            Main.notify(_('Hello World! :)'));
        });

        this.menu.addMenuItem(item);
    }
}

const Indicator = GObject.registerClass(TIndicator);

class Extension {
    _uuid: string;
    _indicator: TIndicator | null = null;
    constructor(uuid: string) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        Main.panel.remove_child(this._indicator);
        this._indicator?.destroy();
        this._indicator = null;
    }
}

function init(meta: { uuid: string }) {
    return new Extension(meta.uuid);
}