import { validateEntity, isIntegerInRange, isStringWithLength } from '../index.js';
import type { LikeExtended, FieldsValidators, ValidateEntity, LikeType, EntityGetter } from '../types.js';

type User = {
    name: string;
    age: number;
};

const getUser: EntityGetter<User> = (obj: any) => {
    const { name, age } = obj;
    return { name, age };
};

const userFields: FieldsValidators = {
    name: {
        validators: [[isStringWithLength(2, 50), 'The name must be a string between 2 and 50 characters long']],
        required: true,
    },
    age: {
        validators: [[isIntegerInRange(1, 100), 'The age must be an integer from 1 to 100']],
        required: true,
    },
};

const validateUser: ValidateEntity<User> = (data: any) => validateEntity(data, userFields, getUser, 'User');

const user = {
    name: 'Ivan',
    age: 30,
    hair: 'brown',
};

const validation = validateUser(user);

if (validation.error) {
    console.log(validation.error.message); // => 'The name must be a string between 2 and 50 characters long'
}

console.log(validation.result); // => { name: 'Ivan', age: 30 }
