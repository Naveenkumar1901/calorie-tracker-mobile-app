import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';

interface SectionCardProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
}

export function SectionCard({ title, actionLabel, onAction, children }: SectionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.accent} />
        <Text style={styles.title}>{title}</Text>
        {actionLabel ? (
          <Pressable onPress={onAction} hitSlop={8}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: '#1f2937',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  accent: { width: 3, height: 16, borderRadius: 2, backgroundColor: colors.primary, marginRight: 8 },
  title: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '700' },
  action: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
