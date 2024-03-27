export function isInteger(value: unknown): boolean {
    const int = Number(value);
    return typeof int === 'number' && Number.isInteger(int);
}
