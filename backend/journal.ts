import AsyncStorage from '@react-native-async-storage/async-storage';

export type JournalEntry = {
  id: string;
  title: string;
  date: string;
  cards: string[];
};

const JOURNAL_KEY = 'journal_entries';

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const data = await AsyncStorage.getItem(JOURNAL_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveJournalEntry(entry: JournalEntry) {
  const entries = await getJournalEntries();
  const index = entries.findIndex((e) => e.id === entry.id);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.unshift(entry);
  }
  await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}
