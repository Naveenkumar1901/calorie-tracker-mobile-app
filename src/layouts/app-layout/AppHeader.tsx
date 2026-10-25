import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  title: string;
  caption?: string;
  onMenuPress: () => void;
  onBackPress?: () => void;
}

export function AppHeader({ title, caption = 'Calorie Tracker', onMenuPress, onBackPress }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.primary, colors.brandMid, colors.brandDeep]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top + 8 }]}
    >
      <Pressable style={styles.iconButton} onPress={onBackPress ?? onMenuPress} hitSlop={8}>
        <Ionicons name={onBackPress ? 'arrow-back' : 'menu'} size={22} color={colors.white} />
      </Pressable>
      <View style={styles.titleBox}>
        <Text style={styles.caption}>{caption}</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingBottom: 14, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  titleBox: { flex: 1 },
  caption: { color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase' },
  title: { color: colors.white, fontSize: 20, fontWeight: '800', letterSpacing: -0.4 },
  iconButton: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.16)' },
});
