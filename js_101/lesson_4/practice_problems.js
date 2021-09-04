
//PRACTICE PROBLEMS: QUESTION 1
/*
  What is the return value of the filter method call below? Why?
*/
[1, 2, 3].filter(num => 'hi');  //[1, 2, 3]


//PRACTICE PROBLEMS: QUESTION 2
/*
  What is the return value of map in the following code? Why?
*/
[1, 2, 3].map(num => {
  num * num;
});   //[undefined, undefined, undefined]


//PRACTICE PROBLEMS: QUESTION 3
/*
  The following code differs slightly from the above code.
  What is the return value of map in this case? Why?
*/
[1, 2, 3].map(num => num * num);  //[1, 4, 9], the previous one had no return, in-line functions auto-return


//PRACTICE PROBLEMS: QUESTION 4
/*
  What is the return value of the following statement? Why?
*/
['ant', 'bear', 'caterpillar'].pop().length;  //11, the length of caterpillar


//PRACTICE PROBLEMS: QUESTION 5
/*
  What is the callback's return value in the following code? Also, what is the
  return value of every in this code?
*/
[1, 2, 3].every(num => {
  return num *= 2;
}); //2, 4, 6, true


//PRACTICE PROBLEMS: QUESTION 6
/*
  How does Array.prototype.fill work? Is it destructive? How can we find out?
*/
let arr = [1, 2, 3, 4, 5];
arr.fill(1, 1, 5);  //[1, 1, 1, 1, 1] destructive


//PRACTICE PROBLEMS: QUESTION 7
/*
  What is the return value of map in the following code? Why?
*/
['ant', 'bear'].map(elem => {
  if (elem.length > 3) {
    return elem;
  }
}); //[undefined, 'bear']


//PRACTICE PROBLEMS: QUESTION 8
/*
  Take a look at the following array. Write a program that uses this array to
  create an object where the names are the keys and the values are the positions
  in the array:
*/
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
let object = {};
flintstones.forEach((name, index) => {
  object[name] = index;
});


//PRACTICE PROBLEMS: QUESTION 9
/*
  Add up all of the ages from the Munster family object:
*/
let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};
Object.values(ages).reduce((a, b) => a + b);


//PRACTICE PROBLEMS: QUESTION 10
/*
  Pick out the minimum age from our current Munster family object:
*/
ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};
Math.min(...Object.values(ages));


//PRACTICE PROBLEMS: QUESTION 11
/*
  Create an object that expresses the frequency with which each letter occurs
  in this string:
*/
let statement = "The Flintstones Rock";
statement = statement.split('');
let statementObj = {};
while (statement.length > 0) {
  let element = statement.pop();
  if (statementObj[element]) {
    statementObj[element] += 1;
  } else statementObj[element] = 1;
}

