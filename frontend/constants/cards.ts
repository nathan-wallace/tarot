export interface TarotCard {
  slug: string;
  name: string;
  meaning: string;
}

export const cards: TarotCard[] = [
  {
    slug: 'fool',
    name: 'The Fool',
    meaning: 'New beginnings, optimism and trust in life',
  },
  {
    slug: 'magician',
    name: 'The Magician',
    meaning: 'Action, the power to manifest desires',
  },
];

export function getCardBySlug(slug: string): TarotCard | undefined {
  return cards.find((c) => c.slug === slug);
}
