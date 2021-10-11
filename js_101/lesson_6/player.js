const readline = require('readline-sync');
const {Hand} = require('./hand.js');

const Player = class {
  constructor(playToValue, name = '') {
    this.hand = new Hand(playToValue);
    this.name = name;
    this.chips = 100;
    this.bid = 0;
    if (!this.name) this.generateName();
  }

  displayPlayerInfo() {
    return (this.name.slice(0,11) + `[Chips: $${this.chips}] `).padEnd(24);
  }

  generateName() {
    while (true) {
      this.name = readline.question(`Greetings human, what is your name friend?\n=> `).trim();
      console.clear();
      let goodWithName = readline.question(`I have your name as '${this.name}', are you happy with that?: y/n\n=> `).trim();
      if (goodWithName && (goodWithName[0].toLowerCase() === 'y')) break;
      else {
        console.clear();
        console.log("Then let's grab your name again...");
      }
    }
  }
};

exports.Player = Player;