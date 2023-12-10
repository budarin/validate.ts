export function mustBeUndefinedOrInt(entityName: string, fieldName: string): string {
    return `Свойство сущности ${entityName} "${fieldName}" должно быть undefined или целым числом`;
}
