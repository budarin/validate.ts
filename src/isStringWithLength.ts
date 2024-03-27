import type { Validator } from './types.ts';

export function isStringWithLength(min: number, max = 65536): Validator {
    return (s: string) => {
        const str = String(s).trim();
        return str.length >= min && str.length <= max;
    };
}
