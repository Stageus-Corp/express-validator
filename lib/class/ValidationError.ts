import { ValidateSchema } from '@stageus/validator/types/ValidateShema';

export class ValidationError {
  constructor(
    public status: number,
    public messages: ValidateSchema.Reason[]
  ) {}
}
