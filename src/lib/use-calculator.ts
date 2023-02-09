import { MouseEvent, useState } from 'react';
import { performCalculation } from './calculation';

type State = {
  displayValue: string;
  operator: string | null;
  operand: string | null;
};

const initialState: State = {
  displayValue: '0',
  operator: null,
  operand: null,
};

export function useCalculator() {
  const [state, setState] = useState<State>(initialState);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const { value } = evt.currentTarget;

    switch (value) {
      case 'AC': {
        setState(initialState);
        break;
      }
      case '+':
      case '-':
      case '*':
      case '/': {
        setState((prevState) => ({
          operator: value,
          operand: prevState.displayValue,
          displayValue: '0',
        }));
        break;
      }
      case '=': {
        const { operand, operator, displayValue } = state;

        if (operand === null || operator === null) {
          break;
        }

        const result = performCalculation({ operand, operator, displayValue });

        setState({
          displayValue: result,
          operator: null,
          operand: null,
        });
        break;
      }
      default: {
        if (['0', 'Error'].includes(state.displayValue)) {
          setState((prevState) => ({
            ...prevState,
            displayValue: value,
          }));
          break;
        }

        setState((prevState) => ({
          ...state,
          displayValue: prevState.displayValue + value,
        }));
      }
    }
  };

  return {
    displayValue: state.displayValue,
    operator: state.operator,
    operand: state.operand,
    handleClick,
  };
}
