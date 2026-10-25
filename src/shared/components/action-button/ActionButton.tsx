import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/shared/constants/colors';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'ghost' | 'danger';
  small?: boolean;
  disabled?: boolean;
  flex?: boolean;
}

const palette = {
  primary: { background: colors.primary, border: colors.primary, text: colors.white },
  ghost: { background: colors.white, border: colors.border, text: colors.text },
  danger: { background: '#fdeaec', border: '#fdeaec', text: colors.primary },
};

export function ActionButton({ title, onPress, icon, variant = 'primary', small, disabled, flex }: ActionButtonProps) {
  const tone = palette[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, small && styles.small, flex && styles.flex, { backgroundColor: tone.background, borderColor: tone.border }, disabled && styles.disabled, pressed && styles.pressed]}
    >
      {icon ? <Ionicons name={icon} size={small ? 14 : 17} color={tone.text} /> : null}
      <Text style={[styles.text, small && styles.textSmall, { color: tone.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 44, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5 },
  small: { height: 34, paddingHorizontal: 12, borderRadius: 10 },
  flex: { flex: 1 },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.85 },
  text: { fontSize: 14, fontWeight: '800' },
  textSmall: { fontSize: 12 },
});
