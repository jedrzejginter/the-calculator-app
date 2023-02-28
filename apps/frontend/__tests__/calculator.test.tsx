import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Page from '../src/pages/index';

class ClickEvent extends MouseEvent {
  constructor() {
    super('click', {
      bubbles: true,
      cancelable: true,
    });
  }
}

describe('Calculator', () => {
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
});
