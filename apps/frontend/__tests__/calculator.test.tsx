import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ActionEnum, OperatorEnum } from '@workspace/core';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import Page from '../src/pages/index';

export const server = setupServer(
  rest.post('http://0.0.0.0:3001/calculate', async (req, res, ctx) => {
    const body = await req.json();
    const a = Number(body.operand);
    const b = Number(body.value);

    let result: number | undefined;

    switch (body.operator) {
      case OperatorEnum.ADD: {
        result = a + b;
        break;
      }
      case OperatorEnum.SUBTRACT: {
        result = a - b;
        break;
      }
      case OperatorEnum.MULTIPLY: {
        result = a * b;
        break;
      }
      case OperatorEnum.DIVIDE: {
        result = a / b;
        break;
      }
    }

    return res(
      ctx.json({
        status: 'success',
        result,
      }),
    );
  }),
);

class ClickEvent extends MouseEvent {
  constructor() {
    super('click', {
      bubbles: true,
      cancelable: true,
    });
  }
}

describe('Calculator', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays user input', async () => {
    render(<Page />);

    const oneButton = screen.getByRole('button', { name: '1' });
    const twoButton = screen.getByRole('button', { name: '2' });
    const threeButton = screen.getByRole('button', { name: '3' });
    const display = screen.getByRole('combobox');

    expect(oneButton).toBeInTheDocument();
    expect(twoButton).toBeInTheDocument();
    expect(threeButton).toBeInTheDocument();
    expect(display).toBeInTheDocument();

    fireEvent(oneButton, new ClickEvent());
    fireEvent(twoButton, new ClickEvent());
    fireEvent(threeButton, new ClickEvent());

    expect(display).toHaveTextContent('123');
  });

  it('calls backend and displays the result', async () => {
    render(<Page />);

    const oneButton = screen.getByRole('button', { name: '1' });
    const twoButton = screen.getByRole('button', { name: '2' });
    const addButton = screen.getByRole('button', { name: OperatorEnum.ADD });
    const equalButton = screen.getByRole('button', { name: ActionEnum.GET_RESULT });
    const display = screen.getByRole('combobox');

    expect(oneButton).toBeInTheDocument();
    expect(twoButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(equalButton).toBeInTheDocument();
    expect(display).toBeInTheDocument();

    fireEvent(oneButton, new ClickEvent());
    fireEvent(addButton, new ClickEvent());
    fireEvent(twoButton, new ClickEvent());
    fireEvent(equalButton, new ClickEvent());

    await waitFor(() => {
      expect(display).toHaveTextContent('3');
    });
  });
});
