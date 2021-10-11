const readline = require('readline-sync');
const {Deck} = require('./deck.js');
const {Player} = require('./player.js');
let playToValue = {blackJackValue : 21};
let dealerStayValue = 17;
const players = [];
const dealer = new Player(playToValue, 'Dealer');
const BET = 5;

let deck;

function play() {
  generateGameParameters();
  while (true) {
    deck = new Deck(players.length);
    deck.shuffle();
    playARound();
    console.log('Continue playing?');
    let playerChoice = readline.question(`(Select 'n' to end game)\n=> `).trim();
    if (playerChoice && (playerChoice[0].toLowerCase() === 'n')) {
      players.forEach(player => farewell(player));
      break;
    }
  }
}

function playARound() {
  const state = {continueGame : true};

  placeBets(players);
  dealInitialHand();

  processBlackjacks(state);
  if (!state.continueGame) return;

  playersHitOrStay(state);
  if (!state.continueGame) return;

  dealerHitOrStay(state);
  if (!state.continueGame) return;

  adjudicateBets();
  clearTable();
}

function farewell(player) {
  const winnings = player.chips - 100;
  const message = (winnings >= 0) ? `you won $${winnings}, great job human 😀` : `you lost $${Math.abs(winnings)}, better luck next time human 😀`;
  console.log(`Farewell player ${player.name}, ${message}`);
}

function adjudicateBets() {
  let messages = [];
  getPlayersIn().forEach(player => {
    if (player.hand.value <= dealer.hand.value) {
      messages.push(processPlayerLoss(player));
    } else {messages.push(processPlayerWin(player))}
  });
  dealer.hand.resetHand();
  displayTable();
  logPause(messages.join('\n'));
}

function dealerHitOrStay(state) {
  dealer.hand.setToFaceUp();
  displayTable();
  logPause(`Dealer shows ${dealer.hand.value}`);
  if ((dealer.hand.value < dealerStayValue)) {
    dealPlayerCard(dealer,true);
    displayTable();
    if (isPlayerBust(dealer)) {
      processDealerBust();
      state.continueGame = false;
    } else {
      dealerHitOrStay(state);
    }
  } else {
    logPause(`Dealer chooses to stay with ${dealer.hand.value}`);
  }
}

function playersHitOrStay(state) {
  const playersIn = getPlayersIn();
  displayTable();
  logPause(`First player to bid is ${playersIn[0].name}`);
  playersIn.forEach(player => {
    playerHitOrStay(player);
    const currentIndex = playersIn.indexOf(player);
    if (playersIn.indexOf(player) < playersIn.length - 1) {
      displayTable();
      logPause(`Next Player to bid is ${playersIn[currentIndex + 1].name}`);
    }
  });
  displayTable();
  if (getPlayersIn().length === 0) {
    state.continueGame = false;
    dealer.hand.resetHand();
    console.log('No players remain in game, proceed to next hand...');
  }
}

function playerHitOrStay(player) {
  let playerChoice;
  while (true) {
    displayPlayerInterface(player);
    playerChoice = readline.question(`Does ${player.name} choose to hit?: y/n\n=> `).trim();
    if (playerChoice && (playerChoice[0].toLowerCase() === 'y')) {
      dealPlayerCard(player, true);
      if (isPlayerBust(player)) {
        displayPlayerInterface(player);
        processPlayerBust(player);
        break;
      }
    } else if (playerChoice && (playerChoice[0].toLowerCase() === 'n')) {
      logPause(`Player ${player.name} chooses to stay.`);
      break;
    } else {
      logPause(`Player selected ${playerChoice}, please choose 'yes' or 'no.'`);
    }
  }
}

function displayPlayerInterface(player) {
  console.clear();
  console.log(`Player: ${player.name}`);
  console.log(`Player hand: [Bid: ${player.bid}] ${player.hand.displayHand()}`);
  console.log(`Dealer hand: ${' '.repeat(8)} ${dealer.hand.displayHand()}\n`);
  console.log(`Player ${player.name} currently shows ${player.hand.value}`);
}

function isPlayerBust(player) {
  return player.hand.value > playToValue.blackJackValue;
}

function processPlayerBust(player) {
  console.log(`Player hand shows ${player.hand.value}, this exceeds ${playToValue.blackJackValue}, dealer wins.`);
  logPause(`Player bid of $${player.bid} is transferred to dealer`);
  transferChips(player, dealer);
  player.hand.resetHand();
}

function processDealerBust() {
  logPause(`Dealer hand shows ${dealer.hand.value}, this exceeds ${playToValue.blackJackValue}, dealer is bust`);
  let messages = [];
  getPlayersIn().forEach(player =>
    messages.push(processPlayerWin(player))
  );
  dealer.hand.resetHand();
  displayTable();
  logPause(messages.join('\n'));
}

function processPlayerWin(player) {
  const message = `Player ${player.name}'s winnings of ${player.bid} has been distributed to player`;
  transferChips(dealer, player);
  player.hand.resetHand();
  return message;
}

function processPlayerLoss(player) {
  const message = `Player ${player.name}'s bid of ${player.bid} has been distributed to dealer`;
  transferChips(player, dealer);
  player.hand.resetHand();
  return message;
}

function processBlackjacks(state) {
  displayTable();
  logPause(`Checking for blackjack...`);
  if (dealer.hand.hasBlackjack()) {
    processDealerBlackjack();
    state.continueGame = false;
    clearTable();
  } else {
    processPlayersBlackjacks();
    if (getPlayersIn().length === 0) {
      state.continueGame = false;
      clearTable();
    }
  }
}

