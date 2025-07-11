import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import * as spreads from '../../../cms/spreads';

export default function Journeys() {
  return (
    <ThemedView style={{ padding: 20, gap: 12 }}>
      <ThemedText type="title">Journeys</ThemedText>
      {Object.entries(spreads).map(([key, spread]) => (
        <Link
          key={key}
          href={`/journeys/${key}`}
          style={{ paddingVertical: 8 }}>
          <ThemedText type="subtitle">{spread.name}</ThemedText>
        </Link>
      ))}
    </ThemedView>
  );
}
