import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, required, error, hint, children }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 12 },
  label: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 5 },
  required: { color: colors.primary },
  error: { color: colors.primary, fontSize: 11, fontWeight: '600', marginTop: 4 },
  hint: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
});