function processDealerBlackjack() {
  dealer.hand.setToFaceUp();
  players.forEach(player => {
    processPlayerLoss(player);
  });
  displayTable();
  logPause(`Dealer has blackjack, chips have been distributed`);
}

function processPlayersBlackjacks() {
  let messages = [];
  let message;
  players.forEach(player => {
    if (player.hand.hasBlackjack()) {
      const message = processPlayerWin(player);
      messages.push(`${player.name} has blackjack\n${message}`);
    }
  });
  if (messages.length > 0) {
    message = messages.join('\n');
  } else {
    message = 'There are no blackjacks';
  }
  displayTable();
  logPause(message);
}


function transferChips(fromPlayer, toPlayer) {
  if (fromPlayer === dealer) {
    fromPlayer.chips -= toPlayer.bid;
    toPlayer.chips += 2 * toPlayer.bid;
    toPlayer.bid = 0;
  } else {
    toPlayer.chips += fromPlayer.bid;
    fromPlayer.bid = 0;
  }
}

function getPlayersIn() {
  return players.filter(player => !player.hand.isEmpty());
}

function dealInitialHand() {
  displayTable();
  logPause(`Dealing hand...`);
  players.forEach(player => dealPlayerCard(player, true));
  dealPlayerCard(dealer);
  players.forEach(player => dealPlayerCard(player, true));
  dealPlayerCard(dealer, true);
}

function dealPlayerCard(player, faceUp = false) {
  player.hand.addCard(deck.dealCard(faceUp));
}

function placeBets(players) {
  displayTable();
  logPause(`Placing bets...`);
  players.forEach(player => {
    player.bid += BET;
    player.chips -= BET;
  });
}

function clearTable() {
  players.forEach(player => player.hand.resetHand());
  dealer.hand.resetHand();
}

function displayTable() {
  console.clear();
  const tableWidth = 60;
  const border = ' '.repeat(tableWidth);
  console.log(`${border}`);
  players.forEach(player =>
    console.log(`${player.displayPlayerInfo()} [Bid: $${player.bid}] ${player.hand.displayHand()}\n`)
  );
  console.log(`${dealer.displayPlayerInfo()} ${' '.repeat(8)} ${dealer.hand.displayHand()}\n`);
  console.log(`${border}`);
}

function generateGameParameters() {
  const numberOfPlayers = generateNumberOfPlayers();
  for (let index = 0; index < numberOfPlayers; index++) {
    console.clear();
    console.log(`Let's create player ${index + 1}`);
    players.push(new Player(playToValue));
  }
  dealer.chips = players.length * 2 * 100;
  generatePlayToValue();
  generateDealerStayValue();
}

function generatePlayToValue() {
  console.clear();
  console.log('So, do you actually want to play to 21: y/n');
  while (true) {
    const useDefault = readline.question(`(To choose the default of 21 enter 'y', entering 'n' will prompt you to input a new value)\n=> `).trim();
    if (useDefault && useDefault[0].toLowerCase() === 'y') {
      return;
    } else if (useDefault && useDefault[0].toLowerCase() === 'n') break;
    else {
      console.log("Please choose 'y' or 'n'. Do you want to use the default value of 21?: y/n?");
    }
  }

  const question = 'What number do you want to use in place of 21?';
  const lowerBound = 20;
  const upperBound = 100;
  const integerUse = 'play to value';
  playToValue.blackJackValue = getIntegerFromUser(
    question, lowerBound, upperBound, integerUse);
}

function generateDealerStayValue() {
  console.clear();
  console.log(`You have selected a play to value of ${playToValue.blackJackValue}`);
  console.log('Do you want set the dealer stay value?: y/n');
  while (true) {
    const useDefault = readline.question(`(To choose the default of 17 enter 'n', entering 'y' will prompt you to input a new value)\n=> `).trim();
    if (useDefault && useDefault[0].toLowerCase() === 'n') {
      return;
    } else if (useDefault && useDefault[0].toLowerCase() === 'y') break;
    else {
      console.log("Please choose 'y' or 'n'. Do you want to use the default value of 17?: y/n?");
    }
  }

  const question = 'At what value should the dealer stay?';
  const lowerBound = 0;
  const upperBound = playToValue.blackJackValue;
  const integerUse = 'dealer stay value';
  dealerStayValue = getIntegerFromUser(
    question, lowerBound, upperBound, integerUse);
}

function generateNumberOfPlayers() {
  const question = 'Welcome to twenty-one, how many people are playing today?';
  const lowerBound = 1;
  const upperBound = 6;
  const integerUse = 'number of players';
  return getIntegerFromUser(question, lowerBound, upperBound, integerUse);
}

function getIntegerFromUser(question, lowerBound, upperBound, integerUse) {
  let num;
  console.clear();
  while (true) {
    let msg;
    num = readline.question(`${question}\n=> `).trim();
    num = Number(num);
    if (!Number.isInteger(num) || num < lowerBound || num > upperBound) {
      msg = `You entered ${num}, I need the number of players to be an integer between ${lowerBound} and ${upperBound}`;
    } else {
      console.clear();
      let goodWithNumber = readline.question(`I have the ${integerUse} as '${num}', are you happy with that?: y/n\n=> `).trim();
      if (goodWithNumber && (goodWithNumber[0].toLowerCase() === 'y')) break;
    }
    console.clear();
    if (msg) console.log(msg);
    console.log("Let's grab that number again...");
  }
  return num;
}

function pause() {
  readline.question('Hit Enter key to continue.', {hideEchoBack: true, mask: ''});
}

function logPause(message) {
  console.log(message);
  pause();
}

exports.play = play;