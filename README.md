# validate.ts

Entities validation utils

## Installation

```bash
yarn add @budarin/validate
```

## Usage

```ts
import { validateEntity } from '@budarin/validate.ts';
import { isIntegerInRange } from '@budarin/validate/isIntegerInRange';
import { isStringWithLength } from '@budarin/validate/isStringWithLength';

import type { LikeExtended, FieldsValidators, ValidateEntity } from '@budarin/validate';

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
        validators: [[isStringWithLength(2, 50), 'The name must be a string between 2 and 50 characters long']],
        required: true,
    },
    age: {
        validators: [[isIntegerInRange(1, 100), 'The age must be an integer from 1 to 100']],
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
    console.log(Ivan.error.message); // => 'The name must be a string between 2 and 50 characters long'
}

console.log(Ivan); // => { result: { name: 'Ivan', age: 30 } }
```

## License

MIT
