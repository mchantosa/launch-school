/**
 * Big Picture:
 *  class Diamond
 *    - no constructor
 *    - makeDiamond static method:
 *      - argument: letter (test cases all caps)
 *      - return: string to print a diamond
 *        - diamond is n x n
 *        - first line is an A
 *        - horizontally symetrical
 *        - vertically symetrical
 *        - each line ends with a \n
 *        - diamond is not "filled"
 *      - for argument 'A', return is 'A\n'
 *      - firss line is 'A\n'
 *        - Next 'B B\n'
 *        - Next 'C   C\n'
 *        - middle line is argument
 *        - then mirrored decending
 *
 * Implementation:
 *  class Diamond
 *    - static letter Array
 *    - no constructor
 *    - static makeDiamond(letter){}
 *      - define n
 *        - get letterNumber
 *        - n = letterNumer * 2 - 1
 *      - create aggregator
 *      - itterate over letters
 *        - call line creator, push to aggregator
 *      - log aggregator
 *    - lineCreator
 *      - for letter a, create line
 *      - [white space, letter, white space letter, white space, /n]
 *      - [(n-(letternumber-1) -2)/2,
 *          letter
 *          letterNumber-1,
 *          letter,
 *          (n-(letternumber-1) -2),
 *          \n]
 *      - return Diamond joined
 *
 * Boundary conditions, edge cases, assumptions
 *  - arguments will be capital letters from A to Z
 */

class Diamond {
  static LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static getLetter(number) {
    return this.LETTERS[number];
  }

  static getLetterIndex(letter) {
    return this.LETTERS.indexOf(letter);
  }

  static lineCreator(n, letter) {
    if (letter === 'A') return this.lineACreator(n);
    const padC = ' '.repeat(2 * (this.getLetterIndex(letter)) - 1);
    const padLR = ' '.repeat((n - 2 - padC.length) / 2);
    return padLR + letter + padC + letter + padLR + '\n';
  }

  static lineACreator(n) {
    const padLR = ' '.repeat((n - 1) / 2);
    return padLR + 'A' + padLR + '\n';
  }

  static makeDiamond(letter) {
    const endLetterIndex = this.getLetterIndex(letter);
    const n = endLetterIndex * 2 + 1;

    if (letter === 'A') {
      return this.lineCreator(n, 'A');
    }

    let outputString = [];
    for (let i = 0; i <= endLetterIndex; i++) {
      outputString.push(this.lineCreator(n, this.getLetter(i)));
    }
    outputString = [...outputString, ...outputString.reverse().slice(1)];

    return outputString.join('');
  }
}

module.exports = Diamond;