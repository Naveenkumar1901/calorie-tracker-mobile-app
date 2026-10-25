import { colors } from '@/shared/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface GradientButtonProps {
  title: string;
  loadingTitle?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export function GradientButton({ title, loadingTitle, loading, disabled, onPress }: GradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.btn}
      >
        {loading ? (
          <View style={styles.row}>
            <ActivityIndicator color={colors.white} size="small" />
            <Text style={styles.text}>{loadingTitle ?? title}</Text>
          </View>
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  pressed: { opacity: 0.9, transform: [{ translateY: 1 }] },
  btn: { height: 46, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { color: colors.white, fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },
});
