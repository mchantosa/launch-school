const readline = require("readline-sync");

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function joinOr(arr, joiner = ', ', endJoiner = 'or') {
  if (arr.length > 1) {
    return [arr.slice(0, arr.length - 1).join(joiner), arr[arr.length - 1]]
      .join(` ${endJoiner} `);
  }
  return arr.join();
}

function displayHeader(scoreBoard) {
  console.log('Greetings human, welcome to tic tac toe!');
  console.log('We are playing best of 5');
  console.log(`You: ${scoreBoard.Player}, Me ${scoreBoard.Computer}`);
  console.log(`You are ${HUMAN_MARKER}, I am ${COMPUTER_MARKER}`);
}

function displayBody(board) {
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function displayBoard(scoreBoard, board) {
  displayHeader(scoreBoard);
  displayBody(board);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}

function returnRandomElement(Arr) {
  const randomIndex = Math.floor(Math.random() * Arr.length);
  return Arr[randomIndex];
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square ${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function detectWin(board, player) {
  let playerMarker = (player === 'Computer') ? COMPUTER_MARKER : HUMAN_MARKER;
  let returnPositions = [];
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let trio = WINNING_LINES[index];
    let boardTrio = [ board[String(trio[0])],
      board[String(trio[1])],
      board[String(trio[2])]
    ];
    if (boardTrio.filter(element => element === playerMarker).length === 2) {
      if (boardTrio.includes(INITIAL_MARKER)) {
        const winElement = trio[boardTrio.indexOf(INITIAL_MARKER)];
        if (!returnPositions.includes(winElement)) {
          returnPositions.push(winElement);
        }
      }
    }
  }
  return returnPositions;
}

function detectNWayWin(board, player) {
  const choices = emptySquares(board);
  const returnPositions = [];
  for (let index = 0; index < choices.length; index++) {
    let projection = Object.assign({}, board);
    projection[choices[index]] = (player === 'Computer') ? COMPUTER_MARKER : HUMAN_MARKER;
    if (detectWin(projection,player).length > 1) {
      returnPositions.push(choices[index]);
    }
  }
  return returnPositions;
}

function counterTrapPlay(board, playTactics, player) {
  const choices = emptySquares(board);
  const returnPositions = [];
  const avoidFilter = playTactics.opponentTrapPlay;
  for (let index = 0; index < choices.length; index++) {
    let projection = Object.assign({}, board);
    projection[choices[index]] = (player === 'Computer') ? COMPUTER_MARKER : HUMAN_MARKER;
    const projectedWin = detectWin(projection, player);
    if (projectedWin.filter(
      element => !avoidFilter.includes(element)).length > 0
    ) {
      if (!returnPositions.includes(choices[index])) {
        returnPositions.push(choices[index]);
      }
    }
  }
  return returnPositions;
}

function forcedTrapPlay(board, player) {
  const choices = emptySquares(board);
  const returnPositions = [];
  for (let index = 0; index < choices.length; index++) {
    let projection = Object.assign({}, board);
    projection[choices[index]] = (player === 'Computer') ? COMPUTER_MARKER : HUMAN_MARKER;
    let nWayWin = detectNWayWin(projection, player);
    if (nWayWin.length > 2) returnPositions.push(choices[index]);
  }
  return returnPositions;
}

function counterForcedTrapPlay(board) {
  const choices = emptySquares(board);
  const filter = [];
  for (let index = 0; index < choices.length; index++) {
    let projection = Object.assign({}, board);
    projection[choices[index]] = COMPUTER_MARKER;
    const playerForcedTrapPlay = forcedTrapPlay(projection, 'Player');
    if (playerForcedTrapPlay.length > 0) filter.push(choices[index]);
  }
  return filter;
}

function executeStrategy(board, playTactics) {
  const choices = emptySquares(board);
  if (playTactics.winningPlay.length > 0) {
    return returnRandomElement(playTactics.winningPlay);
  } else if (playTactics.opponentWin.length > 0) {
    return returnRandomElement(playTactics.opponentWin);
  } else if (playTactics.trapPlay.length > 0) {
    return returnRandomElement(playTactics.trapPlay);
  } else if (playTactics.opponentTrapPlay.length > 0) {
    const counterTrapMove = counterTrapPlay(board, playTactics, 'Computer');
    return returnRandomElement(counterTrapMove);
  } else if (choices.includes('5')) return '5';
  else if (playTactics.twoStepTrapPlay.length > 0) {
    return returnRandomElement(playTactics.twoStepTrapPlay);
  } else return returnRandomElement(choices);
}

function computerChoosesSquare(board) {
  const playTactics = {
    winningPlay: detectWin(board, 'Computer'),
    opponentWin: detectWin(board, 'Player'),
    trapPlay: detectNWayWin(board, 'Computer'),
    opponentTrapPlay: detectNWayWin(board, 'Player'),
    twoStepTrapPlay: forcedTrapPlay(board, 'Computer'),
    opponentTwoStepTrapPlay: counterForcedTrapPlay(board)
  };
  let choice = executeStrategy(board, playTactics);
  board[choice] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];
    if (
      board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ) return 'Player';
    else if (
      board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
    ) return 'Computer';
  }
  return null;
}

