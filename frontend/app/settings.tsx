import React from 'react';
import { View, Button, Switch, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserPreferences } from '@/hooks/useUserPreferences';

const cardBackOptions = ['default', 'gold', 'purple'];
const spreadOptions = ['three-card', 'celtic-cross'];

function cycle(list: string[], current: string) {
  const index = list.indexOf(current);
  return list[(index + 1) % list.length];
}

export default function SettingsScreen() {
  const [prefs, setPrefs] = useUserPreferences();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.row}>
        <ThemedText>Card Back: {prefs.cardBack}</ThemedText>
        <Button
          title="Change"
          onPress={() =>
            setPrefs({ ...prefs, cardBack: cycle(cardBackOptions, prefs.cardBack) })
          }
        />
      </View>
      <View style={styles.row}>
        <ThemedText>Spread: {prefs.spread}</ThemedText>
        <Button
          title="Change"
          onPress={() =>
            setPrefs({ ...prefs, spread: cycle(spreadOptions, prefs.spread) })
          }
        />
      </View>
      <View style={styles.row}>
        <ThemedText>Notifications</ThemedText>
        <Switch
          value={prefs.notifications}
          onValueChange={(val) => setPrefs({ ...prefs, notifications: val })}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
