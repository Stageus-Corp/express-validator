import { message, object } from '@stageus/validator';
import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ObjectSchema } from '@stageus/validator/dist/class/schema/ObjectSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';
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
    const messages: { field: string; message: string }[] = [];
    let valid = true;

    const bodyObjectSchema = object(this.schema);

    const result = bodyObjectSchema.run(value, this.getFieldName());

    return {
      valid: result.valid,
      messages: result.reason || [],
      value: result.value,
    };

    // Valdiator
    // if (this.schema instanceof Validator) {
    //   const result = this.schema.run(value);

    //   if (!result.valid) {
    //     valid = false;
    //     messages.push({
    //       field: null,
    //       message: result.message,
    //     });
    //   } else {
    //     value = result.value;
    //   }
    // }

    // // ArraySchema
    // if (this.schema instanceof ArraySchema) {
    //   const result = object(this.schema).run(value);

    //   if (!result.valid) {
    //     valid = false;
    //     messages.push(...(result.reason || []));
    //   } else {
    //     value = result.value;
    //   }
    // }

    // // ObjectSchema
    // if (this.schema instanceof ObjectSchema) {
    //   const result = this.schema.run(value);

    //   if (!result.valid) {
    //     valid = false;
    //     messages.push(...(result.reason || []));
    //   } else {
    //     value = result.value;
    //   }
    // }
  }
}
