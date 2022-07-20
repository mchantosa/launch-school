/**
 * Big picture:
 *  - Class: PerfectNumber:
 *    - constructor:
 *      - no arguemnts
 *    - static method: classify
 *      - argument: number (integer >= 0)
 *      - return: string ('perfect', 'deficient', or 'abundant')
 *
 * Implementation:
 *  - vet argument
 *  - get divisors
 *  - sum and compare to argument
 *
 * Boundary conditions, edge cases, and assumptions:
 *  - 0: throws an error
 *  - 1: throws an error because 1 is it's only divosor and it isn't
 *       supposed to include itself as a divisor
 *  - non integers: throws an error
 *  - infinity: throws an error
 *  - negative numbers: throw an error
 */

class PerfectNumber {

  static classify(number) {
    if (number <= 1 || !Number.isInteger(number)) throw ('not a valid number');
    const sum = this.generateDivisors(number).reduce((a, b) => a + b);
    if (sum === number) return 'perfect';
    else if (sum < number) return 'deficient';
    else return 'abundant';
  }

  static generateDivisors(number) {
    const n = Math.floor(Math.sqrt(number));
    const divisors = [1];
    for (let i = 2; i <= n; i++) {
      if ((number % i) === 0) {
        divisors.push(i);
        divisors.push(number / i);
      }
    }
    return divisors;
  }
}

module.exports = PerfectNumber;
