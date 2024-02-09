import { ValidateSchema } from '@stageus/validator/types/ValidateShema';

export namespace ExpressValidation {
  export interface RunResult<T = any> {
    valid: boolean;
    messages: ValidateSchema.Reason[];
    value: T;
  }
}
