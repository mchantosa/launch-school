const util = require('util');

/*EXAMPLE: SQUARES AND RECTANGLES
  Create an inherritance structure such that
    1. Rectangle constructs a rectangle object
    2. Square constructs a square object
    3. Square inherrits form Rectangle
*/

console.clear();

//MAKE A RECTANGLE CLASS
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
    this.name = 'rectangle';
  }

  area() {
    return this.length * this.width;
  }
}

//MAKE A SQUARE CLASS, INHERITS FROM RECTANGLE CLASS
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = 'square';
  }
}

//TEST RECTANGLE CLASS
{
  console.log('\nRectangle...');

  console.log('\nRectangle...Is the prototype correctly set? ');
  console.log(`=> Rectangle.prototype: ${util.inspect(Rectangle.prototype)}`);
  console.log(`=> Rectangle.prototype.__proto__ === Object.prototype: ${Rectangle.prototype.__proto__ === Object.prototype}`);

  console.log('\nRectangle...Is the constructor correctly set? ');
  console.log(`=> Rectangle.prototype.constructor === Rectangle: ${Rectangle.prototype.constructor === Rectangle}`);
  console.log(`=> Rectangle.prototype.hasOwnProperty('constructor'): ${Rectangle.prototype.hasOwnProperty('constructor')}`);
}

//TEST INSTANCE OF A RECTANGLE
{
  let aRectangle = new Rectangle(3, 2);
  console.log('\naRectangle...');

  console.log('\naRectangle... is well formed');
  console.log(`=> aRectangle: ${util.inspect(aRectangle)}`);
  console.log(`=> aRectangle.area() === 6: ${aRectangle.area() === 6}`);

  console.log('\naRectangle... [[prototype]] is Rectangle.prototype');
  console.log(`=> aRectangle.__proto__ === Rectangle.prototype: ${aRectangle.__proto__ === Rectangle.prototype}`);

  console.log('\naRectangle... aRectangle.constructor is assigned to Rectangle');
  console.log(`=> aRectangle.constructor === Rectangle: ${aRectangle.__proto__ === Rectangle.prototype}`);
}

//TEST SQUARE CLASS
{
  console.log('\nSquare...');

  console.log('\nSquare...Is the prototype correctly set? ');
  console.log(`=> Square.prototype: ${util.inspect(Square.prototype)}`);
  console.log(`=> Square.prototype.__proto__ === Rectangle.prototype: ${Square.prototype.__proto__ === Rectangle.prototype}`);
  console.log(`=> Square.prototype.__proto__ === Object.prototype: ${Square.prototype.__proto__ === Object.prototype}`);

  console.log('\nSquare...Is the constructor correctly set? ');
  console.log(`=> Square.prototype.constructor === Square: ${Square.prototype.constructor === Square}`);
  console.log(`=> Square.prototype.hasOwnProperty('constructor'): ${Square.prototype.hasOwnProperty('constructor')}`);
}


//TEST INSTANCE OF A SQUARE
{
  let aSquare = new Square(3);
  console.log('\naSquare...');

  console.log('\naSquare... is well formed');
  console.log(`=> aSquare: ${util.inspect(aSquare)}`);
  console.log(`=> aSquare.area() === 9: ${aSquare.area() === 9}`);

  console.log('\naSquare... [[prototype]] is Square.prototype');
  console.log(`=> aSquare.__proto__ === Square.prototype: ${aSquare.__proto__ === Square.prototype}`);

  console.log('\naSquare... aSquare.constructor is assigned to Square');
  console.log(`=> aSquare.constructor === Square: ${aSquare.__proto__ === Square.prototype}`);

  console.log(`\naSquare is a square`);
  console.log(`=> aSquare instanceof Square: ${aSquare instanceof Square}`);

  console.log(`\naSquare is a Rectangle`);
  console.log(`=> aSquare instanceof Rectangle: ${aSquare instanceof Rectangle}`);

  console.log(`\naSquare is an Object`);
  console.log(`=> Square instanceof Object: ${aSquare instanceof Object}`);
}