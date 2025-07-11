import { useCallback, useState } from 'react';

export interface DeckCard {
  id: number;
  name: string;
}

const DEFAULT_CARDS: DeckCard[] = [
  { id: 0, name: 'The Fool' },
  { id: 1, name: 'The Magician' },
  { id: 2, name: 'The High Priestess' },
  { id: 3, name: 'The Empress' },
  { id: 4, name: 'The Hierophant' },
  { id: 5, name: 'The Lovers' },
  { id: 6, name: 'The Chariot' },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function useDeck(initial: DeckCard[] = DEFAULT_CARDS) {
  const [deck, setDeck] = useState<DeckCard[]>(() => shuffleArray(initial));

  const shuffle = useCallback(() => {
    setDeck((d) => shuffleArray(d));
  }, []);

  const draw = useCallback(() => {
    setDeck((d) => d.slice(1));
  }, []);

  return { deck, shuffle, draw };
}
