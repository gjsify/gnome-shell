import type Clutter from '@girs/clutter-15';
import type Meta from '@girs/meta-15';

import { WindowPreview } from './windowPreview.js';

/**
 * @version 46
 */
export class Workspace extends Clutter.Actor {
    _addWindowClone(metaWindow: Meta.Window): WindowPreview;
    _removeWindowClone(metaWin: Meta.Window): WindowPreview | null;
    _windows: WindowPreview[];
}
