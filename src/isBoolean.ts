export function isBoolean(bool: unknown): bool is boolean {
    return typeof bool === 'boolean';
}
