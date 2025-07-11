import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const FREQUENCY_KEY = 'notificationFrequency';
const DEFAULT_HOURS = 24;

export async function getNotificationFrequency(): Promise<number> {
  const value = await AsyncStorage.getItem(FREQUENCY_KEY);
  const hours = parseInt(value ?? '');
  return isNaN(hours) ? DEFAULT_HOURS : hours;
}

export async function setNotificationFrequency(hours: number) {
  await AsyncStorage.setItem(FREQUENCY_KEY, String(hours));
}

export function useNotifications() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  async function scheduleNotification(title: string, body: string, trigger: Date | Notifications.NotificationTriggerInput) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger,
    });
  }

  async function scheduleLunarReminder(date: Date) {
    await scheduleNotification('Lunar Event', "Don't miss the lunar event!", date);
  }

  async function scheduleSavedReadingReminder(date: Date) {
    await scheduleNotification('Tarot Reading', 'Check your saved reading.', date);
  }

  async function scheduleDailyCardReminder() {
    const hours = await getNotificationFrequency();
    await scheduleNotification('Daily Card', 'Time for your daily card draw.', { seconds: hours * 3600, repeats: true });
  }

  return {
    scheduleLunarReminder,
    scheduleSavedReadingReminder,
    scheduleDailyCardReminder,
  };
}
