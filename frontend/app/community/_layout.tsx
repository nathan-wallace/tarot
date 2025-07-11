import { Stack } from 'expo-router';

export default function CommunityLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Community' }} />
      <Stack.Screen name="post" options={{ title: 'Post' }} />
    </Stack>
  );
}
