import { RequestHandler } from 'express';
import { Body } from '../class/Body';
import { Validation } from '../class/Validation';
import { Query } from '../class/Query';

export const validate = (validationList: Validation[]): RequestHandler => {
  return (req, res, next) => {
    let valid = true;
    const messages = [];

    for (const validation of validationList) {
      let value: any = null;
      if (validation instanceof Body) {
        value = req.body;
      }

      if (validation instanceof Query) {
        value = req.query;
      }

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
        req[validation.name][validation.fieldName] = result.value;
      } else {
        req[validation.name] = result.value;
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
