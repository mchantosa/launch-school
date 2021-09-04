//HARD 1: QUESTION 1
/*
  Will the following functions return the same results?
*/
function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first()); //returns an object containing prop1
console.log(second());  //just returns


//HARD 1: QUESTION 2
/*
  What does the last line in the following code output?
*/
let object = { first: [1] };
let numArray = object["first"];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);  //  => "{ first: [1, 2] };"


//HARD 1: QUESTION 3
/*
  Given the following similar sets of code, what will each code snippet print?
*/

//A
function messWithVars(one, two, three) {
  one = two;
  two = three;
  three = one;
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);  //one = ["one"], two = ["two"], three = ["three"], (realigns function scope pointers, but...)

console.log(`one is: ${one}`);  //"one"
console.log(`two is: ${two}`);  //"two"
console.log(`three is: ${three}`);  //"three"

//B 
function messWithVars(one, two, three) {
  one = ["two"];
  two = ["three"];
  three = ["one"];
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three); //one = ["one"], two = ["two"], three = ["three"], (creates new function scope arrays, but...)

console.log(`one is: ${one}`); //"one"
console.log(`two is: ${two}`);  //"two"
console.log(`three is: ${three}`);  //"three"

//C
function messWithVars(one, two, three) {
  one.splice(0, 1, "two");
  two.splice(0, 1, "three");
  three.splice(0, 1, "one");
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);  //one = ["two"], two = ["three"], three = ["one"], (mutates original arrays)

console.log(`one is: ${one}`);  //"two"
console.log(`two is: ${two}`);  //"three"
console.log(`three is: ${three}`);  //"one"


//HARD 1: QUESTION 3
/*
  - Ben was tasked to write a simple JavaScript function to determine whether an
  input string is an IP address using 4 dot-separated numbers, e.g., 10.4.5.11.
  He is not familiar with regular expressions.
  - Alyssa supplied Ben with a function named isAnIpNumber. It determines whether
  a string is a numeric string between 0 and 255 as required for IP numbers and
  asked Ben to use it. Here's the code that Ben wrote:
  - Alyssa's review: You're not returning a false condition, and you're not handling
  the case when the input string has more or less than 4 components.
  - Fix Ben's code
*/
function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      break;
    }
  }
  return true;
}

function isDotSeparatedIpAddressImproved(inputString) {
  let dotSeparatedWords = inputString.split(".");
  if(dotSeparatedWords.length !== 4) return false;
  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      return false;
    }
  }
  return true;
}