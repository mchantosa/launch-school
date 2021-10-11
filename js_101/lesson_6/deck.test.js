const {Deck} = require('./deck.js');

describe('Composition: creat a deck', () => {

  test('Deck[1]: has the right composition', () => {
    const deck1 = new Deck();
    expect(deck1.cards.length).toBe(52);
    expect(deck1.cards.filter(card => card.suit === 'hearts').length).toBe(13);
    expect(deck1.cards.filter(card => card.rank === 'jack').length).toBe(4);
    expect(deck1.cards.filter(card =>
      (card.rank === 'jack') && (card.suit === 'hearts')).length).toBe(1);
  });
  test('Deck[10]: has the right composition', () => {
    const deck10 = new Deck(10);
    expect(deck10.cards.length).toBe(520);
    expect(deck10.cards.filter(card => card.suit === 'hearts').length).toBe(130);
    expect(deck10.cards.filter(card => card.rank === 'jack').length).toBe(40);
    expect(deck10.cards.filter(card =>
      (card.rank === 'jack') && (card.suit === 'hearts')).length).toBe(10);
  });
});

function getDeckSequences(deck) {
  let deckRankSequence = [];
  let deckSuitSequence = [];
  deck.cards.forEach(card => {
    deckRankSequence.push(card.rank[0]);
    deckSuitSequence.push(card.suit[0]);
  });
  return {deckRanks: deckRankSequence.join(''), deckSuits: deckSuitSequence.join('')};
}

describe('shuffle: composition and randomness check', () => {
  const deck2 = new Deck(2);
  const deck2SequencePre = getDeckSequences(deck2);
  deck2.shuffle();
  const deck2SequencePost = getDeckSequences(deck2);
  test('Post shuffle composition check ', () => {
    expect(deck2.cards.length).toBe(104);
    expect(deck2.cards.filter(card => card.suit === 'hearts').length).toBe(26);
    expect(deck2.cards.filter(card => card.rank === 'jack').length).toBe(8);
    expect(deck2.cards.filter(card => (card.rank === 'jack') && (card.suit === 'hearts')).length).toBe(2);
  });
  test('Pre shuffle not random/ post shuffle low probability randomness check', () => {
    expect(deck2SequencePre.deckRanks.indexOf('34567891jqka2')).toBe(1);
    expect(deck2SequencePre.deckSuits.indexOf('hhhhhhhhhhhhh')).toBe(13);
    expect(deck2SequencePost.deckRanks.indexOf('23456')).toBe(-1);  //low probability
    expect(deck2SequencePost.deckRanks.indexOf('1jqka')).toBe(-1);  //low probability
    expect(deck2SequencePost.deckSuits.indexOf('ssssss')).toBe(-1); //low probability
    expect(deck2SequencePost.deckSuits.indexOf('aaaaaa')).toBe(-1); //low probability
  });
});

describe('Deal a card: dealCard', () => {
  test('dealCard: removes dealt card from deck', () => {
    const deck1 = new Deck();
    deck1.shuffle();
    const cardOnTop = deck1.cards[0];
    const cardDealt = deck1.dealCard();
    expect(cardDealt).toBe(cardOnTop);
    expect(deck1.cards.length).toBe(51);
    expect(deck1.cards.indexOf(cardDealt)).toBe(-1);
  });
});