const readline = require('readline-sync');

const MOVES = {
  choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  heirarchy: {
    rock: { beats: ['lizard', 'scissors'], losesTo: ['paper', 'spock']}, // crushes lizard, crushes scissors
    paper: { beats: ['rock', 'spock'], losesTo: ['scissors', 'lizard']},//covers rock. disproves spock
    scissors: { beats: ['paper', 'lizard'], losesTo: ['spock', 'rock']},  //cuts paper, decapitates lizard
    lizard: { beats: ['spock', 'paper'], losesTo: ['rock', 'scissors']}, //poisons spock, eats paper
    spock: { beats: ['scissors', 'rock'], losesTo: ['paper', 'lizard']}, //smashes scissors, vaporizes rock
  },
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, we are playing best of 5.');
  },

  displayScore() {
    console.log(`Current score: you {${this.human.score}}, computer {${this.computer.score}}`);
  },

  resetScores() {
    this.human.resetScore();
    this.computer.resetScore();
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (humanMove === computerMove) {
      console.log("It's a tie");
    } else if (MOVES.heirarchy[humanMove].beats.includes(computerMove)) {
      console.log('You win this round!');
      this.human.incrementScore();
    } else {
      console.log('Computer wins this round!');
      this.computer.incrementScore();
    }
  },

  displayMatchWinner() {
    console.clear();
    this.displayScore();
    console.log((this.human.score === 5) ? 'You win!' : 'Computer wins!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  playMatch() {
    while (true) {
      this.displayScore();
      this.computer.choose(this.human);
      this.human.choose();
      this.displayRoundWinner();
      if (this.human.score === 5 || this.computer.score === 5) break;
    }
    this.displayMatchWinner();
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      this.playMatch();
      if (!this.playAgain()) break;
      this.resetScores();
    }
    console.log(this.human.moves);
    this.displayGoodbyeMessage();
  }
};

RPSGame.play();

function createHuman() {
  return { move: null,
    moves:[],
    score: 0,
    choose() {
      let choice;
      while (true) {
        console.log('Please choose rock, paper, scissors, lizard, or spock:');
        choice = readline.question();
        if (MOVES.choices.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }
      this.move = choice;
      this.moves.push(choice);
    },
    incrementScore() { this.score += 1},
    resetScore() {this.score = 0},
    getmoves() {return this.moves},
  };
}

function createComputer() {
  return {
    move: null,
    score: 0,

    choose(opponent) {
      const opponentmoves = opponent.getmoves();
      if (opponentmoves.length === 0) {
        this.move = chooseRandomly(MOVES.choices);
      } else {
        const opponentChoiceRoll = chooseRandomlyByWeight(opponentmoves);
        this.move = chooseRandomly(MOVES.heirarchy[opponentChoiceRoll].losesTo);
      }
    },
    incrementScore() {this.score += 1},
    resetScore() {this.score = 0},
  };
}

function chooseRandomly(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function arrToWeightedMap(arr) {
  const arrMap = {};
  arr.forEach(element => {
    if (arrMap[element]) arrMap[element] += 1;
    else arrMap[element] = 1;
  });
  const keys = Object.keys(arrMap);
  const weightedMap = [keys, []];
  let trailingStackedPercent = 0;
  keys.forEach(key => {
    const percent = arrMap[key] / arr.length;
    weightedMap[1].push(percent + trailingStackedPercent);
    trailingStackedPercent += percent;
  });
  return weightedMap;
}

function chooseRandomlyByWeight(arr) {
  const weightedMap = arrToWeightedMap(arr);
  const random = Math.random();
  for (let index = 0; index < weightedMap[1].length; index++) {
    if (random < weightedMap[1][index]) return weightedMap[0][index];
  }
  console.log('this be EXTREMELY improbable, throw excpetion?');
  console.log(weightedMap);
  return weightedMap[1].pop();
}