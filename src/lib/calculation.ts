export function performCalculation(input: {
  displayValue: string;
  operator: string;
  operand: string;
}) {
  let newValue: string | number = input.displayValue;

  const valueAsNumber: number = parseFloat(input.displayValue);
  const operandAsNumber: number = parseFloat(input.operand);

  switch (input.operator) {
    case '+': {
      newValue = operandAsNumber + valueAsNumber;
      break;
    }
    case '-': {
      newValue = operandAsNumber - valueAsNumber;
      break;
    }
    case '*': {
      newValue = operandAsNumber * valueAsNumber;
      break;
    }
    case '/': {
      if (parseFloat(input.displayValue) === 0) {
        newValue = 'Error';
        break;
      }

      newValue = operandAsNumber / valueAsNumber;
      break;
    }
    default: {
      alert(`Unknown operator: ${input.operator}`);
    }
  }

  return newValue.toString();
}
