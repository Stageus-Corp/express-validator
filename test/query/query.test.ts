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
});
