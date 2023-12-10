import type { Validator } from './types.ts';

import { isHexColor } from './isHexColor.js';
import { mustBeHexString } from './mustBeHexString.js';

export const hexColorvalidator = (entityName: string): [Validator, string] => [isHexColor, mustBeHexString(entityName)];
