import { StyleSheet, View } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function AchievementBadge({ label }: { label: string }) {
  const theme = useColorScheme() ?? 'light';
  const color = theme === 'light' ? Colors.light.gold : Colors.dark.gold;

  return (
    <ThemedView style={[styles.badge, { borderColor: color }]}>
      <View style={styles.row}>
        <IconSymbol name="star.fill" size={16} color={color} style={styles.icon} />
        <ThemedText>{label}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    marginRight: 2,
  },
});
