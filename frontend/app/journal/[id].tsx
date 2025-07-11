import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { JournalEntry } from '../../../backend/journal';
import { getJournalEntry, updateJournalEntry } from '../../../backend/journal';

export default function JournalDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (typeof id === 'string') {
      getJournalEntry(id).then((e) => {
        if (e) {
          setEntry(e);
          setNotes(e.notes);
        }
      });
    }
  }, [id]);

  const save = async () => {
    if (entry) {
      const updated = await updateJournalEntry(entry.id, { notes });
      if (updated) setEntry(updated);
    }
  };

  if (!entry) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Journal' }} />
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: entry.spreadType }} />
      <ThemedText type="title">{entry.spreadType}</ThemedText>
      <ThemedText>{entry.date}</ThemedText>
      <TextInput
        style={styles.input}
        multiline
        value={notes}
        onChangeText={setNotes}
        placeholder="Add notes"
      />
      <Pressable onPress={save} style={styles.button}>
        <ThemedText>Save Note</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    padding: 12,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 4,
  },
});
