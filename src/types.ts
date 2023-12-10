import type { DeepReadonly, ResultOrError } from '@budarin/json-rpc-interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Validator = (...args: any[]) => boolean;

export type ValidateEntity<T> = (data: unknown) => ResultOrError<T>;
export type EntityGetter<T> = (obj: LikeExtended<T>) => DeepReadonly<T>;

export type FieldsValidators = {
    [key: string]: {
        validators: [Validator, string][];
        required?: boolean;
    };
};

export type LikePartial<T> = Partial<T>;
export type LikeExtended<T> = T & Partial<Record<string | number, unknown>>;
export type Like<T> = T | (T & Partial<Record<string | number, unknown>>) | Partial<T>;
export type AnyObject = Record<string, unknown>;
