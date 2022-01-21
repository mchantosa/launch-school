let readline = require("readline-sync");

class Square {

  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[counter] = new Square();
    }
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"].marker}  |  ${this.squares["2"].marker}  |  ${this.squares["3"].marker}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"].marker}  |  ${this.squares["5"].marker}  |  ${this.squares["6"].marker}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"].marker}  |  ${this.squares["8"].marker}  |  ${this.squares["9"].marker}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  randomlyMarkSquareAt(keys, marker) {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    this.markSquareAt(randomKey, marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.wins = 0;
  }

  getMarker() {
    return this.marker;
  }

  updateWins() {
    this.wins += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }

  moves(game) {

    const self = game;
    let choice;

    while (true) {
      let validChoices = self.board.unusedSquares();

      const prompt = `Choose a square (${self.constructor.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    self.board.markSquareAt(choice, self.human.getMarker());
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }

  moves(game) {
    const self = game;
    const winningMoves = self.findWinningMoves(self.computer);
    const defensiveMoves = self.findWinningMoves(self.human);
    const validChoices = self.board.unusedSquares();
    const marker = self.computer.marker;
    if (winningMoves.length > 0) {
      self.board.randomlyMarkSquareAt(winningMoves, marker);
    } else if (defensiveMoves.length > 0) {
      self.board.randomlyMarkSquareAt(defensiveMoves, marker);
    } else if (validChoices.includes('5')) {
      self.board.markSquareAt('5', marker);
    } else {
      self.board.randomlyMarkSquareAt(validChoices, marker);
    }
  }
}

class TTTGame {

  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.goesFirst = Math.floor(Math.random() * 2);
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.playRound();
      if ((this.human.wins === 3) || (this.computer.wins === 3)) {
        this.bestOf3Message();
        break;
      }
      if (!this.playAgain()) break;
      this.resetBoard();
      this.board.displayWithClear();
    }
    this.displayGoodbyeMessage();
  }

  playRound() {
    let turn = this.goesFirst;
    this.updateGoesFirst();
    this.board.display();

    while (true) {
      const player = this.getPlayer(turn);
      player.moves(this);
      if (this.gameOver()) {
        if (this.isWinner(player)) player.updateWins();
        break;
      }
      turn = (turn + 1) % 2;
      this.board.displayWithClear();
    }
    this.board.displayWithClear();
    this.displayResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    const player = (this.goesFirst === 0) ? 'you' : 'I';
    console.log(`First player selected randomly, ${player} go first`);
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
    console.log(`Score: You [${this.human.wins}], Me: [${this.computer.wins}]`);
  }

  getPlayer(turn) {
    return (turn === 0) ? this.human : this.computer;
  }

  updateGoesFirst() {
    this.goesFirst = (this.goesFirst + 1) % 2;
  }

  gameOver() {
    return this.boardIsFull() || this.someoneWon();
  }

  boardIsFull() {
    let unusedSquares = this.board.unusedSquares();
    return unusedSquares.length === 0;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  findWinningMoves(player) {
    const defensiveKeys = [];
    const unusedSquares = this.board.unusedSquares();
    TTTGame.POSSIBLE_WINNING_ROWS.forEach(row => {
      if (this.board.countMarkersFor(player, row) === 2) {
        row.forEach(key => {
          if (unusedSquares.includes(key)) {
            defensiveKeys.push(key);
          }
        });
      }
    });
    return defensiveKeys;
  }

  playAgain() {
    let choice;

    while (true) {
      const prompt = `Would you like to play again? (y, n): `;
      choice = readline.question(prompt).toLowerCase();
      if (['y', 'n'].includes(choice)) break;

      console.log("Sorry, that's not a valid choice, please choose 'y' or 'n'.");
      console.log("");
    }

    return choice === 'y';
  }

  resetBoard() {
    this.board = new Board();
  }

  bestOf3Message() {
    if (this.human.wins === 3) {
      console.log(`You have won best of 5, you are victorious!`);
    } else {
      console.log(`I have won best of 5, I am victorious!`);
    }
  }

  static joinOr (arr, sep = ', ', conj = 'or') {
    if (arr.length === 1) return arr.toString();
    if (arr.length === 2) return arr.join(` ${conj} `);
    const arrFront = arr.slice();
    const arrEnd = arrFront.pop();
    return arrFront.join(`${sep}`) + `${sep}${conj} ` + arrEnd;
  }
}

function pause() {
  readline.question('Hit Enter key to continue.', {hideEchoBack: true, mask: ''});
}

let game = new TTTGame();
game.play();