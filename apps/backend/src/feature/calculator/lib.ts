import { OperatorEnum } from '@workspace/core';

export function calculate(input: {
  value: number;
  operator: OperatorEnum;
  operand: number;
}): number | Error {
  switch (input.operator) {
    case OperatorEnum.ADD: {
      return input.operand + input.value;
    }
    case OperatorEnum.SUBTRACT: {
      return input.operand - input.value;
    }
    case OperatorEnum.MULTIPLY: {
      return input.operand * input.value;
    }
    case OperatorEnum.DIVIDE: {
      if (input.value === 0) {
        return new Error('DIVISION_BY_0');
      }

      return input.operand / input.value;
    }
    default: {
      return new Error('UNKNOWN_OPERATOR');
    }
  }
}
