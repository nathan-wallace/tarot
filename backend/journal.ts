import { promises as fs } from 'fs';
import path from 'path';

export interface JournalEntry {
  id: string;
  date: string;
  spreadType: string;
  notes: string;
}

const DB_FILE = path.join(__dirname, 'journal.json');

async function readDB(): Promise<JournalEntry[]> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeDB(entries: JournalEntry[]): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(entries, null, 2));
}

export async function addJournalEntry(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
  const entries = await readDB();
  const newEntry: JournalEntry = { id: Date.now().toString(), ...entry };
  entries.push(newEntry);
  await writeDB(entries);
  return newEntry;
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  return readDB();
}

export async function getJournalEntry(id: string): Promise<JournalEntry | undefined> {
  const entries = await readDB();
  return entries.find((e) => e.id === id);
}

export async function updateJournalEntry(
  id: string,
  updates: Partial<Omit<JournalEntry, 'id'>>
): Promise<JournalEntry | undefined> {
  const entries = await readDB();
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return undefined;
  entries[index] = { ...entries[index], ...updates };
  await writeDB(entries);
  return entries[index];
}
