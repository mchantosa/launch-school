//EASY 1: QUESTION 1
/*
  Will the following error?
  - No, it will drop a 5 into index 6 and pad the rest with empty slots
  - Empty slots return as undefined
*/
let numbers = [1, 2, 3];
numbers[6] = 5;


//EASY 1: QUESTION 2
exports.queryExclamationEnd = queryExclamationEnd;
function queryExclamationEnd (message) {
  return message.endsWith('!');
}


//EASY 1: QUESTION 3
exports.findSpot = findSpot;
function findSpot(objAges) {
  return objAges.hasOwnProperty('Spot');
}

//EASY 1: QUESTION 4
exports.cap1LowerAfter = cap1LowerAfter;
function cap1LowerAfter(message) {
  return message.charAt(0).toLocaleUpperCase() + message.slice(1).toLowerCase();
}


//EASY 1: QUESTION 5
/*
  What will the following code output?
*/
console.log(false == '0');    //true
console.log(false === '0');   //false


//EASY 1: QUESTION 6
/*
  Add entries for Marilyn and Spot to the object:
*/
let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };
Object.assign(ages, additionalAges);


//EASY 1: QUESTION 7
/*
  Determine whether the name Dino appears in the strings below:
*/
let str1 = "Few things in life are as important as house training your pet dinosaur.";
let str2 = "Fred and Wilma have a pet dinosaur named Dino.";
str1.includes('Dino');  // false
str2.includes('Dino');  // true


//EASY 1: QUESTION 8
/*
  How can we add the family pet, "Dino", to the following array?
*/
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones[flintstones.length] = "Dino";


//EASY 1: QUESTION 9
/*
  How can we add the family pets, "Dino" and "Hoppy", to the following array?
*/
flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push('Dino', 'Hoppy');


//EASY 1: QUESTION 10
/*
  Return a new version of this sentence that ends just before the word house.
  Don't worry about spaces or punctuation: remove everything starting from the
  beginning of house to the end of the sentence.
*/
let advice = "Few things in life are as important as house training your pet dinosaur.";
advice.slice(0, advice.indexOf('house'));