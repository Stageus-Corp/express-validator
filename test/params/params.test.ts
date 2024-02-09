import { describe, expect, jest, test } from '@jest/globals';
import { validate } from '../../lib/util/validate';
import { message } from '@stageus/validator';
import { params } from '../../lib/util/params';

describe('params test ( Success )', () => {
  test('1 - params test', () => {
    const req: any = {
      params: {
        idx: '1',
      },
    };
    const res: any = {};
    const next = jest.fn();

    validate([
      params({
        page: message('invalid page').default(1).isNumber(),
      }),
    ])(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.params).toStrictEqual({
      page: 1,
    });
  });
});
