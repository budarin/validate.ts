import { isBoolean } from './isBoolean';

export function isUndefinedOrBoolean(bool: unknown): boolean {
    return bool === undefined || isBoolean(bool);
}
