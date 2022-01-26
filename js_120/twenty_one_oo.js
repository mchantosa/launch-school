let readline = require("readline-sync");

class Card {
  static SUITS = {
    clubs: '♣',
    diamonds: '♦',
    hearts: '❤',
    spades: '♠',
  };
  static RANKS = {
    2: [2],
    3: [3],
    4: [4],
    5: [5],
    6: [6],
    7: [7],
    8: [8],
    9: [9],
    10: [10],
    J: [10],
    Q: [10],
    K: [10],
    A: [11, 1]
  }
  static BACK = '[😁]'

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.face = `[${this.rank} ${Card.SUITS[this.suit]}]`;
    this.value = Card.RANKS[this.rank];
    this.faceUp = false;
  }

  show() {
    this.faceUp = true;
  }

  toString() {
    if (this.faceUp) return this.face;
    else return Card.BACK;
  }

  isAce() {
    return (this.rank === 'A');
  }
}

class Deck {

  constructor() {
    this.cards = [];
    for (let suit in Card.SUITS) {
      for (let rank in Card.RANKS) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  printDeck() { // for testing, delete later
    this.cards.forEach(card => console.log(card.face));
  }

  shuffle() {
    let newCards = [];
    while (this.cards.length > 0) {
      let index = Math.floor(Math.random() * this.cards.length);
      newCards.push(...this.cards.splice(index, 1));
    }
    this.cards = newCards;
  }

  getACard() {
    return this.cards.pop();
  }
}

class Hand {
  constructor() {
    this.cards = [];
    this.value = 0;
  }

  toString() {
    let stringHand = '';
    this.cards.forEach(card => {
      stringHand += card;
    });
    return stringHand;
  }

  addCard(card, faceUp = true) {
    if (faceUp) card.show();
    this.cards.push(card);
    this.setValue();
  }

  setValue() {
    let value = 0;
    let aces = 0;

    this.cards.forEach(card => {
      value += card.value[0];
      if (card.isAce()) aces += 1;
    });

    if (aces > 0) {
      for (let index = 0; index < aces; index++) {
        if (value > 21) value -= 10;
      }
    }
    this.value = value;
  }

  show() {
    this.cards.forEach(card => card.show());
  }

  isShowing() {
    return this.cards.every(card => card.faceUp === true);
  }

  reset() {
    this.cards = [];
    this.value = 0;
  }

  isBust() {
    return this.value > 21;
  }
}

class Participant {
  constructor() {
    this.hand = new Hand();
  }

  hasBlackJack() {
    return (this.hand.value === 21) && (this.hand.cards.length === 2);
  }

  resetHand() {
    this.hand.reset();
  }

  getHandValue() {
    return this.hand.value;
  }

  hit(round) {
    round.dealer.dealACard(this);
  }

  handIsBust() {
    return this.hand.isBust();
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.bankroll = 100;
    this.bet = null;

  }

  placeBet(amt) {
    this.bet = amt;
    this.bankroll -= amt;
  }

  clearBet(round, resolution) {
    if (round.STATE.winner === this) {
      this.bankroll += (this.bet + (resolution * this.bet));
    }
    this.bet = 0;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.deck = null;
  }

  setDeck(deck) {
    this.deck = deck;
  }

  deal(player) {
    this.dealACard(player);
    this.dealACard(this);
    this.dealACard(player);
    this.dealACard(this, false);
  }

  dealACard(player, faceUp = true) {
    player.hand.addCard(this.deck.getACard(), faceUp);
  }

  isHandShowing() {
    return this.hand.isShowing();
  }

  showHand() {
    this.hand.show();
  }
}

class Round {
  static RESOLUTION = {
    standard: 1,
    double: 2,
    push: 0,
  }

  constructor(game) {
    this.gameState = game.STATE;
    this.player = game.player;
    this.dealer = game.dealer;

    this.deck = new Deck();
    this.deck.shuffle();
    this.dealer.setDeck(this.deck);
    //this.dealer.deck.cards = blackJackTestDeck; //testing, delete

    this.STATE = {
      continueRound:  true,
      winner: null,
    };

  }

  start() {
    this.displayTable();
    this.placeBet();
    if (!this.gameState.continueGame) return;

    this.dealer.deal(this.player);
    this.displayTable();

    this.processBlackJacks();
    if (!this.STATE.continueRound) return;

    this.playerTurn();
    if (!this.STATE.continueRound) return;

    this.dealerTurn();
  }

  displayTable() {
    const playerBet = this.player.bet;
    const playerHandVal = this.player.getHandValue();
    const dealerHandVal = this.dealer.getHandValue();

    console.clear();
    console.log(`Current bet: ${(playerBet) ? playerBet : 'None'}`);
    console.log('');
    console.log(`Player: ${(playerHandVal) ? playerHandVal : ''}`);
    console.log(`   Bankroll: $${this.player.bankroll}`);
    console.log(`   Hand: ${this.player.hand}`);
    console.log('');
    console.log(`Dealer: ${(dealerHandVal && this.dealer.isHandShowing()) ? dealerHandVal : ''}`);
    console.log(`   Hand: ${this.dealer.hand}`);
    console.log('');
  }

  displayTableWithPause(msg) {
    this.displayTable();
    pause(msg);
  }

  placeBet() {
    if (this.player.bankroll === 0) {
      this.endRoundBankrollDepleted();
    } else {
      const msg = `How much would you like to bet? Please enter an integer value.\n=> `;
      let bet;
      while (true) {
        bet = parseInt(readline.question(msg), 10);
        if (Number.isNaN(bet) || (bet <= 0)) {
          this.displayTable();
          console.log(`Invalid entry`);
        } else if (bet > this.player.bankroll) {
          this.displayTable();
          console.log(`Insifficient funds`);
        } else break;
      }
      this.player.placeBet(bet);
    }
  }

  processBlackJacks() {
    const dealerHasBlackJack = this.dealer.hasBlackJack();
    const playerHasBlackJack = this.player.hasBlackJack();
    if (dealerHasBlackJack) this.dealer.showHand();

    if (dealerHasBlackJack || playerHasBlackJack) {
      if (dealerHasBlackJack && playerHasBlackJack) {
        this.endRound(this.player,
          `Dealer and Player have blackjack, it's a push \nPress enter to continue`,
          Round.RESOLUTION.push);
      } else if (dealerHasBlackJack) {
        this.endRound(this.dealer,
          `Dealer has blackjack, dealer wins \nPress enter to continue`);
      } else {
        this.endRound(this.player,
          `Player has blackjack, player wins double \nPress enter to continue`,
          Round.RESOLUTION.double);
      }
    }
  }

  playerTurn() {
    while (true) {
      if (this.player.getHandValue() < 21) {
        if (this.askPlayerHit()) {
          this.player.hit(this);
          this.displayTable();
        } else break;
      } else if (this.player.handIsBust()) {
        this.endRound(this.dealer, `Player's hand is bust, dealer wins round\nPress enter to continue`);
        break;
      } else {
        this.displayTableWithPause(`Player is showing 21\nPress enter to continue`);
        break;
      }
    }
  }

  dealerTurn() {
    this.dealer.showHand();
    this.displayTable();
    pause(`Dealer shows ${this.dealer.getHandValue()}\nPress enter to continue`);
    while (true) {
      if (this.dealer.getHandValue() < 17) {
        this.dealer.hit(this);
      } else if (this.dealer.handIsBust()) {
        this.endRound(this.player, `Dealer's hand is bust, you win round\nPress enter to continue`);
        break;
      } else {
        const winner = (this.player.getHandValue() > this.dealer.getHandValue())
          ? this.player : this.dealer;
        const winnerTitle = (winner === this.player) ? 'player' : 'dealer';
        const msg = `Dealer stays at ${this.dealer.getHandValue()}, ${winnerTitle} wins round\nPress enter to continue`;
        this.endRound(winner,msg);
        break;
      }
    }
  }

  updateSTATE(continueRound, winner) {
    this.STATE.continueRound = continueRound;
    this.STATE.winner = winner;
  }

  updateGameSTATE(continueGame) {
    this.gameState.continueGame = continueGame;
  }

  endRound(winner, msg, resolution = Round.RESOLUTION.standard) {
    this.updateSTATE(false, winner);
    this.displayTableWithPause(msg);
    this.player.clearBet(this, resolution);
    this.player.resetHand();
    this.dealer.resetHand();
    this.displayTable();
    if (this.player.getHandValue()) this.askPlayAnotherRound();
  }

  endRoundBankrollDepleted() {
    this.updateGameSTATE(false);
    this.displayTable();
    this.displayTableWithPause(`Player is bankroll is 0, player is bust\nPress enter to continue`);
  }

  askPlayAnotherRound() {
    const replies = ['y', 'n'];
    const updatedMsg = `Play another round? ${replies.join(' or ')}:\n=> `;
    this.updateGameSTATE(this.askBool(updatedMsg, replies));
  }

  askPlayerHit() {
    const replies = ['h', 's'];
    const msg = `Player shows ${this.player.getHandValue()}, would you like to hit or stay? ${replies.join(' or ')}\n=> `;
    return this.askBool(msg, replies);
  }

  askBool(msg, replies) {
    let choice;
    while (true) {
      choice = readline.question(msg)[0];
      if (!choice || !replies.includes(choice.toLowerCase())) msg = `invalid choice, please choose ${replies[0]} or ${replies[1]}:\n=> `;
      else break;
    }
    return choice === replies[0];
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.STATE = {continueGame: true};
  }

  start() {
    this.displayWelcomeMessage();

    while (this.STATE.continueGame) {
      let round = new Round(this);
      round.start();
    }

    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Greetings Hooman, welcome to 21');
    console.log('You have a bankroll of $100');
    console.log('');
    pause('Ready to play? Please hit Enter to continue.');
  }

  displayGoodbyeMessage() {
    console.clear();
    console.log('Farewell Hooman, thank you for playing 21');
    console.log('');
  }
}

function pause(msg = 'Hit Enter key to continue.') {
  readline.question(msg, {hideEchoBack: true, mask: ''});
}

let game = new TwentyOneGame();
game.start();