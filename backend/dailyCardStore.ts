import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, 'data', 'daily-cards.json');

interface StoredCards {
  [date: string]: string;
}

async function readData(): Promise<StoredCards> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw) as StoredCards;
  } catch {
    return {};
  }
}

async function writeData(data: StoredCards) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getDailyCardId(date: string): Promise<string | null> {
  const data = await readData();
  return data[date] ?? null;
}

export async function saveDailyCardId(date: string, cardId: string): Promise<void> {
  const data = await readData();
  data[date] = cardId;
  await writeData(data);
}
