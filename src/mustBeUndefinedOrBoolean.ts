export function mustBeUndefinedOrBoolean(entityName: string, fieldName: string): string {
    return `Свойство сущности ${entityName} "${fieldName}" должно быть undefined или boolean`;
}
