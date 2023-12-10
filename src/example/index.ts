import { validateEntity } from '../validateEntity';
import { isIntegerInRange } from '../isIntegerInRange';
import { isStringWithLength } from '../isStringWithLength';
import { LikeExtended, FieldsValidators, ValidateEntity } from '../types';

type User = {
    name: string;
    age: number;
};

function getEntity(obj: LikeExtended<User>): User {
    return {
        name: obj.name,
        age: obj.age,
    };
}

const userFields: FieldsValidators = {
    name: {
        validators: [[isStringWithLength(3, 50), 'Имя должно быть строкой длиной от 3 до 50 символов']],
        required: true,
    },
    age: {
        validators: [[isIntegerInRange(16, 100), 'Возраст должен быть целым числом от 16 до 100']],
        required: true,
    },
};

const userValidator: ValidateEntity<User> = (data: unknown) => validateEntity(data, userFields, getEntity, 'User');

const user = {
    name: 'Ivan',
    age: 30,
    hair: 'brown',
};

const Ivan = userValidator(user);

if (Ivan.error) {
    console.log(Ivan.error.message); // => 'Имя должно быть строкой длиной от 3 до 50 символов'
}

console.log(Ivan); // => { result: { name: 'Ivan', age: 30 } }
