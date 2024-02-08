import { object } from '@stageus/validator';
import { Validation } from './Validation';
import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ObjectSchema } from '@stageus/validator/dist/class/schema/ObjectSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';

export class Body extends Validation {
  constructor(
    fieldName: string | null,
    schema: Validator | ArraySchema | ObjectSchema | object
  ) {
    if (typeof schema === 'object') {
      super(fieldName, 'body', object(schema));
      return;
    }

    super(fieldName, 'body', schema);
  }
}
