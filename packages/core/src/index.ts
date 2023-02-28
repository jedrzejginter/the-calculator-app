export enum OperatorEnum {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

export enum ActionEnum {
  RESET = 'AC',
  GET_RESULT = '=',
}

export function isOperator(arg: unknown): arg is OperatorEnum {
  return Object.values(OperatorEnum).includes(<any>arg);
}
