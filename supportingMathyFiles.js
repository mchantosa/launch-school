'use strict';

let values = [];

function getValues() {
  return [...values];
}

function addString(value) {
  values.push(value);
}

module.exports = {addString, getValues};