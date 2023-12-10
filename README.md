# validate.ts

Entities validation utils

## Installation

```bash
yarn add @budarin/validate
```

## Usage

```ts
import type { LikeExtended, FieldsValidators, ValidateEntity } from '@budarin/validate';
import { validateEntity, isIntegerInRange, isStringWithLength } from '@budarin/validate.ts';

type User = {
    name: string;
    age: number;
};

function getUser(obj: LikeExtended<User>): User {
    return {
        name: obj.name,
        age: obj.age,
    };
}

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

const validateUser: ValidateEntity<User> = (data: unknown) => validateEntity(data, userFields, getUser, 'User');

const user = {
    name: 'Ivan',
    age: 30,
    hair: 'brown',
};

const validation = validateUser(user);

if (v.error) {
    console.log(validation.error.message); // => 'The name must be a string between 2 and 50 characters long'
}

console.log(validation.result); // => { name: 'Ivan', age: 30 }
```

## License

MIT
