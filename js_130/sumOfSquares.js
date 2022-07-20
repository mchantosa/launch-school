const {square, getNumbers} = require('./mathySupportFunctions.js');

function sumOfSquares() {
  return getNumbers().reduce((sum, number) => {
    return square(number) + sum;
  });
}

module.exports = sumOfSquares;