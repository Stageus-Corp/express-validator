import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ObjectSchema } from '@stageus/validator/dist/class/schema/ObjectSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';
import { Body } from '../class/Body';

export const body = <
  T extends string | ArraySchema | ObjectSchema | Validator | object
>(
  fieldName: T,
  ...arg: T extends string
    ? [schema: ArraySchema | ObjectSchema | Validator | object]
    : []
): Body => {
  if (typeof fieldName === 'string' && arg[0]) {
    return new Body(fieldName, arg[0]);
  }

  return new Body(null, fieldName as ArraySchema | ObjectSchema | Validator);
};
