//PRACTICE PROBLEMS: QUESTION 1
/*
  How would you order the following array of number strings by descending
  numeric value (largest number value to smallest)?
*/
let arr = ['10', '11', '9', '7', '8'];
arr.sort((a , b) => Number(b) - Number(a));


//PRACTICE PROBLEMS: QUESTION 2
/*
  How would you order the following array of objects based on the year of
  publication of each book, from the earliest to the latest?
*/
let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];
books.sort((a, b) => Number(a.published) - Number(b.published));


//PRACTICE PROBLEMS: QUESTION 3
/*
  For each of these collection objects, demonstrate how you would access the
  letter g.
*/
let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};

console.log(arr1[2][1][3]
  + arr2[1].third[0]``
  + arr3[2].third[0][0]
  + obj1.b[1]
  + Object.keys(obj2.third)
);


//PRACTICE PROBLEMS: QUESTION 4
/*
  For each of these collection objects, demonstrate how you would change the
  value 3 to 4.
*/
arr1 = [1, [2, 3], 4];
arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
obj1 = { first: [1, 2, [3]] };
obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };

arr1[1][1] = 4;
arr2[2] = 4;
obj1.first[2][0] = 4;
obj2.a.a[2] = 4;

//PRACTICE PROBLEMS: QUESTION 5
/*
  Consider the following nested object:
  Compute and display the total age of the male members of the family.
*/
let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let cumMaleAge = 0;
Object.keys(munsters).forEach(element => {
  if (munsters[element].gender === 'male') cumMaleAge += munsters[element].age;
});
console.log(cumMaleAge);

//PRACTICE PROBLEMS: QUESTION 6
/*
  One of the most frequently used real-world string operations is that of
  "string substitution," where we take a hard-coded string and modify it with
  various parameters from our program.

  Given this previously seen family object, print the name, age, and gender of
  each family member: (Name) is a (age)-year-old (male or female).
*/
munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};
Object.keys(munsters).forEach(element => {
  console.log(`${element} is a ${munsters[element].age}-year-old ${munsters[element].gender}.`);
});

//PRACTICE PROBLEMS: QUESTION 7
/*
  Given the following code, what will the final values of a and b be? Try to
  answer without running the code.
*/
let a = 2;
let b = [5, 8];
arr = [a, b];

arr[0] += 2;  //a = 2
arr[1][0] -= a; //b = [3, 8], arr = [ 4, [ 3, 8 ] ]

//PRACTICE PROBLEMS: QUESTION 8
/*
  Using the forEach method, write some code to output all vowels from the
  strings in the arrays. Don't use a for or while loop.
*/
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.keys(obj).forEach(key => {
  obj[key].forEach(word => {
    console.log(word.split('').filter(letter => 'aeiou'.includes(letter)));
  });
});

Object.values(obj).forEach(words => {
  words.forEach(word => {
    word.split('').forEach(letter => {
      if ('aeiou'.includes(letter)) console.log(letter);
    });
  });
});

//PRACTICE PROBLEMS: QUESTION 9
/*
  Given the following data structure, return a new array with the same
  structure, but with the values in each subarray ordered -- alphabetically
  or numerically as appropriate -- in ascending order.
*/
arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

// arr.forEach(element => {
//   element.sort((a, b) => {
//     if(typeof a === 'number') return a-b;
//     else {
//       console.log('a: ' + a + 'b: ' + b + 'a < b: ' + (a < b))
//       return (a < b) ? -1 : 1;
//     }
//   })
// }) //in place bad

arr.map(arrElement => {
  if (typeof arrElement[0] === 'string') return arrElement.slice().sort();
  else return arrElement.slice().sort((a, b) => a - b);
});

//PRACTICE PROBLEMS: QUESTION 10
/*
  Perform the same transformation of sorting the subarrays we did in the
  previous exercise with one difference; sort the elements in descending order.
*/
arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
arr.map(arrElement => {
  if (typeof arrElement[0] === 'string') return arrElement.slice().sort().reverse();
  else return arrElement.slice().sort((a, b) => b - a);
});

//PRACTICE PROBLEMS: QUESTION 11
/*
  Given the following data structure, use the map method to return a new array
  identical in structure to the original but, with each number incremented by 1.
  Do not modify the original data structure.
*/
arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
arr.map(obj => {
  let returnObj = {};
  Object.keys(obj).forEach(element => {
    Object.assign(returnObj, {[element]: obj[element] + 1});
  });
  return returnObj;
});


//PRACTICE PROBLEMS: QUESTION 12
/*
  Given the following data structure, use a combination of methods, including
  filter, to return a new array identical in structure to the original, but
  containing only the numbers that are multiples of 3.
*/
arr = [[2], [3, 5, 7], [9], [11, 15, 18]];
arr.map(subArr => {
  return subArr.filter(num => num % 3 === 0);
});


//PRACTICE PROBLEMS: QUESTION 13
/*
  Given the following data structure, sort the array so that the sub-arrays are
  ordered based on the sum of the odd numbers that they contain.
*/
arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort((a,b) => {
  let redA = a.reduce((preVal, curVal) => {
    return preVal + ((curVal % 2) * curVal);
  }, (a[0] % 2) * a[0]);
  let redB = b.reduce((preVal, curVal) => {
    return preVal + ((curVal % 2) * curVal);
  }, (b[0] % 2) * b[0]);
  return redA - redB;
});


//PRACTICE PROBLEMS: QUESTION 14
/*
  Given the following data structure write some code to return an array
  containing the colors of the fruits and the sizes of the vegetables. The
  sizes should be uppercase, and the colors should be capitalized.
*/
obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};
let newObj = [];
for (let key in obj) {
  if (obj[key].type === 'fruit') {
    newObj.push(obj[key].colors
      .map(color => color[0].toUpperCase() + color.substring(1)));
  } else newObj.push(obj[key].size.toUpperCase());
}


//PRACTICE PROBLEMS: QUESTION 15
/*
  Given the following data structure, write some code to return an array
  which contains only the objects where all the numbers are even.
*/
arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

arr.filter(obj => {
  return Object.values(obj).flat().every(element => element % 2 === 0);
});


//PRACTICE PROBLEMS: QUESTION 16
/*
  Given the following data structure, write some code that returns an object
  where the key is the first item in each subarray, and the value is the second.
*/
arr = [['a', 1], ['b', 'two'], ['sea', {c: 3}], ['D', ['a', 'b', 'c']]];
const reducer = (a, b) => Object.assign(a, {[b[0]]: b[1]});
arr.reduce(reducer, {});

//PRACTICE PROBLEMS: QUESTION 17
/*
  Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the
  letters a-f)represented as a string. The value is typically broken into 5
  sections in an 8-4-4-4-12 pattern, e.g.,
  'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

  Write a function that takes no arguments and returns a string that contains a
  UUID.
*/
function createUUID() {
  const hexbase = '0123456789abcdef';
  let UUID = [];
  let format = [8, 4, 4, 4, 12];
  format.forEach(section => {
    let index = 0;
    let UUIDSub = '';
    while (index < section) {
      UUIDSub = UUIDSub.concat(hexbase[Math.floor((Math.random() * 16))]);
      index++;
    //console.log(UUIDSub)
    }
    console.log(UUIDSub);
    UUID.push(UUIDSub);
  });
  return UUID.join('-');
}

console.log(createUUID());