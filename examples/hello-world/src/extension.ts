import '@girs/gjs'; // For global types like `log()`
import St from '@girs/st-14';
import GObject from '@girs/gobject-2.0';

import "@girs/gnome-shell/extensions/global"; // For global shell types
import { Extension, gettext as _ } from '@girs/gnome-shell/extensions/extension';
import * as panelMenu from '@girs/gnome-shell/ui/panelMenu';
import { PopupMenuItem } from '@girs/gnome-shell/ui/popupMenu';
import * as Main from '@girs/gnome-shell/ui/main';

import * as test from '@girs/gnome-shell/extensions';

const PanelMenuButton = panelMenu.Button;

class TIndicator extends PanelMenuButton {
    constructor() {
        super(0.0, _('My Shiny Indicator'));
    }
    _init() {
        super._init(0.0, _('My Shiny Indicator'));

        this.add_child(new St.Icon({
            iconName: 'face-smile-symbolic',
            styleClass: 'system-status-icon',
        }));

        let item = new PopupMenuItem(_('Show Notification'));
        item.connect('activate', () => {
            Main.notify(_('Hello %s! :)').format("World"));
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
        log(`enabled test ${typeof test.extension.gettext}`);
    }

    disable() {
        Main.panel.remove_child(this._indicator);
        this._indicator?.destroy();
        this._indicator = null;
    }
}
