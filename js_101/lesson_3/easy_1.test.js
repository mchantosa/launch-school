const easy = require('./easy_1.js');


//EASY 1: QUESTION 2
test("Does queryExclamationEnd return true if end is '!'", () => {
  expect(
    easy.queryExclamationEnd("This string ends with an exclamation point!")
  ).toBe(true);
});

test("Does queryExclamationEnd return false if end is not '!'", () => {
  expect(
    easy.queryExclamationEnd("This one doesn't")
  ).toBe(false);
});

test("White space test: does queryExclamationEnd return false if end is '! '", () => {
  expect(
    easy.queryExclamationEnd("Neither does this one! ")
  ).toBe(false);
});

//EASY 1: QUESTION 2
let ages1 = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };
test("Does findSpot return false if Spot does not exist", () => {
  expect(
    easy.findSpot(ages1)
  ).toBe(false);
});

let ages2 = { Herman: 32, Spot: -1, Lily: 30, Grandpa: 402, Eddie: 10 };
test("Does findSpot return true if Spot exists", () => {
  expect(
    easy.findSpot(ages2)
  ).toBe(true);
});

//EASY 1: QUESTION 3
let munstersDescription = "the Munsters are CREEPY and Spooky.";
test("Does cap1LowerAfter return a lower case version of the input message with a capitalized first letter", () => {
  expect(
    easy.cap1LowerAfter(munstersDescription)
  ).toBe('The munsters are creepy and spooky.');
});