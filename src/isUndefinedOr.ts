import { Validator } from './types.js';

export function isUndefinedOr(validator: Validator) {
    return (val: unknown) => {
        if (val === undefined) {
            return true;
        }
        return validator(val);
    };
}
