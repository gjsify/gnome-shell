import type Shell from '@girs/shell-51';
import type Meta from '@girs/meta-51';

/**
 * @since 46
 */
export class WindowPreview extends Shell.WindowPreview {
    _addWindow(_: Meta.Window): void;
    _windowActor: Meta.WindowActor;
}
