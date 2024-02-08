import { RequestHandler } from 'express';
import { Body } from '../class/Body';
import { Validation } from '../class/Validation';

export const validate = (validationList: Validation[]): RequestHandler => {
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
          valid = false;
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

    if (!valid) {
      return next({
        status: 400,
        messages,
      });
    }

    next();
  };
};
