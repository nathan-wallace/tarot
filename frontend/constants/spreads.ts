import type { AchievementId } from '@/hooks/useAchievements';

export interface SpreadDefinition {
  id: string;
  name: string;
  requires?: AchievementId;
}

export const SPREADS: SpreadDefinition[] = [
  { id: 'one-card', name: 'One Card' },
  { id: 'three-card', name: 'Three Card', requires: 'first-reading' },
  { id: 'celtic-cross', name: 'Celtic Cross', requires: 'five-readings' },
];

export function isSpreadUnlocked(
  spread: SpreadDefinition,
  achievements: Set<AchievementId>,
) {
  return !spread.requires || achievements.has(spread.requires);
}
