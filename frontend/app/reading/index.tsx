import { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ARCardSpread from '@/components/ARCardSpread';

export default function ReadingScreen() {
  const [arMode, setArMode] = useState(false);
  return (
    <ThemedView style={styles.flex}>
      {arMode ? (
        <ARCardSpread />
      ) : (
        <View style={styles.center}>
          <ThemedText type="title">Tarot Reading</ThemedText>
        </View>
      )}
      <Button
        title={arMode ? 'Exit AR Mode' : 'Enter AR Mode'}
        onPress={() => setArMode(!arMode)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
