/**
 * Big picture:
 *  - match method compares atring arguments from an array and 
 *    determines which of those elements is an anagram of this.word
 *    - arguments: array (an arrau of words, potential anagrams)
 *    - return value: array (a subset of the argument containing 
 *      those words which were anagrams)
 * 
 * Implementation:
 *  - create an anagram comparison method
 *    - for each letter in this.word, remove that letter from potential anagram
 *    - if potential anagram runs out of letters or has remaining letters, return false
 *    - if potential anagram has length 0, return true
 *  - return array argument filtered by anagram comparison method
 * 
 * Boundary conditions and assumptions:
 *  - empty argument array
 *  - array with no anagram matches
 *  - identical work is not an anagram
 *  - anagrams should be case insensetive
 * 
 */

class Anagram{
  constructor(str){
    this.word = str;
  }

  match(arr){
    return arr.filter(word => this.isAnagram(word));
  }

  isAnagram(str){
    if((this.word.toLowerCase() === str.toLowerCase()) ||
      (this.word.length !== str.length)) return false;
    let sortedAnagram = [...str.toLowerCase()].sort().join('');
    let sortedWord = [...this.word.toLowerCase()].sort().join('');
    return sortedAnagram === sortedWord;
  }

}

module.exports = Anagram;