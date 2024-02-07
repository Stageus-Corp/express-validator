import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ValidateSchema } from '@stageus/validator/dist/class/schema/ValidateSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';

export class Validation {
  constructor(
    public readonly fieldName: string | null,

    /**
     * Express Request type method name
     *
     * @example body params query
     */
    public readonly name: 'body' | 'params' | 'query',

    /**
     * validate schema or Validator
     */
    public readonly schema: Validator | ArraySchema | ValidateSchema
  ) {}
}
