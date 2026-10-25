import { colors } from '@/shared/constants/colors';
import { getResultPopup, hideResultPopup, subscribeResultPopup } from '@/shared/utils/resultPopup';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useEffect, useSyncExternalStore } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const KIND_STYLES = {
  success: {
    icon: 'checkmark',
    solid: '#16a34a',
    soft: '#dcfce7',
    gradient: ['#22c55e', '#15803d'],
    accent: ['#4ade80', '#16a34a'],
    shadow: '#16a34a',
    buttonText: 'Done',
  },
  error: {
    icon: 'close',
    solid: colors.primary,
    soft: '#fee2e2',
    gradient: [colors.primary, colors.primaryDark],
    accent: ['#f87171', colors.primary],
    shadow: colors.primary,
    buttonText: 'Close',
  },
} as const;

function PulseRing({ color }: { color: string }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.out(Easing.ease) }), -1, false);
    return () => cancelAnimation(progress);
  }, [progress]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.45 * (1 - progress.value),
    transform: [{ scale: 1 + progress.value * 0.55 }],
  }));

  return <Animated.View style={[styles.pulse, { backgroundColor: color }, ringStyle]} />;
}

export function ResultPopup() {
  const popup = useSyncExternalStore(subscribeResultPopup, getResultPopup, getResultPopup);

  if (!popup) return null;

  const kind = KIND_STYLES[popup.kind];

  return (
    <Modal transparent statusBarTranslucent animationType="none" visible onRequestClose={hideResultPopup}>
      <MotiView
        style={styles.backdrop}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 200 }}
      >
        <MotiView
          style={styles.card}
          from={{ opacity: 0, translateY: 28, scale: 0.9 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 16, stiffness: 180 }}
        >
          <LinearGradient colors={kind.accent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.accent} />
          <View style={styles.body}>
            <View style={styles.iconStage}>
              <PulseRing color={kind.solid} />
              <View style={[styles.iconHalo, { backgroundColor: kind.soft }]}>
                <MotiView
                  from={{ scale: 0, rotate: '-30deg' }}
                  animate={{ scale: 1, rotate: '0deg' }}
                  transition={{ type: 'spring', damping: 11, stiffness: 160, delay: 120 }}
                  style={[styles.iconCore, { backgroundColor: kind.solid, shadowColor: kind.shadow }]}
                >
                  <Ionicons name={kind.icon} size={32} color={colors.white} />
                </MotiView>
              </View>
            </View>
            <MotiView
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 260, delay: 180 }}
              style={styles.textBlock}
            >
              <Text style={styles.title}>{popup.title}</Text>
              <Text style={styles.message}>{popup.message}</Text>
            </MotiView>
            <Pressable
              onPress={hideResultPopup}
              style={({ pressed }) => [styles.buttonWrap, { shadowColor: kind.shadow }, pressed && styles.buttonPressed]}
            >
              <LinearGradient colors={kind.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
                <Text style={styles.buttonText}>{kind.buttonText}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </MotiView>
      </MotiView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: 'rgba(17,24,39,0.55)',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 16,
  },
  accent: { height: 5, width: '100%' },
  body: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 26, paddingBottom: 24 },
  iconStage: { width: 96, height: 96, alignItems: 'center', justifyContent: 'center' },
  pulse: { position: 'absolute', width: 76, height: 76, borderRadius: 38 },
  iconHalo: { width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
  iconCore: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  textBlock: { alignItems: 'center', marginTop: 16 },
  title: { color: '#111827', fontSize: 19, fontWeight: '700', letterSpacing: -0.3, textAlign: 'center' },
  message: { marginTop: 8, color: '#6b7280', fontSize: 14, lineHeight: 21, textAlign: 'center' },
  buttonWrap: {
    alignSelf: 'stretch',
    marginTop: 24,
    borderRadius: 12,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  buttonPressed: { opacity: 0.9, transform: [{ translateY: 1 }] },
  button: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.4 },
});
