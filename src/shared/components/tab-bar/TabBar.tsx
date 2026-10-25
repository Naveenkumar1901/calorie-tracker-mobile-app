import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export interface TabItem {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  count?: number;
  alert?: boolean;
}

interface TabBarProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function TabBar({ tabs, activeKey, onChange }: TabBarProps) {
  return (
    <View style={styles.bar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Pressable key={tab.key} style={[styles.tab, active && styles.tabActive]} onPress={() => onChange(tab.key)}>
              <Ionicons name={tab.icon} size={15} color={active ? colors.white : colors.textMuted} />
              <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
              {tab.count !== undefined ? (
                <View style={[styles.count, active && styles.countActive]}>
                  <Text style={[styles.countText, active && styles.countTextActive]}>{tab.count}</Text>
                </View>
              ) : null}
              {tab.alert ? <Ionicons name="alert-circle" size={14} color={active ? colors.white : colors.primary} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: '#f4f5f7', paddingVertical: 8 },
  content: { gap: 8, paddingHorizontal: 14 },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { color: colors.text, fontSize: 12, fontWeight: '700' },
  labelActive: { color: colors.white },
  count: { minWidth: 18, height: 18, paddingHorizontal: 5, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f2f4' },
  countActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  countText: { color: colors.textMuted, fontSize: 10, fontWeight: '800' },
  countTextActive: { color: colors.white },
});
