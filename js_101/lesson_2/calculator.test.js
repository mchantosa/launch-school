beforeEach(() => {
  jest.resetModules();
});

test('does calculator welcome user', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  jest.mock('readline-sync', () => ({question:() => '1'}));
  const sum = require('./calculator.js');
  expect(console.log).toHaveBeenCalledWith('Welcome to Calculator!')
  });

test('does calculator add', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  jest.mock('readline-sync', () => {
    return{
      question: (prompt) => {
        switch (prompt) {
          case "What's the first number?\n": return '1000';
          case "What's the second number?\n": return '.001';
          case "What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n": return '1';
        }
      } 
    }
  })
  const sum = require('./calculator.js');
  expect(console.log).toHaveBeenLastCalledWith(`The result is: 1000.001`)
});

test('does calculator subtract', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  jest.mock('readline-sync', () => {
    return{
      question: (prompt) => {
        switch (prompt) {
          case "What's the first number?\n": return '1';
          case "What's the second number?\n": return '5';
          case "What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n": return '2';
        }
      } 
    }
  })
  const sum = require('./calculator.js');
  expect(console.log).toHaveBeenLastCalledWith('The result is: -4')
});

test('does calculator multiply', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  jest.mock('readline-sync', () => {
    return{
      question: (prompt) => {
        switch (prompt) {
          case "What's the first number?\n": return '-1';
          case "What's the second number?\n": return '-1';
          case "What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n": return '3';
        }
      } 
    }
  })
  const sum = require('./calculator.js');
  expect(console.log).toHaveBeenLastCalledWith('The result is: 1')
});

test('does calculator divide', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  jest.mock('readline-sync', () => {
    return{
      question: (prompt) => {
        switch (prompt) {
          case "What's the first number?\n": return '1';
          case "What's the second number?\n": return 'Infinity';
          case "What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n": return '4';
        }
      } 
    }
  })
  const sum = require('./calculator.js');
  expect(console.log).toHaveBeenLastCalledWith('The result is: 0')
});