'use strict';

/**
 * Big picture:
 *  Class Octal
 *    - constructor
 *      - argument: string (octal in string format)
 *    - toDecimal method
 *      - argument: none
 *      - return: number (decimal conversion of string octal)
 *
 * Implementation:
 *  - check string validity
 *    - return 0 if invalid
 *  - convert to decimal
 *    - get coefficients for 8^n s
 *    - do a multiplication summation of coefficients * 8^ns
 *    - return the sum of the resulting multiplications
 *
 * Boundary values, edge cases, and assumptions:
 *  - octal characters should be  from {0, 1, 2, 3, 4, 5, 6, 7}
 *  - invalid arguments should return 0
 *  - negative numbers? No
 *  - decimals? No
 *  - commas? No
 *  - white space? No
 */

class Octal {

  constructor(strOctal) {
    this.octal = strOctal;
  }

  toDecimal() {
    if (!this.isValid(this.octal)) return 0;
    return this.generateCoefficients().reduce((acc, arr) => {
      return acc + arr[0] * arr[1];
    }, 0);
  }

  isValid() {
    return (this.octal.replace(/[01234567]/g, '').length === 0);
  }

  generateCoefficients() {
    const coefficientVector = [];
    const len = this.octal.length;
    [...this.octal].forEach((number, index) => {
      coefficientVector.push([parseInt(number), Math.pow(8, (len - index - 1))]);
    });
    console.log(coefficientVector);
    return coefficientVector;
  }
}

module.exports = Octal;
