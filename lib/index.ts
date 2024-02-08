import { message, object } from '@stageus/validator';
import { ArraySchema } from '@stageus/validator/dist/class/schema/ArraySchema';
import { Validator } from '@stageus/validator/dist/class/validate/Validator';
import { Validation } from './class/Validation';
import { RequestHandler } from 'express';
import { Body } from './class/Body';
import { ObjectSchema } from '@stageus/validator/dist/class/schema/ObjectSchema';

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
          continue;
        }

        if (validation.fieldName) {
          req.body[validation.fieldName] = result.value;
        } else {
          req.body = result.value;
        }
      }
    }

    console.log(valid, messages);
    console.log(req.body);

    if (!valid) {
      return next({
        status: 400,
        messages,
      });
    }

    next();
  };
};

function body<
  T extends string | ArraySchema | ObjectSchema | Validator | object
>(
  fieldName: T,
  ...arg: T extends string
    ? [schema: ArraySchema | ObjectSchema | Validator | object]
    : []
): Body {
  if (typeof fieldName === 'string' && arg[0]) {
    return new Body(fieldName, arg[0]);
  }

  return new Body(null, fieldName as ArraySchema | ObjectSchema | Validator);
}

const res: any = {};

const req: any = {
  body: {
    email: 'abc123@',
  },
};

const next: any = () => {};

validate([
  body('email', message('이메일이 유효하지 않습니다.').isString().isEmail()),
])(req, res, next);

validate([
  body({ email: message('이메일이 유효하지 않습니다.').isString().isEmail() }),
])(req, res, next);

validate([
  body(
    object({
      email: message('이메일이 유효하지 않습니다.').isString().isEmail(),
    })
  ),
])(req, res, next);
