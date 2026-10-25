import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';

interface ChipGroupProps {
  label?: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function ChipGroup({ label, options, selected, onSelect }: ChipGroupProps) {
  return (
    <View style={styles.group}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        {options.map((option) => {
          const active = option === selected;
          return (
            <Pressable key={option} style={[styles.chip, active && styles.chipActive]} onPress={() => onSelect(active ? '' : option)}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: 6 },
  label: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 999, backgroundColor: '#f1f2f4', borderWidth: 1, borderColor: 'transparent' },
  chipActive: { backgroundColor: '#fdeaec', borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: colors.primary, fontWeight: '700' },
});
