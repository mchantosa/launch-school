//EASY 2: QUESTION 1
exports.replaceWord = replaceWord;
function replaceWord(message, findStr, replaceStr) {
  return message.split(findStr).join(replaceStr);
} //message.replace(findStr, replaceStr) was another option

//EASY 2: QUESTION 2
/*
  Write two distinct ways of reversing the array without mutating the original
  array. Use reverse for the first solution, and sort for the second.
  Bonus Question: Can you do it using the Array.prototype.forEach() method?
*/
let numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [ 5, 4, 3, 2, 1 ]
//method1
numbers.slice().reverse();

numbers = [1, 2, 3, 4, 5];
numbers.sort((num1, num2) => num2 - num1);
console.log(numbers); // [ 5, 4, 3, 2, 1 ]
//method2
numbers.slice().sort((num1, num2) => num2 - num1);

numbers = [1, 2, 3, 4, 5];
//method3
const numbersForEach = [];
numbers.forEach((element) => {
  numbersForEach[Math.abs(numbers.length - 1 - numbers.indexOf(element))]
    = element;
});


//EASY 2: QUESTION 3
/*
  Given an array, determine if the number is included
*/
numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];
let number1 = 8;  // false
let number2 = 95; // true

numbers.includes(number1);
numbers.includes(number2);


//EASY 2: QUESTION 4
/*
  Show two different ways to put the expected "Four score and " in front of it.
*/
const famousWords = "seven years ago...";

//method1
"Four score and " + famousWords;

//method2
"Four score and ".concat(famousWords);


//EASY 2: QUESTION 5
/*
  Given an array of numbers [1, 2, 3, 4, 5], mutate the array by removing the
  number at index 2, so that the array becomes [1, 2, 4, 5].
*/
numbers.splice(2,1);


//EASY 2: QUESTION 6
/*
  Un-nest an array
  For (personal) bonus, don't use Array.flat()
*/
exports.unNest = unNest;
function unNest(nestedArray) {
  const newArray = [];
  const arrayExtractor = (array) => {
    array.forEach(element => {
      if (!Array.isArray(element)) {
        newArray.push(element);
      } else {
        arrayExtractor(element);
      }
    });
  };
  arrayExtractor(nestedArray);
  return newArray;
}


//EASY 2: QUESTION 7
/*
  Consider the following object: flintstones (below)
  Create an array from this object that contains only two elements:
    - Barney's name
    - Barney's number
*/
let flintstones = { Fred: 0,
  Wilma: 1,
  Barney: 2,
  Betty: 3,
  Bambam: 4,
  Pebbles: 5 };
Object.entries(flintstones).filter(entry => entry[0] === "Barney");

//EASY 2: QUESTION 8
/*
  How would you check whether the objects assigned to variables numbers
  and table below are arrays?
*/
numbers = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false
Array.isArray(numbers);
Array.isArray(table);

//EASY 2: QUESTION 9
/*
  Back in the stone age (before CSS), we used spaces to align things on the
  screen. If we have a 40-character wide table of Flintstone family members,
  how can we center the following title above the table with spaces?
*/
let title = "Flintstone Family Members";
const padding = Array(Math.floor((40 - title.length) / 2) + 1).join(' ');
title = padding + title + padding;
//or
title = "Flintstone Family Members";
const padding1 = Math.floor((40 - title.length) / 2);
title = title.padStart(padding1 + title.length)
  .padEnd((2 * padding1) + title.length);

//EASY 2: QUESTION 10
/*
  Write two one-line expressions to count the number of lower-case t characters
  in each of the following strings:
*/
let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

const tCountStatement1 = statement1.split('t').length - 1;
const tCountStatement2 = statement2.split('t').length - 1;