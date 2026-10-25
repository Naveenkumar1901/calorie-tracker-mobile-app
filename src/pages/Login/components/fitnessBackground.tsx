import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';

const particles = [
  { icon: 'pulse-outline' as const, size: 30, left: 5, top: 10, delay: 0 },
  { icon: 'flame-outline' as const, size: 28, left: 82, top: 9, delay: 450 },
  { icon: 'walk-outline' as const, size: 29, left: 85, top: 38, delay: 900 },
  { icon: 'fitness-outline' as const, size: 31, left: 5, top: 70, delay: 350 },
  { icon: 'flame-outline' as const, size: 28, left: 82, top: 76, delay: 750 },
  { icon: 'pulse-outline' as const, size: 27, left: 43, top: 89, delay: 1100 },
];

export function FitnessBackground() {
  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />
      <View style={styles.glowBottomRight} />
      {particles.map((particle, index) => (
        <MotiView
          key={`${particle.icon}-${index}`}
          from={{ opacity: 0.25, scale: 0.8, translateY: 8 }}
          animate={{ opacity: 0.95, scale: 1.1, translateY: -8 }}
          transition={{
            type: 'timing',
            duration: 2200,
            delay: particle.delay,
            loop: true,
            repeatReverse: true,
          }}
          style={[
            styles.particle,
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={particle.icon}
              size={particle.size}
              color="#C8FF35"
            />
          </View>
        </MotiView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  glowTopRight: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    right: -130,
    top: -70,
    backgroundColor: 'rgba(53,224,192,0.20)',
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    left: -130,
    bottom: -80,
    backgroundColor: 'rgba(200,255,53,0.12)',
  },
  glowBottomRight: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    right: -120,
    bottom: -50,
    backgroundColor: 'rgba(53,224,192,0.18)',
  },
  particle: {
    position: 'absolute',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'rgba(200,255,53,0.35)',
  },
});