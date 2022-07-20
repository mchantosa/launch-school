'use strict';
/**
 * Big picture:
 *  - class Robot:
 *    - constructor()
 *      - argument: none
 *    - name():
 *      - argument: none
 *      - return: unique robot name
 *      - if no name exists populate robot name
 *        - create a name creation methos
 *      - names should be unique
 *         - static collection of names
 *     - reset():
 *         - assigns a new and different unique name  
 *        
 * Implementation:
 *  - class Robot:
 *    - constructor():
 *      - add robot to Robot.ROBOTS
 *    - name():
 *      - if name exists, return name
 *      - else populate name
 *    - reset():
 *      - generateName
 *      - replaceName
 *    - generateName();
 *      - generate name randomly
 *        - random [A-Z]*2 + random [0-9]*3
 *      - confirm uniqueness
 *      - if not unique, recursively generate new name
 *      
 *
 * Boundary values, edge cases, and assumptions:
 *  - name conforms to regex provided, [A-Z][A-Z][0-9][0-9][0-9]
 */

class Robot {
  static ROBOTS = [];
  
  static getROBOTSNames(){
    return this.ROBOTS.map(robot => robot.name());
  }

  constructor(){
    Robot.ROBOTS.push(this);
  }

  name(){
    if(!this.robotName) this.generateName();
    return this.robotName;
  }

  generateName(){
    const getRandomLetter = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYX';
      const index = Math.floor(Math.random()*letters.length)
      return letters[index];
    }
    
    const getRandomNumber = () => {
      const numbers = '0123456789';
      const index = Math.floor(Math.random()*numbers.length);
      return numbers[index];
    }

    const isUnique = (robotName) => {
      return !Robot.getROBOTSNames().includes(robotName);
    }

    let robotName = '';
    robotName += getRandomLetter();
    robotName += getRandomLetter();
    robotName += getRandomNumber();
    robotName += getRandomNumber();
    robotName += getRandomNumber(); 

    if(isUnique) {
      this.robotName = robotName;
    } else {
      this.generateName();
    }

  }

  reset(){
    this.generateName();
  }
}

module.exports = Robot;
