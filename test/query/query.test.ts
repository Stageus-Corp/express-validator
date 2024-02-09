import { describe, expect, jest, test } from '@jest/globals';
import { validate } from '../../lib/util/validate';
import { array, message, object } from '@stageus/validator';
import { query } from '../../lib/util/query';

describe('body test ( Success )', () => {
  test('1 - query test', () => {
    const req: any = {
      query: {},
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page').default(1).isNumber(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.query).toStrictEqual({
      page: 1,
    });
  });

  test('2 - query test', () => {
    const req: any = {
      query: undefined,
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page').default(1).isNumber(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.query).toStrictEqual({
      page: 1,
    });
  });

  test('3 - query test', () => {
    const req: any = {
      query: null,
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page').default(1).isNumber(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.query).toStrictEqual({
      page: 1,
    });
  });

  test('4 - query test', () => {
    const req: any = {
      query: 'null',
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page').default(1).isNumber(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.query).toStrictEqual({
      page: 1,
    });
  });

  test('5 - query test', () => {
    const req: any = {
      query: 0,
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page').default(1).isNumber(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.query).toStrictEqual({
      page: 1,
    });
  });

  test('6 - query test', () => {
    const req: any = {
      query: {
        name: {
          list: ['1', '2', '3'],
        },
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        name: {
          list: array(message().isNumber()),
        },
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.query).toStrictEqual({
      name: {
        list: [1, 2, 3],
      },
    });
  });
});

describe('body test ( Fail )', () => {
  test('1 - query test', () => {
    const req: any = {
      query: {
        page: '-1',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page')
          .default(1)
          .isNumber()
          .isInt()
          .range({ min: 1 }),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
      })
    );
  });

  test('1 - query test', () => {
    const req: any = {
      query: {
        page: null,
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      query({
        page: message('invalid page').isNumber().isInt().range({ min: 1 }),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
      })
    );
  });
});
