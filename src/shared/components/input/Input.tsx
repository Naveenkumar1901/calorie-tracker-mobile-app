import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  icon?: keyof typeof Ionicons.glyphMap;
  hasError?: boolean;
  password?: boolean;
}

export function Input({ icon, hasError, password, onFocus, onBlur, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrap, focused && styles.focused, hasError && styles.error]}>
      {icon && <Ionicons name={icon} size={16} color={colors.primary} />}
      <TextInput
        {...rest}
        style={styles.input}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={password && !visible}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
      />
      {password && (
        <Pressable hitSlop={10} onPress={() => setVisible((v) => !v)}>
          <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 46,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  focused: { borderColor: colors.primary, backgroundColor: colors.white },
  error: { borderColor: colors.primary },
  input: { flex: 1, height: '100%', fontSize: 14, color: colors.text, padding: 0 },
});
