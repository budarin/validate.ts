import { isInteger } from './isInteger.js';

export function isUndefinedOrInteger(int: unknown): int is number | undefined {
    return int === undefined || isInteger(int);
}
