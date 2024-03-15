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

    if (isObject(data) === false) {
        return entityIsNotAnObjectError;
    }

    const obj = getEntity(data);

    if (obj === undefined) {
        return entityIsNotAnObjectError;
    }

    const keys = Object.keys(fields);

    for (let i = 0; i < keys.length; i++) {
        const fieldName = keys[i] as keyof FieldsValidators;
        const field = fields[fieldName];

        if (field.required === true && (obj as AnyObject)[fieldName] === undefined) {
            return {
                error: {
                    message: `Свойство "${fieldName}" сущности ${entityName} отсутствует`,
                    data,
                },
            };
        }

        for (let j = 0; j < field.validators.length; j++) {
            const validator = field.validators[j];

            if (validator[0]((obj as AnyObject)[fieldName]) === false) {
                return {
                    error: {
                        message: validator[1],
                        data,
                    },
                };
            }
        }
    }

    return { result: obj as DeepReadonly<T> };
};
