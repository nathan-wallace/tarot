import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

import { tarotCards } from '../../cms/cards';

export type TarotCardProps = {
  cardId: string;
};

export function TarotCard({ cardId }: TarotCardProps) {
  const card = tarotCards.find((c) => c.id === cardId);
  const [expanded, setExpanded] = useState(false);

  if (!card) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => setExpanded((v) => !v)} activeOpacity={0.8}>
      <ThemedView style={styles.container}>
        <Image source={{ uri: card.image }} style={styles.image} />
        <ThemedText type="subtitle">{card.name}</ThemedText>
        {expanded && (
          <ThemedText style={styles.description}>{card.description}</ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 120,
    height: 200,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  description: {
    textAlign: 'center',
    marginTop: 8,
  },
});
