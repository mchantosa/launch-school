const Car = require("./car");

describe("The Car class", () => { //test suite
  test("has four wheels", () => { //1 test
    let car = new Car();
    expect(car.wheels).toBe(4);
  }); //pass test example

  test("bad wheels", () => {  //2 test
    let car = new Car();
    expect(car.wheels).toBe(3);
  }); //fail test example

  test.skip("bad wheels", () => { //3 test
    let car = new Car();
    expect(car.wheels).toBe(2); //skip example
  });

  xtest("bad wheels", () => { //4 test
    let car = new Car();
    expect(car.wheels).toBe(3);
  }); //another version of skip
});