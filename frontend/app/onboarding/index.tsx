import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StepOne() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to Tarot</ThemedText>
      <ThemedText style={styles.text}>
        Tarot is a tool for insight and reflection. Let&apos;s cover the basics.
      </ThemedText>
      <Pressable onPress={() => router.push('/onboarding/step2')}>
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
