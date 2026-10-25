import { StyleSheet, Text, View } from 'react-native';

import { type Tone, toneColors } from '../dashboardData';

interface PillProps {
  label: string;
  tone: Tone;
}

export function Pill({ label, tone }: PillProps) {
  const { main, soft } = toneColors[tone];

  return (
    <View style={[styles.pill, { backgroundColor: soft }]}>
      <View style={[styles.dot, { backgroundColor: main }]} />
      <Text style={[styles.text, { color: main }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 5, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 11, fontWeight: '700' },
});
