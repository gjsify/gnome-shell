import type Shell from '@girs/shell-18';
import type Meta from '@girs/meta-18';

/**
 * @version 46
 */
export class WindowPreview extends Shell.WindowPreview {
    _addWindow(_: Meta.Window): void;
    _windowActor: Meta.WindowActor;
}
