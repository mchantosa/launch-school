/* 
1. Greet user
2. Ask the user for the first number.
3. Ask the user for the second number.
4. Ask the user for an operation to perform.
5. Perform the operation on the two numbers.
6. Print the result to the terminal.
*/

const readline = require('readline-sync');

console.log('Welcome to Calculator!');

let number1 = readline.question("What's the first number?\n");
let number2 = readline.question("What's the second number?\n");
let operation = readline.question("What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n");

let output;
if (operation === '1') { 
  output = Number(number1) + Number(number2);
} else if (operation === '2') {
  output = Number(number1) - Number(number2);
} else if (operation === '3') {
  output = Number(number1) * Number(number2);
} else if (operation === '4') {
  output = Number(number1) / Number(number2);
} 

console.log(`The result is: ${output}`);