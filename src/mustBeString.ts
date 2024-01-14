export function mustBeString(entityName: string, fieldName: string): string {
    return `Свойство сущности ${entityName} "${fieldName}" должно быть строкой`;
}
