import type Shell from '@girs/shell-17';
import type Meta from '@girs/meta-17';

/**
 * @version 46
 */
export class WindowPreview extends Shell.WindowPreview {
    _addWindow(_: Meta.Window): void;
    _windowActor: Meta.WindowActor;
}
