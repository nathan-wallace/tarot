import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserPreferences = {
  cardBack: string;
  spread: string;
  notifications: boolean;
};

const PREFS_KEY = 'user_preferences';

const defaultPrefs: UserPreferences = {
  cardBack: 'default',
  spread: 'three-card',
  notifications: true,
};

export function useUserPreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(defaultPrefs);

  useEffect(() => {
    AsyncStorage.getItem(PREFS_KEY).then((value) => {
      if (value) {
        setPrefs({ ...defaultPrefs, ...JSON.parse(value) });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  return [prefs, setPrefs] as const;
}
