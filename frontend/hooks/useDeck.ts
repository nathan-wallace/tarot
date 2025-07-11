export interface TarotCard {
  id: string;
  name: string;
  meaning: string;
}

const DECK: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'The Fool',
    meaning: 'New beginnings, spontaneity, free spirit.'
  },
  {
    id: 'the-magician',
    name: 'The Magician',
    meaning: 'Power, skill and concentration.'
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    meaning: 'Intuition, sacred knowledge and mystery.'
  }
];

export function useDeck(): TarotCard[] {
  return DECK;
}
