import type { ResultOrError } from '@budarin/json-rpc-interface';
import type { EntityGetter, FieldsValidators, AnyObject, LikeExtended } from './types.ts';

import { isObject } from './isObject.js';

export type * from '@budarin/json-rpc-interface';

export const validateEntity = <T>(
    data: unknown,
    fields: FieldsValidators,
    getEntity: EntityGetter<T>,
    entityName: string,
): ResultOrError<T> => {
    if (isObject(data) === false) {
        return {
            error: {
                message: `Сущность "${entityName}" должна быть объектом`,
            },
        };
    }

    const obj = data as AnyObject;
    const keys = Object.keys(fields);

    for (let i = 0; i < keys.length; i++) {
        const fieldName = keys[i] as keyof FieldsValidators;
        const field = fields[fieldName];

        if (field.required === true && obj[fieldName] === undefined) {
            return {
                error: {
                    message: `Свойство "${fieldName}" сущности ${entityName} отсутствует`,
                },
            };
        }

        for (let j = 0; j < field.validators.length; j++) {
            const validator = field.validators[j];

            if (validator[0](obj[fieldName]) === false) {
                return {
                    error: {
                        message: validator[1],
                    },
                };
            }
        }
    }

    return { result: getEntity(obj as LikeExtended<T>) };
};
