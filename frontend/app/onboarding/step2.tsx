import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StepTwo() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Major & Minor Arcana</ThemedText>
      <ThemedText style={styles.text}>
        The deck is split into major cards that speak to big themes and minor cards for everyday matters.
      </ThemedText>
      <Pressable onPress={() => router.push('/onboarding/step3')}>
        <ThemedText type="link">Next</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  text: {
    textAlign: 'center',
  },
});
