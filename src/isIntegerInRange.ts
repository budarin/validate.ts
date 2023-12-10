import type { Validator } from './types';

import { isInteger } from './isInteger';

export function isIntegerInRange(min: number, max: number): Validator {
    return (int: unknown) => isInteger(int) && (int as number) >= min && (int as number) <= max;
}
