import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';

interface SegmentedTabsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function SegmentedTabs({ options, selected, onSelect }: SegmentedTabsProps) {
  return (
    <View style={styles.track}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.tab, option === selected && styles.tabActive]} onPress={() => onSelect(option)}>
          <Text style={[styles.text, option === selected && styles.textActive]}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', padding: 3, marginBottom: 12, borderRadius: 10, backgroundColor: '#f1f2f4' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 8 },
  tabActive: { backgroundColor: colors.primary },
  text: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  textActive: { color: colors.white },
});
