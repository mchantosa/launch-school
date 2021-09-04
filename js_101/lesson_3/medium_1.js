//MEDIUM 1: QUESTION 1
/*
  write a program that outputs The Flintstones Rock! 10 times, with each
  line indented 1 space to the right of the line above it.
*/
let message = "The Flintstones Rock!";
printAscendingIndent10(message);
function printAscendingIndent10(message) {
  console.log(message);
  for (let ii = 0; ii < 9; ii++) {
    message = message.padStart(1 + message.length);
    console.log(message);
  }
}


//MEDIUM 1: QUESTION 2
/*
  Starting with the string (below)
  Return a new string that swaps the case of all of the letters:
*/
const munstersDescription = "The Munsters are creepy and spooky.";
function invertCasing(message) {
  let newString = '';
  for (let ii = 0; ii < message.length; ii++) {
    newString += (message[ii] === message[ii].toLowerCase()) ?
      message[ii].toUpperCase() : message[ii].toLowerCase();
  }
  return newString;
}
console.log(invertCasing(munstersDescription));


//MEDIUM 1: QUESTION 3
/*
  Intended to return all of the factors of number
  Make this work fof 0 and <0 without using a do/while loop?
  Bonus: What is the purpose of number % divisor === 0 in that code?
    - A remainder of zero defines a divisor
*/
function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor > 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  }
  return factors;
}
console.log('factors(12): ' + factors(12));
console.log('factors(0): ' + factors(0));
console.log('factors(-12): ' + factors(-12));


//MEDIUM 1: QUESTION 4
/*
  What's the difference betwen the two buffering elements below
*/
function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
} //this one mutates

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
} //this one returns a new element.

//MEDIUM 1: QUESTION 5
/*
  What will the following two lines of code output?
*/
console.log(0.3 + 0.6); //0.89999999999
console.log(0.3 + 0.6 === 0.9); //false


//MEDIUM 1: QUESTION 6
/*
  What do you think the following code will output?
*/
let nanArray = [NaN];
console.log(nanArray[0] === NaN);
//== and === don't work for NaNs, you have to use Number.isNan()


//MEDIUM 1: QUESTION 7
/*
  What is the output of the following code?
*/
let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8);  //34


//MEDIUM 1: QUESTION 8
/*
  One day, Spot was playing with the Munster family's home computer,
  and he wrote a small program to mess with their demographic data (below).
  After writing this function, he typed the following code (below). Before
  Grandpa could stop him, Spot hit the Enter key with his tail. Did the
  family's data get ransacked? Why or why not?
*/
let munsters = {
  Herman: { age: 32, gender: "male" },
  Lily: { age: 30, gender: "female" },
  Grandpa: { age: 402, gender: "male" },
  Eddie: { age: 10, gender: "male" },
  Marilyn: { age: 23, gender: "female" }
};

function messWithDemographics(demoObject) {
  Object.values(demoObject).forEach(familyMember => {
    familyMember["age"] += 42;
    familyMember["gender"] = "other";
  });
}

messWithDemographics(munsters); //yes, pass by reference


//MEDIUM 1: QUESTION 9
/*
  Function and method calls can take expressions as arguments. Suppose we
  define a function named rps as follows, which follows the classic rules
  of the rock-paper-scissors game, but with a slight twist: in the event
  of a tie, it just returns the choice made by both players.
  What does the following code output?
*/
function rps(fist1, fist2) {
  if (fist1 === "rock") {
    return fist2 === "paper" ? "paper" : "rock";
  } else if (fist1 === "paper") {
    return fist2 === "scissors" ? "scissors" : "paper";
  } else {
    return fist2 === "rock" ? "rock" : "scissors";
  }
}

console.log(rps(rps(rps("rock", "paper"), rps("rock", "scissors")), "rock"));
//rps(rps(rps("rock", "paper"), rps("rock", "scissors")), "rock")
//rps(rps("paper", rps("rock", "scissors")), "rock")
//rps(rps("paper", "rock"), "rock")
//rps("paper", "rock")
//"paper"


//MEDIUM 1: QUESTION 10
/*
  Consider these two simple functions (below)
  What will the following function invocation return?
*/
function foo(param = "no") {
  return "yes";
}

function bar(param = "no") {
  return param === "no" ? "yes" : "no";
}

bar(foo()); //"no"