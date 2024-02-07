import { ValidateSchema } from '@stageus/validator/dist/class/schema/ValidateSchema';
import { Validation } from './Validation';
import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';

export class Body extends Validation {
  constructor(
    fieldName: string | null,
    schema: Validator | ArraySchema | ValidateSchema
  ) {
    super(fieldName, 'body', schema);
  }
}
