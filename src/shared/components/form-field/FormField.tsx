import { colors } from '@/shared/constants/colors';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 20 },
  label: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  error: { color: colors.primary, fontSize: 12, marginTop: 6 },
});
