import type { Validator } from './types.ts';

import { isInteger } from './isInteger.js';

export function isIntegerInRange(min: number, max: number): Validator {
    return (value: unknown) => {
        const int = Number(value);
        return isInteger(int) && (int as number) >= min && (int as number) <= max;
    };
}
