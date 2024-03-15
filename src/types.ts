import type { DeepReadonly, ResultOrError } from '@budarin/json-rpc-interface';

export type LikeType<T> = {
    [K in keyof T]: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Validator = (...args: any[]) => boolean;

export type ValidateEntity<T> = (data: any) => ResultOrError<T>;
export type EntityGetter<T> = (obj: any) => LikeType<T>;

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
