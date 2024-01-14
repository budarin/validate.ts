export function mustBeISOString(entityName: string, fieldName: string): string {
    return `Свойство сущности ${entityName} "${fieldName}" должно быть ISO строкой`;
}
