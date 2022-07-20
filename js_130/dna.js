/**
 * Big picture:
 *  - hammingDistance method: takes a string argument DNA sequence 
 *    and computes the hammingDistance to this DNA sequence
 *  - truncate to shorter length DNA sequence
 * 
 * Implementation:
 *  - get the shortest length
 *  - truncate the longer string
 *  - count the differences
 * 
 * Edge cases and assumptions:
 *  - null this DNA: 0
 *  - null DNA argument: 0
 *  - identical arguments: 0
 *  - input will be from {ACGT}
 *  
 */

class DNA {
  constructor(str){
    this.strand = str;
  }

  hammingDistance(str){
    const length = Math.min(this.strand.length, str.length);
    if(length === 0) return 0;
    
    let differences = 0;
    for(let i = 0; i< length; i++) {
      if(this.strand[i]!==str[i]) differences+=1;
    }
    return differences;
  }
}

module.exports = DNA;