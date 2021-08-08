/*
  - Greet user
  - Ask the user for the first number.
  - Ask the user for the second number.
  - Ask the user for an operation to perform.
  - Perform the operation on the two numbers.
  - Print the result to the terminal.
  - Ask user if they would like to perform another operation
  - Say goodbye
*/

const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json').en;
calculator();

function calculator() {
  prompt(MESSAGES.welcome);
  let performCalculation = true;
  while (performCalculation) {
    let number1 = getOperand(`=> ${MESSAGES.requestNumber1}\n`);
    let number2 = getOperand(`=> ${MESSAGES.requestNumber2}\n`);
    let operation = getOperation(`=> ${MESSAGES.requestOperation}`);
    let output = operateAddSumMultiplyDivide(number1, number2, operation);
    prompt(`${MESSAGES.outputReturn}${output}`);
    performCalculation = recompute(`=> ${MESSAGES.requestAnotherCalculation}`);
  }
  prompt(MESSAGES.goodbye);
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function getOperand (message) {
  let number = readline.question(message);
  while (invalidNumber(number)) {
    prompt(MESSAGES.inValidInput);
    number = readline.question(message);
  }
  return Number(number);
}

function invalidNumber(number) {
  return Number.isNaN(Number(number)) || number.trimStart() === '';
}

function getOperation (message) {
  let operation = readline.question(message);
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MESSAGES.choose1_4);
    operation = readline.question(message);
  }
  return operation;
}

function operateAddSumMultiplyDivide(number1, number2, operation) {
  let output;
  switch (operation) {
    case '1': {
      output = number1 + number2;
      break;
    }
    case '2': {
      output = number1 - number2;
      break;
    }
    case '3': {
      output = number1 * number2;
      break;
    }
    case '4': {
      output = number1 / number2;
      break;
    }
  }
  return output;
}

function recompute(message) {
  let response = readline.question(message);
  while (!['1', '2'].includes(response)) {
    prompt(MESSAGES.choose1_2);
    response = readline.question(message);
  }
  return response === '1';
}