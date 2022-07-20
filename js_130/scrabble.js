/**
 * Big picture: method score should compute the scrabble score for this.word
 *  - arguments: none
 *  - return: number (integer score value)
 * 
 * Implementation:
 *  - define reference table
 *  - declare return value
 *  - iterate over characters and increment return value through reference table
 *  - return return value
 * 
 * Assumptions and Boundary conditions:
 *  - case insensetive
 *  - white space gets a 0 score
 *  - null input gets a 0 score
 *  - empty string gets a 0 score
 */

class Scrabble{
  static characterValues = {
    'aeioulnrst': 1,
    'dg': 2,
    'bcmp': 3,
    'fhvwy': 4,
    'k': 5,
    'jx': 8,
    'qz': 10,
  };

  constructor(word){
    this.word = word;
  }

  score(){
    let score = 0;
    if(this.word){
      let word = [...this.word.toLowerCase().replace(/\s/g, '')];
      Object.keys(Scrabble.characterValues).forEach(key => {
        word.forEach(character => {
          if (key.includes(character)){
            score += Scrabble.characterValues[key]
          }
        });
      });
    }
    return score;  
  }

  static score(word){
    return new Scrabble(word).score()
  }
}

module.exports = Scrabble;