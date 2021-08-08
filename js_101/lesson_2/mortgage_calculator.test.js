const mortgageCalculator = require('./mortgage_calculator.js');

test('does mortgage_calculator return correct monthly payment standard input', () => {
  expect(
    mortgageCalculator.findMonthlyPayment(500000, 4.25 / 1200, 360).toFixed(2)
  ).toBe(Number(2459.70).toFixed(2));
});

test('does mortgage_calculator return correct monthly payment short duration high interest', () => {
  expect(
    mortgageCalculator.findMonthlyPayment(500.997, 15 / 1200, 12).toFixed(2)
  ).toBe(Number(45.22).toFixed(2));
});
