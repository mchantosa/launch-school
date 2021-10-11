const suits = {spades: `♠️` , hearts: `♥️`, diamonds: `♦️`, clubs: `♣️`};
const ranks = {
  2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10,
  jack: 10, queen: 10, king: 10, ace: [1, 11]
};

const Card = class {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.faceUp = false;
  }

  getCardFace() {
    let cardFace;
    cardFace = (this.rank.length !== 2) ?
      `[ ${this.rank[0].toUpperCase()} ${suits[this.suit]}]` :
      `[${this.rank} ${suits[this.suit]}]`;
    return cardFace;
  }

  getCardBack() { return `[🤑🤑]`}

  setToFaceUp() {this.faceUp = true}

};

exports.suits = suits;
exports.ranks = ranks;
exports.Card = Card;