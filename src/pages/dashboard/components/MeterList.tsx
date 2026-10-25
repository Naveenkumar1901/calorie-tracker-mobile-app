import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';

interface MeterBarProps {
  value: number;
  max: number;
}

export function MeterBar({ value, max }: MeterBarProps) {
  return (
    <View style={styles.track}>
      <LinearGradient
        colors={['#F84545', colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width: `${Math.max((value / max) * 100, 6)}%` }]}
      />
    </View>
  );
}

interface MeterListProps {
  items: { label: string; value: number }[];
  onItemPress?: (label: string) => void;
}

export function MeterList({ items, onItemPress }: MeterListProps) {
  const max = Math.max(...items.map((item) => item.value));

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <Pressable key={item.label} style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={() => onItemPress?.(item.label)}>
          <Text style={styles.label} numberOfLines={1}>{item.label}</Text>
          <MeterBar value={item.value} max={max} />
          <Text style={styles.value}>{item.value}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 9 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 3, borderRadius: 8 },
  pressed: { backgroundColor: '#fdeaec' },
  label: { width: 112, color: colors.text, fontSize: 12 },
  value: { width: 18, textAlign: 'right', color: colors.text, fontSize: 12, fontWeight: '700' },
  track: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#f1f2f4', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});
