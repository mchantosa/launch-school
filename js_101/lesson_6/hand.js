const {ranks} = require('./card.js');

const Hand = class {
  constructor(playToValue) {
    this.cards = [];
    this.value = 0;
    this.playToValue = playToValue;
  }

  displayHand() {
    const display = [];
    this.cards.forEach(card => {
      if (card.faceUp) display.push(card.getCardFace());
      else display.push(card.getCardBack());
    });
    return display.join('');
  }

  hasBlackjack() {
    if (this.cards.length !== 2) return false;
    if (this.sumHand() === this.playToValue.blackJackValue) {
      return true;
    }
    return false;
  }

  sumHand() {
    let handSum = 0;
    const notAces = this.cards.filter(
      card => Number.isInteger(ranks[card.rank]));
    const aces = this.cards.filter(
      card => !Number.isInteger(ranks[card.rank]));
    notAces.forEach(card => {
      handSum += ranks[card.rank];
    });
    aces.forEach(card => {
      const rank = ranks[card.rank];
      const remainingAces = aces.length - 1 - aces.indexOf(card);
      handSum += (((handSum + rank[1]) > this.playToValue.blackJackValue) ||
      ((handSum + rank[1] + remainingAces) > this.playToValue.blackJackValue)) ?
        rank[0] : rank[1];
    });
    return handSum;
  }

  resetHand() {
    this.cards = [];
    this.value = 0;
  }

  isEmpty() {
    return (this.cards.length === 0);
  }

  addCard(card) {
    this.cards.push(card);
    this.value = this.sumHand();
  }

  setToFaceUp() {
    this.cards.forEach(card => card.setToFaceUp());
  }
};

exports.Hand = Hand;