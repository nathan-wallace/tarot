import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export function useDailyReminder(hour = 9, minute = 0) {
  useEffect(() => {
    async function schedule() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const result = await Notifications.requestPermissionsAsync();
        if (result.status !== 'granted') {
          return;
        }
      }

      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Tarot',
          body: "Pull today's card and record your thoughts.",
        },
        trigger: { hour, minute, repeats: true },
      });
    }

    schedule();
  }, [hour, minute]);
}
