import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ObjectSchema } from '@stageus/validator/dist/class/schema/ObjectSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';
import { Params } from '../class/Params';

export const params = <
  T extends string | ArraySchema | ObjectSchema | Validator | object
>(
  fieldName: T,
  ...arg: T extends string
    ? [schema: ArraySchema | ObjectSchema | Validator | object]
    : []
): Params => {
  if (typeof fieldName === 'string' && arg[0]) {
    return new Params(fieldName, arg[0]);
  }

  return new Params(null, fieldName as ArraySchema | ObjectSchema | Validator);
};
