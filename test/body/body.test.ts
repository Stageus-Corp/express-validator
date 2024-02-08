import { describe, expect, jest, test } from '@jest/globals';
import { validate } from '../../lib/util/validate';
import { array, message, object } from '@stageus/validator';
import { body } from '../../lib/util/body';
import { ValidateSchema } from '@stageus/validator/types/ValidateShema';

describe('body test ( Success )', () => {
  test('1 - body test', () => {
    const req: any = {
      body: {
        email: 'abc123@xx.xx',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        email: message('invalid email').isString().isEmail(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  test('2 - body test', () => {
    const req: any = {
      body: {
        email: 'abc123@xx.xx',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([body('email', message('invalid email').isString().isEmail())])(
      req,
      res,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  test('3 - body test', () => {
    const req: any = {
      body: {
        email: 'abc123@xx.xx',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body(object({ email: message('invalid email').isString().isEmail() })),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});

describe('body test ( Fail )', () => {
  test('1 - body test ( Fail )', () => {
    const req: any = {
      body: {
        email: 'abc123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        email: message('invalid email').isString().isEmail(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.any(Array),
        status: 400,
      })
    );
  });

  test('2 - body test ( Fail )', () => {
    const req: any = {
      body: {
        email: 'abc123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body(
        object({
          email: message('invalid email').isString().isEmail(),
        })
      ),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.any(Array),
        status: 400,
      })
    );
  });

  test('3 - body test ( Fail )', () => {
    const req: any = {
      body: {
        email: 'abc123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        email: message('invalid email').isString().isEmail(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.any(Array),
        status: 400,
      })
    );
  });
});

describe('body message test', () => {
  test('1 - body message test', () => {
    const req: any = {
      body: {
        email: 'abc123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body(object({ email: message('invalid email').isString().isEmail() })),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        messages: expect.any(Array),
      })
    );

    const errorArg: any = next.mock.calls[0][0];
    expect(errorArg.messages[0].field).toBe('body.email');
  });

  test('2 - body message test', () => {
    const req: any = {
      body: {
        email: 'abc123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body(object({ email: message('invalid email').isString().isEmail() })),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        messages: expect.any(Array),
      })
    );

    const errorArg: any = next.mock.calls[0][0];
    expect(errorArg.messages[0].field).toBe('body.email');
  });

  test('3 - body message test', () => {
    const req: any = {
      body: {},
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        depth1: {
          depth2: {
            email: message('invalid email').isString().isEmail(),
          },
        },
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        messages: expect.any(Array),
      })
    );

    const errorArg: any = next.mock.calls[0][0];
    expect(errorArg.messages[0].field).toBe('body.depth1.depth2.email');
  });

  test('4 - body message test', () => {
    const req: any = {
      body: {},
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        depth1: {
          numberList: array(message().isNumber()),
        },
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        messages: expect.any(Array),
      })
    );

    const errorArg: any = next.mock.calls[0][0];
    expect(errorArg.messages[0].field).toBe('body.depth1.numberList');
  });

  test('5 - body message test', () => {
    const req: any = {
      body: {
        depth1: {
          numberList: [null],
        },
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        depth1: {
          numberList: array(
            object({
              numberList: message().isNumber(),
            })
          ),
        },
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        messages: expect.any(Array),
      })
    );

    const errorArg: any = next.mock.calls[0][0];

    console.log(errorArg);
    expect(errorArg.messages[0].field).toBe('body.depth1.numberList');
  });
});
