import {
  ArraySchema,
  ObjectSchema,
  Validator,
  message,
  object,
} from '@stageus/validator';
import { ExpressValidation } from '../../types/Validation';

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
    public readonly schema: Validator | ArraySchema | ObjectSchema
  ) {}

  private getFieldName() {
    if (this.fieldName) {
      return this.name + '.' + this.fieldName;
    }

    return this.name;
  }

  public run(value: any): ExpressValidation.RunResult {
    const bodyObjectSchema = object(this.schema);

    const result = bodyObjectSchema.run(value, this.getFieldName());

    return {
      valid: result.valid,
      messages: result.reason || [],
      value: result.value,
    };
  }
}
