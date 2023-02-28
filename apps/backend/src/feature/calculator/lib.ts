import { OperatorEnum } from '@workspace/core';

export function calculate(input: {
  value: string;
  operator: OperatorEnum;
  operand: string;
}): number | Error {
  const valueAsNumber: number = parseFloat(input.value);
  const operandAsNumber: number = parseFloat(input.operand);

  switch (input.operator) {
    case OperatorEnum.ADD: {
      return operandAsNumber + valueAsNumber;
    }
    case OperatorEnum.SUBTRACT: {
      return operandAsNumber - valueAsNumber;
    }
    case OperatorEnum.MULTIPLY: {
      return operandAsNumber * valueAsNumber;
    }
    case OperatorEnum.DIVIDE: {
      if (parseFloat(input.value) === 0) {
        return new Error('DIVISION_BY_0');
      }

      return operandAsNumber / valueAsNumber;
    }
    default: {
      return new Error('UNKNOWN_OPERATOR');
    }
  }
}
