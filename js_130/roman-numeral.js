/**
 * 
 * Big picture: converts modern decimal numbers into their Roman number equivalents.
 *  - method: toRoman
 *    - argument: number (integer)
 *    - returns: string representation of a roman numeral
 * 
 * Implementation:
 *  - create conversion table:  I - 1, V - 5, X - 10, L - 50, C - 100, D - 500, M - 1000
 *  - create return value
 *  - grab the largest roman numeral number, 
 *    - augment return value
 *    - reduce decimal
 *    - repeat
 *  - grab the next largest number
 *    - ...
 *    - repeat
 *  - do this until your decimal value is 0
 *  - one less than problem 
 *    - if 4 deep and not largest value, replace with 
 *    - tease this out as I go down the test cases
 *    
 * Edge cases and assumptions:
 *  - largest argument will be 3000
 *  - arguments will be integers > 0
 */

class RomanNumeral {
  static conversionTable = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
  }
  static conversionKeys = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]

  constructor(num){
    this.decimal = num;
  }

  toRoman(){
    let remainder = this.decimal;
    let returnVal = '';
    RomanNumeral.conversionKeys.forEach(key => {
      while((remainder - key) >= 0){
        remainder -= key;
        returnVal += RomanNumeral.conversionTable[key];
      }
    })
    return returnVal;
  }
}

module.exports = RomanNumeral;