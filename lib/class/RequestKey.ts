import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ValidateSchema } from '@stageus/validator/dist/class/schema/ValidateSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';

export class RequestKey {
  constructor(
    public readonly fieldName: string | null,

    /**
     * Express Request type method name
     *
     * @example body params query
     */
    public readonly name: 'body' | 'params' | 'query',
    public readonly schema: Validator | ArraySchema | ValidateSchema
  ) {}
}
