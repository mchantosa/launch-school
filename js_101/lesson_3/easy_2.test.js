const easy = require('./easy_2.js');


//EASY 2: QUESTION 1
const message =
  "Few things in life are as important as house training your pet dinosaur.";
const messageReturn =
  "Few things in life are as urgent as house training your pet dinosaur.";
const findStr =  "important";
const replaceStr = "urgent";

test("Does replaceWord replace 'important' with 'urgent'", () => {
  expect(
    easy.replaceWord(message, findStr, replaceStr)
  ).toBe(messageReturn);
});

//EASY 2: Question 6
let flintstones = ["Fred", "Wilma"];
flintstones.push(["Barney", "Betty"]);
flintstones.push(["Bambam", "Pebbles"]);
test("Does unNest flatten an array 1 layer", () => {
  const unNestedFlinstones = easy.unNest(flintstones);
  const desiredOutcome = [ 'Fred', 'Wilma', 'Barney', 'Betty', 'Bambam', 'Pebbles' ];
  expect(unNestedFlinstones).toEqual(desiredOutcome);
});

const numbers0 = [1, [2, [3, [4, 5], 6], 7], 8, 9];
test("Does unNest flatten an array multi layer", () => {
  const unNestedNumbers = easy.unNest(numbers0);
  expect(unNestedNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
});

const numbers1 = [[0], 1];
test("Does not mutate original", () => {
  const unNestedNumbers1 = easy.unNest(numbers1);
  expect(numbers1).toEqual([[0], 1]);
  expect(numbers1).toBe(numbers1);
  expect(unNestedNumbers1).toEqual([0, 1]);
});
