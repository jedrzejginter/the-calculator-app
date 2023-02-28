import { ActionEnum, OperatorEnum } from '@workspace/core';
import type { MouseEvent } from 'react';

import { StateKind } from '../constants';

type UseCalculator = () => {
  state: StateKind;
  displayValue: string | number;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

type Props = {
  useCalculator: UseCalculator;
};

export function Calculator({ useCalculator }: Props) {
  const calculator = useCalculator();

  return (
    <div className="calculator">
      <div className="display" role="combobox" aria-expanded={false}>
        {calculator.state === StateKind.LOADING ? 'Wait...' : calculator.displayValue}
      </div>
      <div className="buttons">
        {[
          ActionEnum.RESET,
          '7',
          '8',
          '9',
          OperatorEnum.DIVIDE,
          '4',
          '5',
          '6',
          OperatorEnum.MULTIPLY,
          '1',
          '2',
          '3',
          OperatorEnum.SUBTRACT,
          '0',
          '.',
          ActionEnum.GET_RESULT,
          OperatorEnum.ADD,
        ].map((keyboardItem) => (
          <button
            key={keyboardItem}
            className="button"
            onClick={calculator.handleClick}
            type="button"
            value={keyboardItem}
          >
            {keyboardItem}
          </button>
        ))}
      </div>
    </div>
  );
}
