import { MouseEvent, useRef, useState } from 'react';
import { ActionEnum, OperatorEnum, isOperator } from '@workspace/core';

enum StateKind {
  LOADING = 'loading',
  ERROR = 'error',
  NEUTRAL = 'neutral',
}

type State = {
  readonly kind: StateKind;
  readonly value: string;
  readonly operator: string | null;
  readonly operand: string | null;
};

const initialState: State = Object.freeze({
  kind: StateKind.NEUTRAL,
  value: '0',
  operator: null,
  operand: null,
});

export function useCalculator() {
  const [state, setState] = useState<State>(initialState);
  const fetchController = useRef<AbortController>();

  const apiCall = async (input: { operand: string; operator: OperatorEnum; value: string }) => {
    fetchController.current?.abort();

    try {
      fetchController.current = new AbortController();

      const response = await fetch(`http://0.0.0.0:3001/calculate`, {
        method: 'POST',
        body: JSON.stringify(input),
        signal: fetchController.current.signal,
        headers: {
          'content-type': 'application/json',
        },
      });

      const json: { result: string } = await response.json();

      setState({
        kind: StateKind.NEUTRAL,
        value: json.result,
        operator: null,
        operand: null,
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      setState({
        kind: StateKind.ERROR,
        value: '0',
        operator: null,
        operand: null,
      });
    }
  };

  const handleClick = async (evt: MouseEvent<HTMLButtonElement>) => {
    const { value } = evt.currentTarget;

    switch (value) {
      case OperatorEnum.ADD:
      case OperatorEnum.SUBTRACT:
      case OperatorEnum.MULTIPLY:
      case OperatorEnum.DIVIDE: {
        setState((prevState) => ({
          kind: StateKind.NEUTRAL,
          operand: prevState.value,
          operator: value,
          value: '0',
        }));
        break;
      }
      case ActionEnum.RESET: {
        setState(initialState);
        break;
      }
      case ActionEnum.GET_RESULT: {
        const { operand, operator, value } = state;

        if (operand === null || !isOperator(operator)) {
          break;
        }

        await apiCall({ operand, operator, value });

        break;
      }
      default: {
        setState((prevState) => {
          if (state.kind === StateKind.ERROR) {
            return {
              kind: StateKind.NEUTRAL,
              operand: null,
              operator: null,
              value,
            };
          }

          if (state.value === '0') {
            return {
              ...prevState,
              kind: StateKind.NEUTRAL,
              value,
            };
          }

          return {
            ...state,
            value: prevState.value + value,
          };
        });
      }
    }
  };

  return {
    displayValue: state.value,
    operator: state.operator,
    operand: state.operand,
    handleClick,
  };
}
