export function isInteger(int: unknown): boolean {
    return typeof int === 'number' && Number.isInteger(int);
}
