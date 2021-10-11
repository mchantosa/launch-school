const {Card, suits, ranks} = require('./card.js');

const Deck = class {

  constructor(numberOfDecks = 1) {
    this.cards = this.initialize(Number(numberOfDecks));
  }

  initialize(numberOfDecks) {
    const cards = [];
    for (let index = 0; index < numberOfDecks; index++) {
      for (let suit in suits) {
        for (let rank in ranks) {
          cards.push(new Card(suit, rank));
        }
      }
    }
    return cards;
  }

  shuffle() {
    let shuffledCards = [];
    while (true) {
      let index = Math.floor(Math.random() * this.cards.length);
      shuffledCards.push(...this.cards.splice(index,1));
      if (this.cards.length === 0) break;
    }
    this.cards = shuffledCards;
  }

  dealCard(faceUp = false) {
    let card = this.cards.shift();
    card.faceUp = faceUp;
    return card;
  }
};

exports.Deck = Deck;