function someoneChoosesSquare(board, someone) {
  if (someone === 'Player') playerChoosesSquare(board);
  else computerChoosesSquare(board);
}

function processRound(scoreBoard, board) {
  updateGameData(scoreBoard, board);
  displayBoard(scoreBoard, board);
  while (true && scoreBoard.Player < scoreBoard.GAMES_TO_WIN &&
    scoreBoard.Computer < scoreBoard.GAMES_TO_WIN) {
    prompt(`${outputRoundResults(board)}, ready to go again?`);
    let proceed = readline.question().trim();
    if ((proceed.length === 0) || (proceed[0].toLowerCase() !== 'y')) {
      console.log ("You should say 'y', I haven't added an exit point here 😁");
    } else break;
  }
}

function playRound(scoreBoard, board, goesFirst = 'Player') {
  const someone = ['Player', 'Computer'];
  let index;
  if (goesFirst === 'random') index = Math.floor(Math.random() * 2);
  else index = (goesFirst === 'Player') ? 0 : 1;
  while (true) {
    displayBoard(scoreBoard, board);
    someoneChoosesSquare(board, someone[index]);
    if (someoneWon(board) || boardFull(board)) break;
    index = (index + 1) % 2;
  }
  processRound(scoreBoard, board);
}

function outputRoundResults(board) {
  if (someoneWon(board)) return `${(detectWinner(board) === 'Computer') ? 'I' : 'You'} won!`;
  return "It's a tie!";
}

function updateGameData(scoreBoard, board) {
  scoreBoard[detectWinner(board)]++;
}

function detectGameWin(scoreBoard) {
  return [scoreBoard.Player, scoreBoard.Computer]
    .includes(scoreBoard.GAMES_TO_WIN);
}

function playGame(bestOf = 5, goesFirst = 'Player') {
  const scoreBoard = {
    Player: 0,
    Computer: 0,
    GAMES_TO_WIN: Math.ceil(bestOf / 2)};
  while (true) {
    let board = initializeBoard();
    playRound(scoreBoard, board, goesFirst);
    if (detectGameWin(scoreBoard)) break;
  }
  return scoreBoard;
}

function publishGameResults(scoreBoard) {
  console.clear();
  const winner = (scoreBoard.Computer > scoreBoard.Player) ? 'Computer' : 'Player';
  console.log(`Final score: Me [${scoreBoard.Computer}], You [${scoreBoard.Player}]`);
  if (winner === 'Player') console.log('Great job Human, you are victorious... for now!');
  else console.log('Yay, I am a winner');
}

function playAgain() {
  prompt('Play again?');
  let answer = readline.question().toLowerCase()[0];
  return answer === 'y';
}

while (true) {
  console.log("Greetings human, let us tic tac toe!");
  console.log("Let me first grab some game parameters...");
  let bestOf;
  while (true) {
    prompt("How many games should we play? (You should consider entering an odd integer)");
    bestOf = Number(readline.question().trim());
    if (bestOf % 2 === 1) break;
    else console.log('That is not a valid response, we need an odd integer.');
  }
  let goesFirst = 0;
  while (true) {
    prompt("Who should go first? (Enter: human, computer, or random)");
    goesFirst = readline.question().trim();
    if (['h', 'c', 'r'].includes(goesFirst[0].toLowerCase())) break;
    else console.log("That is not a valid response, you to enter 'human', 'computer', or 'alternating'");
  }
  if (goesFirst[0].toLowerCase() === 'h') goesFirst = 'Player';
  else if (goesFirst[0].toLowerCase() === 'c') goesFirst = 'Computer';
  else goesFirst = 'random';
  let scoreBoard = playGame(bestOf, goesFirst);
  publishGameResults(scoreBoard);
  if (!playAgain()) break;
}


prompt('Thanks for playing Tic Tac Toe!');