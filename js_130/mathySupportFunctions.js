let numbers = [];

function square(value) {
  return value * value;
}

function getNumbers() {
  return [...numbers];
}

module.exports = {numbers, square, getNumbers};