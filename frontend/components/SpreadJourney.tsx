import { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { addReflection } from '@/utils/journal';

export interface CardStep {
  prompt: string;
  instruction: string;
}

export interface SpreadData {
  name: string;
  cards: CardStep[];
}

export default function SpreadJourney({ spread, slug }: { spread: SpreadData; slug: string }) {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const router = useRouter();

  const card = spread.cards[step];
  const isLast = step === spread.cards.length - 1;

  async function next() {
    await addReflection({ spread: slug, cardIndex: step, text });
    setText('');
    if (isLast) {
      router.back();
    } else {
      setStep(step + 1);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{spread.name}</ThemedText>
      <ThemedText type="subtitle">Card {step + 1}</ThemedText>
      <ThemedText>{card.instruction}</ThemedText>
      <ThemedText>{card.prompt}</ThemedText>
      <TextInput
        placeholder="Your reflection..."
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
      />
      <Button title={isLast ? 'Finish' : 'Next'} onPress={next} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    minHeight: 80,
  },
});
