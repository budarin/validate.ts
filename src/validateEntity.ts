import type { DeepReadonly, ResultOrError } from '@budarin/json-rpc-interface';
import type { EntityGetter, FieldsValidators, AnyObject, LikeExtended, Like } from './types.ts';

import { isObject } from './isObject.js';

export type * from '@budarin/json-rpc-interface';

export const validateEntity = <T>(
    data: unknown,
    fields: FieldsValidators,
    getEntity: EntityGetter<Like<T>>,
    entityName: string,
): ResultOrError<Like<T>> => {
    if (isObject(data) === false) {
        return {
            error: {
                message: `Сущность "${entityName}" должна быть объектом`,
                data,
            },
        };
    }

    const obj = getEntity(data as LikeExtended<T>) as AnyObject;
    const keys = Object.keys(fields);

    for (let i = 0; i < keys.length; i++) {
        const fieldName = keys[i] as keyof FieldsValidators;
        const field = fields[fieldName];

        if (field.required === true && obj[fieldName] === undefined) {
            return {
                error: {
                    message: `Свойство "${fieldName}" сущности ${entityName} отсутствует`,
                    data,
                },
            };
        }

        for (let j = 0; j < field.validators.length; j++) {
            const validator = field.validators[j];

            if (validator[0](obj[fieldName]) === false) {
                return {
                    error: {
                        message: validator[1],
                        data,
                    },
                };
            }
        }
    }

    return { result: obj as DeepReadonly<Like<T>> };
};
