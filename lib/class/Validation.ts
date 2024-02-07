import { message, object } from '@stageus/validator';
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

  public run(value: any): {
    valid: boolean;
    messages: {
      field: null | string;
      message: null | string;
    }[];
  } {
    const messages: { field: null | string; message: null | string }[] = [];
    let valid = true;
    if (this.schema instanceof Validator) {
      const result = this.schema.run(value);

      if (!result.valid) {
        valid = false;
        messages.push({
          field: null,
          message: result.message,
        });
      }
    }

    if (this.schema instanceof ArraySchema) {
      const result = object(this.schema).run(value);

      if (!result.valid) {
        valid = false;
        messages.push(...result.reason);
      }
    }

    if (this.schema instanceof ValidateSchema) {
      const result = this.schema.run(value);

      if (!result.valid) {
        valid = false;
        messages.push(...result.reason);
      }
    }

    return { messages, valid };
  }
}
