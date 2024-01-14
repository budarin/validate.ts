export function isStringFromList(list: string[]) {
    return (str: string): boolean => {
        return list.includes(str);
    };
}
