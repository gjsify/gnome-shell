import '@girs/gjs'; // For global types like `log()`
import St from '@girs/st-14';

import "@girs/gnome-shell/extensions/global"; // For global shell types
import { Extension, gettext as _ } from '@girs/gnome-shell/extensions/extension';
import PanelMenu from '@girs/gnome-shell/ui/panelMenu';
import * as Main from '@girs/gnome-shell/ui/main';

export default class ExampleExtension extends Extension {

    _indicator: PanelMenu.Button;

    enable() {
        // Create a panel button
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);

        // Add an icon
        const icon = new St.Icon({
            iconName: 'face-laugh-symbolic',
            styleClass: 'system-status-icon',
        });
        this._indicator.add_child(icon);

        // Add the indicator to the panel
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}