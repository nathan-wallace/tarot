import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReflectionEntry {
  date: string;
  spread: string;
  cardIndex: number;
  text: string;
}

const STORAGE_KEY = 'journalEntries';

export async function addReflection(entry: Omit<ReflectionEntry, 'date'>) {
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  const data: ReflectionEntry[] = existing ? JSON.parse(existing) : [];
  data.push({ ...entry, date: new Date().toISOString() });
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getJournal(): Promise<ReflectionEntry[]> {
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  return existing ? JSON.parse(existing) : [];
}
