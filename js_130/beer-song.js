/**
 * Big picture:
 *  - BeerSong.lyrics(), return 99 bottles of beer from 99 to 0
 *  - BeerSong.verse(a), return for verse a
 *  - BeerSong.verses(a, b), return verses from a to b
 * Implementation:
 *  - verse(a)
 *    static
 *    return verse for number a
 *  - verses(a, b)
 *    static
 *    iterate from a to b, return concatenated verses
 *  - lyrics
 *    static
 *    return verse(99, 0)
 * Boundary values, edge cases, and assumtions
 *  - arguments will be between 99 and 0
 *  - arguments will be integers
 *  - a > b
 */

class BeerSong{
  static verse(a){
    console.log('in verse')
    if(a === 0){
      return "No more bottles of beer on the wall, no more " +
      "bottles of beer.\nGo to the store and buy some " +
      "more, 99 bottles of beer on the wall.\n";
    } else if (a === 1) {
      return "1 bottle of beer on the wall, 1 bottle of beer.\n" +
      "Take it down and pass it around, no more bottles " +
      "of beer on the wall.\n";
    } else {
      return `${a} bottles of beer on the wall, ${a} bottles of beer.\n` +
      `Take one down and pass it around, ${a-1} bottle${(a - 1 === 1) ? '' : 's'} of beer ` +
      "on the wall.\n";
    } 
  }

  static verses(a, b){
    const returnVerses = [];
    for(let index = a; index >= b; index--){
      returnVerses.push(BeerSong.verse(index));
    }
    return returnVerses.join('\n');
  }

  static lyrics(){
    return BeerSong.verses(99, 0);
  }
}

console.log(BeerSong.verses(99, 98));

module.exports = BeerSong;