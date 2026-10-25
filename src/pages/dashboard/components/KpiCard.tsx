import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';
import { type IconName, type Tone, toneColors } from '../dashboardData';

interface KpiCardProps {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
  icon: IconName;
  trend: string;
  onPress?: () => void;
}

export function KpiCard({ label, value, detail, tone, icon, trend, onPress }: KpiCardProps) {
  const { main, soft } = toneColors[tone];

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: soft }]}>
        <Ionicons name={icon} size={18} color={main} />
      </View>
      <View style={styles.body}>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          <Text style={[styles.trend, { color: main }]}>{trend}</Text>
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text style={styles.detail} numberOfLines={1}>{detail}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 14,
    backgroundColor: colors.white,
    shadowColor: '#1f2937',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  iconBox: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  value: { color: colors.text, fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  trend: { fontSize: 10, fontWeight: '700' },
  label: { color: colors.text, fontSize: 11, fontWeight: '600' },
  detail: { color: colors.textMuted, fontSize: 10, marginTop: 1 },
});
