import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like .toHaveValue()
import Calculator from '../Calculator';

describe('Calculator Logic', () => {
  const getByTextInCalculator = (text) => screen.getByRole('button', { name: text });
  const getDisplay = () => screen.getByRole('textbox'); // Material UI TextField is a textbox

  test('should display initial value of 0', () => {
    render(<Calculator />);
    expect(getDisplay()).toHaveValue('0');
  });

  test('should input digits correctly', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('3'));
    expect(getDisplay()).toHaveValue('123');
  });

  test('should handle decimal input', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('.'));
    fireEvent.click(getByTextInCalculator('5'));
    expect(getDisplay()).toHaveValue('1.5');
  });

  test('should not allow multiple decimals', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('.'));
    fireEvent.click(getByTextInCalculator('5'));
    fireEvent.click(getByTextInCalculator('.')); // Second decimal
    expect(getDisplay()).toHaveValue('1.5');
  });

  test('should clear the display', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('C'));
    expect(getDisplay()).toHaveValue('0');
  });

  test('should perform addition: 2 + 3 = 5', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('3'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('5');
  });

  test('should perform subtraction: 5 - 2 = 3', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('5'));
    fireEvent.click(getByTextInCalculator('-'));
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('3');
  });

  test('should perform multiplication: 3 * 4 = 12', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('3'));
    fireEvent.click(getByTextInCalculator('*'));
    fireEvent.click(getByTextInCalculator('4'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('12');
  });

  test('should perform division: 8 / 2 = 4', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('8'));
    fireEvent.click(getByTextInCalculator('/'));
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('4');
  });

  test('should handle division by zero', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('5'));
    fireEvent.click(getByTextInCalculator('/'));
    fireEvent.click(getByTextInCalculator('0'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('Error');
  });

  test('should chain operations: 1 + 2 + 3 = 6', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('+')); // This should calculate 1+2 first
    fireEvent.click(getByTextInCalculator('3'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('6');
  });

  test('should allow new calculation after an error', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('5'));
    fireEvent.click(getByTextInCalculator('/'));
    fireEvent.click(getByTextInCalculator('0'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('Error');

    fireEvent.click(getByTextInCalculator('C')); // Clear
    fireEvent.click(getByTextInCalculator('7'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('3'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('10');
  });

  test('should allow starting a new number after an operation', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('2')); // Display shows '2'
    expect(getDisplay()).toHaveValue('2');
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('3');
  });

   test('pressing an operator after another operator should update the operator', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('5'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('*')); // Change operator
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('10'); // 5 * 2 = 10
  });

  test('pressing equals multiple times should not change the result', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('3'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('5');
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('5');
  });

  test('inputting a number after pressing equals should start a new calculation', () => {
    render(<Calculator />);
    fireEvent.click(getByTextInCalculator('1'));
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('2'));
    fireEvent.click(getByTextInCalculator('=')); // 1 + 2 = 3
    expect(getDisplay()).toHaveValue('3');
    fireEvent.click(getByTextInCalculator('4')); // Start new number
    expect(getDisplay()).toHaveValue('4');
    fireEvent.click(getByTextInCalculator('+'));
    fireEvent.click(getByTextInCalculator('5'));
    fireEvent.click(getByTextInCalculator('='));
    expect(getDisplay()).toHaveValue('9'); // 4 + 5 = 9
  });

});

describe('Calculator UI Rendering', () => {
  const getByTextInCalculator = (text) => screen.getByRole('button', { name: text });
  const getDisplay = () => screen.getByRole('textbox');

  test('should render display', () => {
    render(<Calculator />);
    expect(getDisplay()).toBeInTheDocument();
  });

  test('should render digit buttons', () => {
    render(<Calculator />);
    for (let i = 0; i <= 9; i++) {
      expect(getByTextInCalculator(String(i))).toBeInTheDocument();
    }
  });

  test('should render operation buttons', () => {
    render(<Calculator />);
    expect(getByTextInCalculator('/')).toBeInTheDocument();
    expect(getByTextInCalculator('*')).toBeInTheDocument();
    expect(getByTextInCalculator('-')).toBeInTheDocument();
    expect(getByTextInCalculator('+')).toBeInTheDocument();
    expect(getByTextInCalculator('=')).toBeInTheDocument();
  });

  test('should render clear button', () => {
    render(<Calculator />);
    expect(getByTextInCalculator('C')).toBeInTheDocument();
  });

  test('should render decimal button', () => {
    render(<Calculator />);
    expect(getByTextInCalculator('.')).toBeInTheDocument();
  });
});
