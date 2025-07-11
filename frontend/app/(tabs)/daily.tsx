import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAstrology } from '@/hooks/useAstrology';

export default function DailyCardScreen() {
  const today = new Date();
  const { phase, data, loading, error } = useAstrology(today);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Daily Card</ThemedText>
      <ThemedText>Moon Phase: {phase}</ThemedText>
      {loading && <ThemedText>Loading astrology...</ThemedText>}
      {error && <ThemedText>Failed to load data</ThemedText>}
      {data?.insights && <ThemedText>{data.insights}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
