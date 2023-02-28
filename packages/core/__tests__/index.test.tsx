import { isOperator, OperatorEnum } from '../src/index';

describe('isOperator', () => {
  it('returns false if value passed is not an operator', async () => {
    expect(isOperator('foo')).toBe(false);
  });

  it('returns true if value passed is an operator', async () => {
    expect(isOperator(OperatorEnum.DIVIDE)).toBe(true);
  });
});
