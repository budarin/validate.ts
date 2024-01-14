export function mustBeStingFromList(entityName: string, fieldName: string): string {
    return `Свойство сущности ${entityName} "${fieldName}" должно быть значением из списка`;
}
