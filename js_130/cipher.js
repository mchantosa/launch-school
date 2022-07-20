/*


Big picture:
  - write a program that encrypts text strings with the following simple (and very unsecure) cipher:
    - Replace each letter in the original string with another letter.
    - The first letter of the alphabet should be replaced with the last.
    - The second letter of the alphabet should be replaced with the next to last.
    - The third letter of the alphabet should be replace with the second from the last.
    - Continue on in this manner throughout the alphabet.
    - For example, the word money gets encrypted as nlmvb.
Implementation:

Boundary vLues, edge cases, and assumptiuons:
 */
let letters = 'abcdefghijklmnopqrstuvwxyz';

function encodeLetter(letter) {
  if (letter.match(/\d/)) return letter;
  return letters[letters.length - 1 - letters.indexOf(letter.toLowerCase())];
}

function addSpaces(str) {
  let returnStr = '';
  for (let index = 0; index < str.length; index += 5) {
    returnStr += str.slice(index, index + 5);
    if (index + 6 < str.length) returnStr += ' ';
  }
  return returnStr;
}

function encode(str) {

  let prespaceEncodedStr = [...str].map((letter) => {
    if (letters.indexOf(letter.toLowerCase() >= 0)) {
      return encodeLetter(letter);
    } else return letter;
  }).join('');

  return addSpaces(prespaceEncodedStr);
}

module.exports = encode;