import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { AchievementBadge } from '@/components/AchievementBadge';
import LottieAnimation from '@/components/LottieAnimation';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAchievements } from '@/hooks/useAchievements';
import { DECKS, isDeckUnlocked } from '@/constants/decks';
import { SPREADS, isSpreadUnlocked } from '@/constants/spreads';

export default function HomeScreen() {
  const { state, addReading } = useAchievements();
  const unlockedDecks = DECKS.filter((d) => isDeckUnlocked(d, state.milestones));
  const unlockedSpreads = SPREADS.filter((s) => isSpreadUnlocked(s, state.milestones));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
        <LottieAnimation />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Achievements</ThemedText>
        <ThemedText>Completed readings: {state.completedReadings}</ThemedText>
        <TouchableOpacity onPress={addReading} style={{ marginBottom: 8 }}>
          <ThemedText type="link">Simulate reading</ThemedText>
        </TouchableOpacity>
        {[...state.milestones].map((id) => (
          <AchievementBadge key={id} label={id} />
        ))}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Unlocked Decks</ThemedText>
        {unlockedDecks.map((d) => (
          <ThemedText key={d.id}>{d.name}</ThemedText>
        ))}
        <ThemedText type="subtitle" style={{ marginTop: 8 }}>
          Unlocked Spreads
        </ThemedText>
        {unlockedSpreads.map((s) => (
          <ThemedText key={s.id}>{s.name}</ThemedText>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
