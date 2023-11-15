import St from '@girs/st-13';
import GObject from '@girs/gobject-2.0';

import { Extension, gettext as _ } from '@girs/gnome-shell/extensions/extension';
import * as panelMenu from '@girs/gnome-shell/ui/panelMenu';
import { PopupMenuItem } from '@girs/gnome-shell/ui/popupMenu';
import * as Main from '@girs/gnome-shell/ui/main';

const PanelMenuButton = panelMenu.Button;

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

export default class HelloWorldExtension extends Extension {

    _indicator: TIndicator | null = null;

    enable() {
        log(`enabling ${JSON.stringify(this.metadata, null, 2)}`);
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        Main.panel.remove_child(this._indicator);
        this._indicator?.destroy();
        this._indicator = null;
    }
}
