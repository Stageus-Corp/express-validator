import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ObjectSchema } from '@stageus/validator/dist/class/schema/ObjectSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';
import { Query } from '../class/Query';

export const query = <
  T extends string | ArraySchema | ObjectSchema | Validator | object
>(
  fieldName: T,
  ...arg: T extends string
    ? [schema: ArraySchema | ObjectSchema | Validator | object]
    : []
): Query => {
  if (typeof fieldName === 'string' && arg[0]) {
    return new Query(fieldName, arg[0]);
  }

  return new Query(null, fieldName as ArraySchema | ObjectSchema | Validator);
};
