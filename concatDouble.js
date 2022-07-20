'use strict';
const {getValues} = require('./supportingMathyFiles');

function double(value) {
  return value + value;
}

function concatDouble() {
  return getValues().reduce((result, value) => {
    return result + double(value);
  });
}

module.exports = concatDouble;