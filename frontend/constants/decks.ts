import type { AchievementId } from '@/hooks/useAchievements';

export interface DeckDefinition {
  id: string;
  name: string;
  requires?: AchievementId;
}

export const DECKS: DeckDefinition[] = [
  { id: 'rider', name: 'Rider-Waite' },
  { id: 'thoth', name: 'Thoth', requires: 'five-readings' },
  { id: 'marseilles', name: 'Marseilles', requires: 'ten-readings' },
];

export function isDeckUnlocked(
  deck: DeckDefinition,
  achievements: Set<AchievementId>,
) {
  return !deck.requires || achievements.has(deck.requires);
}
