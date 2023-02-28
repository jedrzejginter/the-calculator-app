import { ActionEnum, OperatorEnum, isOperator } from '@workspace/core';
import { MouseEvent, useRef, useState } from 'react';

import { StateKind } from '../constants';

type State = {
  readonly kind: StateKind;
  readonly value: string;
  readonly operator: string | null;
  readonly operand: string | null;
};

const initialState: State = Object.freeze({
  kind: StateKind.READY,
  value: '0',
  operator: null,
  operand: null,
});

export function useCalculator() {
  const [state, setState] = useState<State>(initialState);
  const fetchController = useRef<AbortController>();

  const fetchResult = async (input: { operand: string; operator: OperatorEnum; value: string }) => {
    fetchController.current?.abort();

    try {
      fetchController.current = new AbortController();

      setState((prevState) => ({ ...prevState, kind: StateKind.LOADING }));

      const response = await fetch(`http://0.0.0.0:3001/calculate`, {
        method: 'POST',
        body: JSON.stringify(input),
        signal: fetchController.current.signal,
        headers: {
          'content-type': 'application/json',
        },
      });

      // Add artificial delay so we don't have the ui
      // flickering when we quickly change the state from loading
      // to ready/error.
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!String(response.status).startsWith('2')) {
        throw new Error('Calculation Error');
      }

      const json: { result: string } = await response.json();

      setState({
        kind: StateKind.READY,
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
    const clickedValue = evt.currentTarget.value;

    switch (clickedValue) {
      case OperatorEnum.ADD:
      case OperatorEnum.SUBTRACT:
      case OperatorEnum.MULTIPLY:
      case OperatorEnum.DIVIDE: {
        setState((prevState) => ({
          kind: StateKind.READY,
          operand: prevState.value,
          operator: clickedValue,
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

        await fetchResult({ operand, operator, value });

        break;
      }
      default: {
        setState((prevState) => {
          if (state.kind === StateKind.ERROR) {
            return {
              kind: StateKind.READY,
              operand: null,
              operator: null,
              value: clickedValue,
            };
          }

          if (state.value === '0') {
            return {
              ...prevState,
              kind: StateKind.READY,
              value: clickedValue,
            };
          }

          return {
            ...state,
            value: prevState.value + clickedValue,
          };
        });
      }
    }
  };

  return {
    state: state.kind,
    displayValue: state.kind === StateKind.ERROR ? 'Error' : state.value,
    operator: state.operator,
    operand: state.operand,
    handleClick,
  };
}
