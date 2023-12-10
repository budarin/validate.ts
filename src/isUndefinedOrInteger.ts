import { isInteger } from './isInteger';

export function isUndefinedOrInteger(int: unknown): int is number | undefined {
    return int === undefined || isInteger(int);
}
