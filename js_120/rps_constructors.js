/*eslint max-statements: ["error", 20]*/
/*eslint max-lines-per-function: ["error", 40]*/
const readline = require('readline-sync');

const MOVES = {
  choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  hierarchy: {
    rock: { beats: ['lizard', 'scissors'], losesTo: ['paper', 'spock']},  // crushes lizard, crushes scissors
    paper: { beats: ['rock', 'spock'], losesTo: ['scissors', 'lizard']},  //covers rock. disproves spock
    scissors: { beats: ['paper', 'lizard'], losesTo: ['spock', 'rock']},  //cuts paper, decapitates lizard
    lizard: { beats: ['spock', 'paper'], losesTo: ['rock', 'scissors']},  //poisons spock, eats paper
    spock: { beats: ['scissors', 'rock'], losesTo: ['paper', 'lizard']},  //smashes scissors, vaporizes rock
  },
};

function RPSGame() {
  this.WIN_SCORE = 5;
  this.human = new Human();
  this.computer = new Computer();
}

RPSGame.prototype.pause = function () {
  readline.question('Hit Enter key to continue.', {hideEchoBack: true, mask: ''});
};

RPSGame.prototype.displayWelcomeMessage = function () {
  console.log(`Welcome to Rock, Paper, Scissors, we are playing best of ${this.WIN_SCORE}.`);
};

RPSGame.prototype.displayScore = function () {
  console.log(`Current score: you {${this.human.score}}, computer {${this.computer.score}}`);
};

RPSGame.prototype.resetScores = function () {
  this.human.resetScore();
  this.computer.resetScore();
};

RPSGame.prototype.displayRoundWinner = function () {
  let humanMove = this.human.move;
  let computerMove = this.computer.move;

  console.clear();
  console.log(`You chose: ${this.human.move}`);
  console.log(`The computer chose: ${this.computer.move}`);

  if (humanMove === computerMove) {
    console.log("It's a tie");
  } else if (MOVES.hierarchy[humanMove].beats.includes(computerMove)) {
    console.log('You win this round!');
    this.human.incrementScore();
  } else {
    console.log('Computer wins this round!');
    this.computer.incrementScore();
  }
};

RPSGame.prototype.displayMatchWinner = function () {
  console.clear();
  this.displayScore();
  console.log((this.human.score === this.WIN_SCORE) ? 'You win!' : 'Computer wins!');
};

RPSGame.prototype.displayGoodbyeMessage = function () {
  console.clear();
  console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
};

RPSGame.prototype.playAgain = function () {
  console.clear();
  console.log('Would you like to play again? (y/n)');
  let answer = readline.question();
  return (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
};

RPSGame.prototype.playMatch = function() {
  while (true) {
    console.clear();
    this.displayScore();
    this.computer.choose(this.human);
    this.human.choose();
    this.displayRoundWinner();
    this.pause();
    if (this.human.score === this.WIN_SCORE ||
      this.computer.score === this.WIN_SCORE) break;
  }
  this.displayMatchWinner();
  this.pause();
};

RPSGame.prototype.play = function () {
  console.clear();
  this.displayWelcomeMessage();
  this.pause();
  while (true) {
    this.playMatch();
    if (!this.playAgain()) break;
    this.resetScores();
  }
  this.displayGoodbyeMessage();
};


function Player () {
  this.move = null;
  this.score = 0;
}

Player.prototype.resetScore = function() {
  this.score = 0;
};

Player.prototype.incrementScore = function() {
  this.score += 1;
};


function Human() {
  Player.call(this);
  this.moves = [];
}

Object.setPrototypeOf(Human.prototype, Player.prototype);

Human.prototype.getMoves = function () {
  return this.moves;
};

Human.prototype.choose = function () {
  let choice;
  while (true) {
    console.log('Please choose rock, paper, scissors, lizard, or spock:');
    choice = readline.question().trim();
    if (choice && (choice.toLowerCase()[0] === 'r')) {
      this.move = 'rock';
      break;
    } else if (choice && (choice.toLowerCase()[0] === 'p')) {
      this.move = 'paper';
      break;
    } else if (choice && (choice.toLowerCase().slice(0,2) === 'sc')) {
      this.move = 'scissors';
      break;
    } else if (choice && (choice.toLowerCase()[0] === 'l')) {
      this.move = 'lizard';
      break;
    } else if ((choice && choice.toLowerCase().slice(0,2) === 'sp')) {
      this.move = 'spock';
      break;
    }
    console.log('Sorry, invalid choice.');
  }
  this.moves.push(this.move);
};


function Computer() {
  Player.call(this);
}

Object.setPrototypeOf(Computer.prototype, Player.prototype);

Computer.prototype.choose = function (opponent) {
  const opponentmoves = opponent.getMoves();
  if (opponentmoves.length === 0) {
    this.move = this.chooseRandomly(MOVES.choices);
  } else {
    this.move = this.chooseRandomlyByWeight(opponentmoves);
  }
};

Computer.prototype.chooseRandomly = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

Computer.prototype.chooseRandomlyByWeight = function (arr) {
  const weightedHumanChoice = this.chooseRandomly(arr);
  return this.chooseRandomly(MOVES.hierarchy[weightedHumanChoice].losesTo);
};

const rpsGame = new RPSGame();
rpsGame.play();