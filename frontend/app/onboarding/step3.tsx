import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StepThree() {
  const finish = async () => {
    await SecureStore.setItemAsync('onboardingCompleted', 'true');
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">You&apos;re Ready!</ThemedText>
      <ThemedText style={styles.text}>
        Draw a card any time you need guidance. Tap below to begin your journey.
      </ThemedText>
      <Pressable onPress={finish}>
        <ThemedText type="link">Get Started</ThemedText>
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
