import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '@/shared/constants/colors';
import { Field } from './Field';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rows?: number;
}

export function TextField({ label, required, error, hint, icon, rows, onFocus, onBlur, ...rest }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const multiline = !!rows;

  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <View style={[styles.wrap, multiline && { height: rows * 22 + 20, alignItems: 'flex-start' }, focused && styles.focused, !!error && styles.error]}>
        {icon ? <Ionicons name={icon} size={16} color={colors.primary} style={multiline && styles.iconTop} /> : null}
        <TextInput
          {...rest}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          style={[styles.input, multiline && styles.inputMultiline]}
          placeholderTextColor={colors.placeholder}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
      </View>
    </Field>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 42, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface },
  focused: { borderColor: colors.primary, backgroundColor: colors.white },
  error: { borderColor: colors.primary },
  iconTop: { marginTop: 11 },
  input: { flex: 1, height: '100%', fontSize: 14, color: colors.text, padding: 0 },
  inputMultiline: { paddingTop: 10, paddingBottom: 10 },
});
