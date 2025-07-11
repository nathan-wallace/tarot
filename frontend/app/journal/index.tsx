import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { JournalEntry } from '../../../backend/journal';
import { getJournalEntries } from '../../../backend/journal';

export default function JournalIndex() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    getJournalEntries().then(setEntries);
  }, []);

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <Link href={`/journal/${item.id}`} asChild>
      <Pressable style={styles.item}>
        <ThemedText type="subtitle">{item.date}</ThemedText>
        <ThemedText>{item.spreadType}</ThemedText>
        <ThemedText numberOfLines={1}>{item.notes}</ThemedText>
      </Pressable>
    </Link>
  );

  const data = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Journal' }} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  item: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
});
