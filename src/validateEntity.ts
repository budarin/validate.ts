import type { DeepReadonly, ResultOrError } from '@budarin/json-rpc-interface';
import type { EntityGetter, FieldsValidators, AnyObject, LikeExtended, Like, LikeType } from './types.ts';

import { isObject } from './isObject.js';

export type * from '@budarin/json-rpc-interface';

export const validateEntity = <T>(
    data: unknown,
    fields: FieldsValidators,
    getEntity: EntityGetter<T>,
    entityName: string,
): ResultOrError<T> => {
    const entityIsNotAnObjectError = {
        error: {
            message: `Сущность "${entityName}" должна быть объектом`,
            data,
        },
    };

    if (data === undefined) {
        return entityIsNotAnObjectError;
    }

    if (isObject(data) === false) {
        return entityIsNotAnObjectError;
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
                    data: obj,
                },
            };
        }

        for (let j = 0; j < field.validators.length; j++) {
            const validator = field.validators[j];

            if (validator[0](obj[fieldName]) === false) {
                return {
                    error: {
                        message: validator[1],
                        data: obj,
                    },
                };
            }
        }
    }

    return { result: getEntity(obj) as DeepReadonly<LikeType<T>> };
};
