const { Card } = require('./card.js');
const {Hand} = require('./hand.js');

describe('Composition: create a new hand', () => {
  const hand21 = new Hand({blackJackValue : 21});
  const hand22 = new Hand({blackJackValue : 22});

  test('hand[blackJackValue = 21]: has the correct composition', () => {
    expect(hand21.cards.length).toBe(0);
    expect(hand21.value).toBe(0);
    expect(hand21.playToValue.blackJackValue).toBe(21);
  });
  test('hand[blackJackValue = 22]: has the correct composition', () => {
    expect(hand22.cards.length).toBe(0);
    expect(hand22.value).toBe(0);
    expect(hand22.playToValue.blackJackValue).toBe(22);
  });
});

describe('Emptiness: isEmpty, resetHand', () => {
  const hand21 = new Hand({blackJackValue : 21});

  test('isEmpty: true and false', () => {
    expect(hand21.isEmpty()).toBe(true);
    hand21.addCard(new Card('spades', 'queen'));
    expect(hand21.isEmpty()).toBe(false);
  });
  test('resetHand: creates empty hand state', () => {
    hand21.resetHand();
    expect(hand21.isEmpty()).toBe(true);
    expect(hand21.playToValue.blackJackValue).toBe(21);
    expect(hand21.value).toBe(0);
  });
});

describe('Ace handling [blackJackValue=22]: sumHand, addCard, hand.value', () => {
  const hand22 = new Hand({blackJackValue : 22});
  hand22.addCard(new Card('hearts', 'ace'));
  hand22.addCard(new Card('clubs', 'ace'));

  test('this.value: updates within the addCard method', () => {
    expect(hand22.value).toBe(22);
  });

  test('handSum: correctly handles aces', () => {
    expect(hand22.sumHand()).toBe(22);
    hand22.addCard(new Card('diamonds', 'jack'));
    expect(hand22.sumHand()).toBe(22);
    hand22.addCard(new Card('spades', 'queen'));
    expect(hand22.sumHand()).toBe(22);
    hand22.addCard(new Card('spades', 'ace'));
    expect(hand22.sumHand()).toBe(23);
  });
});

describe('Ace handling [blackJackValue=20]: sumHand, addCard, hand.value', () => {
  const hand20 = new Hand({blackJackValue : 20});
  hand20.addCard(new Card('hearts', '9'));
  hand20.addCard(new Card('clubs', 'ace'));

  test('this.value: updates within the addCard method', () => {
    expect(hand20.value).toBe(20);
  });
  test('handSum: correctly handles aces', () => {
    expect(hand20.sumHand()).toBe(20);
    hand20.addCard(new Card('spades', 'ace'));
    expect(hand20.sumHand()).toBe(11);
  });
});

describe('BlackJack: blackJacks are correctly identified', () => {

  test('hasBlackJack[blackJackValue = 21]: identifies hands with a value 21 and only 2 cards', () => {
    const hand21 = new Hand({blackJackValue : 21});
    hand21.addCard(new Card('hearts', 'ace'));
    hand21.addCard(new Card('spades', 'queen'));
    expect(hand21.hasBlackjack()).toBe(true);
    hand21.addCard(new Card('diamonds', 'jack'));
    expect(hand21.value).toBe(21);
    expect(hand21.hasBlackjack()).toBe(false);
  });
  test('hasBlackJack[blackJackValue = 20]: identifies hands with a value 21 and only 2 cards', () => {
    const hand20 = new Hand({blackJackValue : 20});
    hand20.addCard(new Card('hearts', 'ace'));
    hand20.addCard(new Card('spades', '9'));
    expect(hand20.hasBlackjack()).toBe(true);
    hand20.addCard(new Card('clubs', '10'));
    expect(hand20.value).toBe(20);
    expect(hand20.hasBlackjack()).toBe(false);
  });
});

describe('Hand display: displayHand, setToFaceUp', () => {
  const hand21 = new Hand({blackJackValue : 21});
  const card1 = new Card('hearts', 'ace');
  card1.faceUp = true;
  const card2 = new Card('spades', 'king');
  hand21.addCard(card1);
  hand21.addCard(card2);
  test('displayHand: face up and face down', () => {
    expect(hand21.displayHand()).toBe('[ A ♥️][🤑🤑]');
    hand21.setToFaceUp();
    expect(hand21.displayHand()).toBe('[ A ♥️][ K ♠️]');
  });
});