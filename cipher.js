'use strict';

class Cipher {
  static LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  static LETTERS_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static encodeLetter(letter) {
    if (letter === letter.toLowerCase()) {
      return this.LETTERS[(this.LETTERS.indexOf(letter) + 13) % 26];
    } else {
      return this.LETTERS_UPPER_CASE[
        (this.LETTERS_UPPER_CASE.indexOf(letter) + 13) % 26
      ];
    }

  }

  static encode(str) {
    let encodedStr = [...str].map((letter) => {
      if (this.LETTERS.includes(letter.toLowerCase())) {
        return this.encodeLetter(letter);
      } else return letter;
    }).join('');
    return encodedStr;
  }
}

module.exports = Cipher;