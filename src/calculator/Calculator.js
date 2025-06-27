import React, { useState } from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (waitingForOperand) {
      // If waiting for an operand (e.g., after an operator or after equals)
      // a new digit press means we start a new number.
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
      // If the previous action was an equals (operation is null),
      // then this new digit starts a completely new calculation, so clear previousValue.
      if (operation === null) {
        setPreviousValue(null);
      }
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    // If an operation is pending and the user presses another operator
    // update the operation without calculating immediately.
    if (operation && waitingForOperand && nextOperation) {
      setOperation(nextOperation);
      // If previousValue is null (e.g. after pressing C then an operator),
      // set it to current display value before new operator
      if (previousValue === null) {
        setPreviousValue(inputValue);
      }
      return;
    }

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue;
      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          if (inputValue === 0) {
            setDisplayValue('Error');
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
            return;
          }
          newValue = currentValue / inputValue;
          break;
        default:
          return;
      }
      setPreviousValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEqualClick = () => {
    if (operation && previousValue !== null) {
      performOperation(null); // Perform the final operation
      // Keep previousValue for potential chained operations, operation is cleared
      setWaitingForOperand(true); // Ready for new input or operation
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttonLayout = [
    { value: '7', handler: () => handleDigitClick(7), size: 3, color: "primary" },
    { value: '8', handler: () => handleDigitClick(8), size: 3, color: "primary" },
    { value: '9', handler: () => handleDigitClick(9), size: 3, color: "primary" },
    { value: '/', handler: () => performOperation('/'), size: 3, color: "warning" },
    { value: '4', handler: () => handleDigitClick(4), size: 3, color: "primary" },
    { value: '5', handler: () => handleDigitClick(5), size: 3, color: "primary" },
    { value: '6', handler: () => handleDigitClick(6), size: 3, color: "primary" },
    { value: '*', handler: () => performOperation('*'), size: 3, color: "warning" },
    { value: '1', handler: () => handleDigitClick(1), size: 3, color: "primary" },
    { value: '2', handler: () => handleDigitClick(2), size: 3, color: "primary" },
    { value: '3', handler: () => handleDigitClick(3), size: 3, color: "primary" },
    { value: '-', handler: () => performOperation('-'), size: 3, color: "warning" },
    { value: '0', handler: () => handleDigitClick(0), size: 3, color: "primary" },
    { value: '.', handler: handleDecimalClick, size: 3, color: "primary" },
    { value: '=', handler: handleEqualClick, size: 3, color: "success" },
    { value: '+', handler: () => performOperation('+'), size: 3, color: "warning" },
    { value: 'C', handler: handleClearClick, size: 12, color: "error" },
  ];

  return (
    <Box sx={{
      width: 300, // Adjusted width for better fit with potential padding/margins
      maxWidth: '100%', // Ensure it's responsive
      margin: 'auto',
      marginTop: 4,
      padding: 2,
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <TextField
        fullWidth
        variant="outlined"
        value={displayValue}
        disabled
        inputProps={{ style: { textAlign: 'right', fontSize: '2em' } }} // Increased font size
        sx={{ marginBottom: 2 }}
      />
      <Grid container spacing={1}>
        {buttonLayout.map((btn) => (
          <Grid xs={btn.size} key={btn.value}> {/* Removed item prop, used btn.size for xs */}
            <Button
              variant="contained"
              color={btn.color || 'primary'}
              fullWidth
              onClick={btn.handler}
              sx={{height: '60px', fontSize: '1.2em'}} // Made buttons taller and text larger
            >
              {btn.value}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calculator;
