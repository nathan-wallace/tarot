import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDeck, TarotCard } from '@/hooks/useDeck';
import { useDailyReminder } from '@/hooks/useDailyReminder';

export default function DailyCardScreen() {
  const deck = useDeck();
  const [card, setCard] = useState<TarotCard | null>(null);

  useDailyReminder();

  useEffect(() => {
    async function load() {
      const today = new Date().toISOString().split('T')[0];
      try {
        const res = await fetch(`http://localhost:3000/daily-card?date=${today}`);
        if (res.ok) {
          const data = await res.json();
          const found = deck.find((c) => c.id === data.cardId);
          if (found) {
            setCard(found);
            return;
          }
        }
      } catch {
        // ignore fetch errors in demo
      }

      const random = deck[Math.floor(Math.random() * deck.length)];
      setCard(random);
      try {
        await fetch('http://localhost:3000/daily-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: today, cardId: random.id }),
        });
      } catch {
        // ignore network errors in demo
      }
    }

    load();
  }, [deck]);

  if (!card) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{card.name}</ThemedText>
      <ThemedText>{card.meaning}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
});
