import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/shared/constants/colors';
import { Field } from './Field';

interface ReadOnlyFieldProps {
  label: string;
  value?: string;
  mono?: boolean;
  placeholder?: string;
}

export function ReadOnlyField({ label, value, mono, placeholder = '—' }: ReadOnlyFieldProps) {
  return (
    <Field label={label}>
      <View style={styles.box}>
        <Text style={[styles.value, mono && styles.mono, !value && styles.placeholder]} numberOfLines={1}>{value || placeholder}</Text>
      </View>
    </Field>
  );
}

const styles = StyleSheet.create({
  box: { height: 42, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#f1f2f4' },
  value: { color: colors.text, fontSize: 14, fontWeight: '600' },
  mono: { fontFamily: 'monospace', fontSize: 13 },
  placeholder: { color: colors.placeholder, fontWeight: '400' },
});
