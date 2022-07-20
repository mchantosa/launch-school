'use strict';

/**
 * Big picture:
 *  Class Series
 *    -Constructor(str):
 *      - argument: str (representation of a sequence of numbers)
 *        - no seperators
 *        - string can begin with 0
 *        - 0-9
 *    - slices(num) method:
 *      - argument: number,
 *      - return: arr (array of arrays of numbers)
 *        -  new Big picture('198').slices(2) returns [[1,9],[9,8]]
 *
 * Implementation:
 *  class BigPicture
 *    - this.numString = str
 *    - slices method:
 *      - vet arg and throw error if necessary
 *      - initialize collector array
 *      - itterate over this.series
 *        - slice, convert, split, push
 *
 * Boundary values, edge cases, and assumptions:
 *  - slices arg: integer >= 1
 *  - constructor arg: a string number with no seperators
 *  - can start with 0 (also can be missing 8 and 9)
 *  - don't worry about throwing an error, test cases stay in happy path
 *  - if slice arg > constructor arg, throw an error
 */

class BigPicture {
  constructor(str) {
    this.numString = str;
  }

  slices(num) {
    this.validateSeriesLength(num);

    const series = [];
    for (let i = 0; i < this.numString.length + 1 - num; i++) {
      series.push(
        this.numString.slice(i,i + num)
          .split('')
          .map(strNum => parseInt(strNum))
      );
    }

    return series;
  }

  validateSeriesLength(num) {
    if (num > this.numString.length) {
      throw ('argument must be greater than series length');
    }
  }
}

module.exports = BigPicture;