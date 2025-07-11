import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getJournalEntries, JournalEntry } from '../../../backend/journal';

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    getJournalEntries().then(setEntries);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedText>
            {item.date} - {item.title}
          </ThemedText>
        )}
        ListEmptyComponent={<ThemedText>No saved readings.</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
