export function isStringFromList(list: string[]) {
    return (s: unknown): boolean => {
        if (typeof s !== 'string') {
            return false;
        }

        const str = s.trim();
        return list.includes(str);
    };
}
