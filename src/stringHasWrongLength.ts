export const stringHasWrongLength = (
    entytyName: string,
    fieldName: string,
    min: number,
    max: number,
): string =>
    `Свойство сущности ${entytyName} "${fieldName}" должно быть строкой длиной от ${min} до ${max} символов`;
