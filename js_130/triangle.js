/**
 * Big picture
 *  function assessTriangle
 *  - Paramters(numeric): length1, length2, length3
 *  - Return(string): "equilateral", "isosceles", "scalene"
 *  - invalid triangle throws an error
 * Implementation:
 *  - determine if the tiangle is valid
 *  - is equilateral
 *  - is isosceles
 *  - if no to all return scalene
 *
 * Boundary values, edge cases, assumptions
 *  - length 0
 *  - length <0
 *  - will get three arguments
 *  - arguments will be numbers
 */
class Triangle {
  constructor(...lengths){
    this.lengths = lengths.sort((a, b) => a - b);
    if(this.isInvalid()) throw ('invalid triangle');
  }
  kind(){
    if(this.lengths.every(length => length === this.lengths[0])) return "equilateral";
    if(this.lengths[1] === this.lengths[2]) return "isosceles";
    return "scalene";
  }
  isInvalid(){
    return (!this.lengths.every(length => length > 0) || 
    (this.lengths[2] >= this.lengths[0] + this.lengths[1])) 
  }
}

module.exports = Triangle;