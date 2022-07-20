'use strict';
const {addString} = require('./supportingMathyFiles');
const concatDouble = require('./concatDouble');

addString('a');
addString('bc');
addString('def');
addString('ghij');
console.log(concatDouble()); // => abcbcdefdefghijghij