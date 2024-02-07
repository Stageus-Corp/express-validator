import { array, message, object } from '@stageus/validator';
import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { ValidateSchema } from '@stageus/validator/dist/class/schema/ValidateSchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';
import { Validation } from './class/Validation';
import { RequestHandler } from 'express';
import { Body } from './class/Body';

const validate = (validationList: Validation[]): RequestHandler => {
  return (req, res, next) => {
    let valid = true;
    const messages = [];

    for (const validation of validationList) {
      if (validation instanceof Body) {
        let value = req.body;

        if (validation.fieldName) {
          value = value[validation.fieldName];
        }

        const result = validation.run(value);

        if (!result.valid) {
          messages.push(...result.messages);
        }
      }
    }

    if (!valid) {
      return next({
        status: 400,
        messages,
      });
    }

    next();
  };
};

const req: any = {
  body: {
    email: 1,
  },
};

function body<T extends string | ArraySchema | ValidateSchema | Validator>(
  fieldName: T,
  ...arg: T extends string
    ? [schema: ArraySchema | ValidateSchema | Validator]
    : []
) {}

body('name', message().isString());
body('email', message().isString().isEmail());
body(
  object({
    name: message().isString(),
    email: message().isString().isEmail(),
  })
);
body('name');
body('email', message().isString().isEmail(), message().isString());

object({
  email: message().isString().isEmail(),
  pw: 123,
}).r;
