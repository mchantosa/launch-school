const {Card} = require('./card.js');

describe('Composition: create a new card', () => {

  test('Card[A♠️]: has the correct composition', () => {
    const aceOfSpades = new Card('spades', 'ace');
    expect(aceOfSpades.suit).toBe('spades');
    expect(aceOfSpades.rank).toBe('ace');
    expect(aceOfSpades.faceUp).toBe(false);
  });
  test('Card[4♣️]: has the correct composition', () => {
    const fourOfClubs = new Card('clubs', '4');
    expect(fourOfClubs.suit).toBe('clubs');
    expect(fourOfClubs.rank).toBe('4');
    expect(fourOfClubs.faceUp).toBe(false);
  });
  test('Card[10♥️]: has the correct composition', () => {
    const tenOfHearts = new Card('hearts', '10');
    expect(tenOfHearts.suit).toBe('hearts');
    expect(tenOfHearts.rank).toBe('10');
    expect(tenOfHearts.faceUp).toBe(false);
  });
});

describe('Display: getsCardFace', () => {

  test('getCardFace[A♠️]', () => {
    const aceOfSpades = new Card('spades', 'ace');
    expect(aceOfSpades.getCardFace()).toBe(('[ A ♠️]'));
  });
  test('getCardFace[4♣️]', () => {
    const fourOfClubs = new Card('clubs', '4');
    expect(fourOfClubs.getCardFace()).toBe(('[ 4 ♣️]'));
  });
  test('getCardFace[10♥️]', () => {
    const tenOfHearts = new Card('hearts', '10');
    expect(tenOfHearts.getCardFace()).toBe(('[10 ♥️]'));
  });
});

describe('Display: getCardBack, setCardFace', () => {
  test('getCardBack', () => {
    const jackOfDiamonds = new Card('diamonds', 'jack');
    expect(jackOfDiamonds.getCardBack()).toBe(('[🤑🤑]'));
  });
  test('setCardFace', () => {
    const twoOfDiamonds = new Card('diamonds', '2');
    expect(twoOfDiamonds.faceUp).toBe((false));
    twoOfDiamonds.setToFaceUp();
    expect(twoOfDiamonds.faceUp).toBe((true));
  });
});
