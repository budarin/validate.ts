import type { Validator } from './types.js';

export function isStringWithLength(min: number, max = 65536): Validator {
    return (str: unknown) => typeof str === 'string' && str.length >= min && str.length <= max;
}
