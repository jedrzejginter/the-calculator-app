import type { MouseEvent } from 'react';

type UseCalculator = () => {
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
      <div className="display">{calculator.displayValue}</div>
      <div className="buttons">
        {['AC', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(
          (keyboardItem) => (
            <button
              key={keyboardItem}
              className="button"
              onClick={calculator.handleClick}
              type="button"
              value={keyboardItem}
            >
              {keyboardItem}
            </button>
          ),
        )}
      </div>
    </div>
  );
}