import { isBoolean } from './isBoolean.js';

export function isUndefinedOrBoolean(bool: unknown): boolean {
    return bool === undefined || isBoolean(bool);
}
