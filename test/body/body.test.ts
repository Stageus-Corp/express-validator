import { describe, expect, jest, test } from '@jest/globals';
import { validate } from '../../lib/util/validate';
import { array, message, object } from '@stageus/validator';
import { body } from '../../lib/util/body';

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

  test('4 - body test', () => {
    const req: any = {
      body: {
        email: 'abc123@xx.xx',
        fileList: [
          {
            name: '123.png',
            ext: 'png',
          },
          {
            name: '345.png',
            ext: 'png',
          },
          {
            name: '789.png',
            ext: 'png',
          },
        ],
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body(
        object({
          email: message('invalid email').isString().isEmail(),
          fileList: array({
            name: message('invalid file name').isString(),
            ext: message('invalid file ext').isString(),
          }),
        })
      ),
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

  test('4 - body test ( Fail )', () => {
    const req: any = {
      body: {
        email: 'abc123@xx.xx',
        fileList: [
          {
            name: null,
            ext: 'png',
          },
          {
            name: '345.png',
            ext: 'png',
          },
          {
            name: '789.png',
            ext: 'png',
          },
        ],
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body(
        object({
          email: message('invalid email').isString().isEmail(),
          fileList: array({
            name: message('invalid file name').isString(),
            ext: message('invalid file ext').isString(),
          }),
        })
      ),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
      })
    );
  });

  test('5 - body test ( Fail )', () => {
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
          numberList: array({
            numberList: message().isNumber(),
          }),
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

    expect(errorArg.messages[0].field).toBe(
      'body.depth1.numberList[0].numberList'
    );
  });

  test('6 - body message test', () => {
    const req: any = {
      body: {
        email: {
          depth1: {
            numberList: [null],
          },
        },
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body('email', {
        depth1: {
          numberList: array({
            numberList: message().isNumber(),
          }),
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

    expect(errorArg.messages[0].field).toBe(
      'body.email.depth1.numberList[0].numberList'
    );
  });
});

describe('body trasnform test', () => {
  test('1 - body trasnform test', () => {
    const req: any = {
      body: {
        number: '123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        number: message().isString().toInt(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).toStrictEqual({
      number: 123,
    });
  });

  test('2 - body transform test', () => {
    const req: any = {
      body: {
        number: '123',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      body({
        number: message().isString().split(''),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).toStrictEqual({
      number: expect.any(Array),
    });
  });
});
