/**
 * Big picture:
 *  Class: SumOfMultipliers
 *    static coefficients: [3, 5]
 *    contructor:
 *      arguments: variable args (numbers- integers > 0)
 *      coefficients: [variable args]
 *    to(number) method static:
 *      arguments: number (integer > 0)
 *      return: sum of multiples of coefficients
 *    to(number) method non static:
 *      arguments: number (integer > 0)
 *      return: sum of multiples of coefficients

 * Implementation:
 *  - to(number):
 *    - create coefficient multiplier aggregate []
 *    - iterate over coefficients
 *      - for each coefficient, push to a vector of multiples < number
 *    - return reduce by summing
 *
 * Boundary values, edge cases, assumptions
 *  - arguments and "the number" will be integers > 0
 *  - 1, answer = 0
 *  - number < multipliers, answer = 0
 *  - what if coefficients have redunant multipliers? gaurantee uniqueness
 */

class SumOfMultiples {

  constructor(...coefficients) {
    this.coefficients = (coefficients.length > 0) ? coefficients : [3, 5];
  }

  to(number) {
    const multipliers = [];
    this.coefficients.forEach(a => {
      let index = 1;
      while (true) {
        const nextMultiplier = a * index;
        if (nextMultiplier < number) {
          if (!multipliers.includes(nextMultiplier)) {
            multipliers.push(nextMultiplier);
          }
          index++;
        } else break;
      }
    });
    return multipliers.reduce((a, b) => a + b, 0);
  }

  static to(number) {
    return new SumOfMultiples().to(number);
  }
}

module.exports = SumOfMultiples;