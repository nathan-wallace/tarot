import { StyleSheet, View } from 'react-native';

import TarotCard from '@/components/TarotCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useDeck from '@/hooks/useDeck';

export default function ReadingScreen() {
  const { deck, draw, shuffle } = useDeck();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.deck}>
        {deck.map((card, index) => (
          <TarotCard
            key={card.id}
            front={{ uri: `https://picsum.photos/200/300?random=${card.id}` }}
            back={{ uri: 'https://picsum.photos/200/300?grayscale' }}
            onSwipe={draw}
          />
        ))}
      </View>
      <ThemedText onPress={shuffle} style={styles.shuffle}>
        Shuffle
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deck: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  shuffle: {
    marginTop: 24,
  },
});
