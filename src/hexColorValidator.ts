import type { Validator } from './types.js';

import { isHexColor } from './isHexColor.js';
import { mustBeHexString } from './mustBeHexString.js';

export const hexColorvalidator = (entityName: string): [Validator, string] => [isHexColor, mustBeHexString(entityName)];
