import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getNotificationFrequency, setNotificationFrequency, useNotifications } from '@/hooks/useNotifications';

export default function SettingsScreen() {
  const [frequency, setFrequency] = useState('');
  const { scheduleDailyCardReminder } = useNotifications();

  useEffect(() => {
    getNotificationFrequency().then((hours) => setFrequency(String(hours)));
  }, []);

  const save = async () => {
    const hours = parseInt(frequency);
    if (!isNaN(hours)) {
      await setNotificationFrequency(hours);
      await scheduleDailyCardReminder();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText>Daily reminder frequency (hours)</ThemedText>
      <TextInput
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save" onPress={save} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
});
