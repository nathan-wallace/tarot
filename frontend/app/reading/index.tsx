import { useRef } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { ThemedView } from '@/components/ThemedView';

export default function ReadingScreen() {
  const viewRef = useRef<View>(null);

  async function shareSpread() {
    if (viewRef.current) {
      const uri = await captureRef(viewRef, { format: 'png' });
      await Sharing.shareAsync(uri);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View ref={viewRef} collapsable={false} style={styles.spread}>
        <Image source={{ uri: 'https://placekitten.com/200/300' }} style={styles.card} />
        <Image source={{ uri: 'https://placekitten.com/201/300' }} style={styles.card} />
        <Image source={{ uri: 'https://placekitten.com/202/300' }} style={styles.card} />
      </View>
      <Button title="Share Spread" onPress={shareSpread} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spread: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  card: {
    width: 100,
    height: 150,
    marginHorizontal: 4,
  },
});
