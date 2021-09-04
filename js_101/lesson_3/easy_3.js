//EASY 3: QUESTION 1
/*
  Write three different ways to remove all of the elements from the following
  array:
*/
let numbers = [1, 2, 3, 4];
numbers.length = 0;

numbers = [1, 2, 3, 4];
numbers.splice(0, numbers.length);

numbers = [1, 2, 3, 4];
while (numbers.join()) numbers.pop();


//EASY 3: QUESTION 2
/*
  What will the following code output?
*/
console.log([1, 2, 3] + [4, 5]);  //'1,2,34,5'


//EASY 3: QUESTION 3
/*
What will the following code output?
*/
let str1 = "hello there";
let str2 = str1;
str2 = "goodbye!";
console.log(str1);  //"hello there";


//EASY 3: QUESTION 4
/*
  What will the following code output?
*/
let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);  //[{ first: "42" }, { second: "value2" }, 3, 4, 5]


//EASY 3: QUESTION 5
/*
  The following function unnecessarily uses two return statements to return
  boolean values. Can you rewrite this function so it only has one return
  statement and does not explicitly use either true or false?
*/
function isColorValid(color) {
  if (color === "blue" || color === "green") {
    return true;
  } else {
    return false;
  }
}

function isColorValidReworked(color) {
  return (color === "blue") || (color === "green");
}