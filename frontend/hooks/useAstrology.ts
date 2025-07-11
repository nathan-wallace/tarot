import { useEffect, useMemo, useState } from 'react';
import * as Notifications from 'expo-notifications';

export interface AstrologyEvent {
  title: string;
  date: string;
  reminder?: boolean;
}

export interface AstrologyData {
  insights?: string;
  events?: AstrologyEvent[];
}

function getMoonPhase(date: Date): string {
  const synodicMonth = 29.530588853;
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14); // 2000-01-06
  const daysSince = (date.getTime() - knownNewMoon) / 86400000;
  let phase = (daysSince % synodicMonth) / synodicMonth;
  if (phase < 0) phase += 1;
  if (phase < 0.03 || phase > 0.97) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
}

async function scheduleReminders(events: AstrologyEvent[]) {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
  await Promise.all(
    events
      .filter((e) => e.reminder)
      .map(async (e) => {
        const trigger = new Date(e.date);
        if (trigger > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: { title: e.title, body: 'Astrological event today' },
            trigger,
          });
        }
      })
  );
}

export function useAstrology(date: Date) {
  const [data, setData] = useState<AstrologyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const phase = useMemo(() => getMoonPhase(date), [date]);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/astrology?date=${date.toISOString().split('T')[0]}`);
        if (!response.ok) throw new Error('Failed to fetch astrology data');
        const json: AstrologyData = await response.json();
        if (!isMounted) return;
        setData(json);
        if (json.events) {
          scheduleReminders(json.events).catch(() => {});
        }
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [date]);

  return { phase, data, loading, error };
}
