import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export function useOnboardingRedirect() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('onboardingCompleted').then((value) => {
      if (!value) {
        router.replace('/onboarding');
      } else {
        setReady(true);
      }
    });
  }, [router]);

  return ready;
}
