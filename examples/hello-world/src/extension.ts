import '@girs/gjs'; // For global types like `log()`
import St from '@girs/st-17';

import '@girs/gnome-shell/extensions/global'; // For global shell types
import { Extension, gettext as _, type ConsoleLike } from '@girs/gnome-shell/extensions/extension';
import PanelMenu from '@girs/gnome-shell/ui/panelMenu';
import * as Main from '@girs/gnome-shell/ui/main';

export default class ExampleExtension extends Extension {
    private _indicator: PanelMenu.Button | null = null;
    private _console: ConsoleLike | null = null;

    override enable() {
        if (this._indicator !== null) {
            return;
        }

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

        this._console = this.getLogger();
        this._console?.log('Hello from the example extension');
    }

    override disable() {
        this._indicator?.destroy();
        this._indicator = null;
        this._console = null;
    }
}
